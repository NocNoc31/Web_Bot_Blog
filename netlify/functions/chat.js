import fetch from 'node-fetch'

export const handler = async (event) => {
	try {
		const { prompt } = JSON.parse(event.body)
		const apiKey = process.env.GOOGLE_GEMINI_API_KEY
		if (!apiKey) {
			throw new Error('Missing GOOGLE_GEMINI_API_KEY')
		}
		const response = await fetch(
			`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [{ parts: [{ text: prompt }] }]
				})
			}
		)
		const data = await response.json()
		console.log('API response:', JSON.stringify(data, null, 2))
		if (!response.ok) {
			throw new Error(`API error: ${data.error?.message || 'Unknown error'}`)
		}
		if (!data.candidates || !data.candidates[0]) {
			throw new Error('No candidates in response')
		}
		return {
			statusCode: 200,
			body: JSON.stringify({ response: data.candidates[0].content.parts[0].text })
		}
	} catch (error) {
		console.error('Error:', error)
		return {
			statusCode: 500,
			body: JSON.stringify({ response: `Error processing request: ${error.message}` })
		}
	}
}
