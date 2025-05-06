import type { APIRoute } from 'astro'
import { getChatbotResponse } from '../../utils/gemini'

export const POST: APIRoute = async ({ request }) => {
	try {
		const { prompt } = await request.json()
		if (!prompt) {
			return new Response(JSON.stringify({ error: 'Prompt is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			})
		}

		const response = await getChatbotResponse(prompt)
		return new Response(JSON.stringify({ response }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		})
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		})
	}
}
