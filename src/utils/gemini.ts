import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from 'dotenv'
config()

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function getChatbotResponse(prompt: string): Promise<string> {
	try {
		const result = await model.generateContent(prompt)
		const response = await result.response.text()
		return response
	} catch (error) {
		console.error('Error calling Gemini API:', error)
		return 'Sorry, something went wrong. Please try again.'
	}
}
