// netlify/functions/chat.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from 'dotenv'

// Load environment variables (cần thiết cho việc chạy local)
config()

// Lấy API key từ biến môi trường
const apiKey = process.env.GOOGLE_GEMINI_API_KEY

// Kiểm tra xem API key đã được cung cấp chưa
if (!apiKey) {
	console.error('GOOGLE_GEMINI_API_KEY chưa được thiết lập trong biến môi trường.')
	throw new Error('GOOGLE_GEMINI_API_KEY chưa được thiết lập.')
}

// Khởi tạo Google Generative AI
const genAI = new GoogleGenerativeAI(apiKey)

// Lấy model Gemini
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

// Định nghĩa handler function cho Netlify Function
export const handler = async (event: any) => {
	// Kiểm tra HTTP method, chỉ chấp nhận POST requests
	if (event.httpMethod !== 'POST') {
		return {
			statusCode: 405, // Method Not Allowed
			body: JSON.stringify({ error: 'Chỉ chấp nhận phương thức POST' }),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	}

	try {
		// Lấy 'prompt' từ body của request JSON
		const { prompt } = JSON.parse(event.body)

		// Gọi Gemini API để lấy response
		const result = await model.generateContent(prompt)
		const response = await result.response.text()

		// Trả về response từ Gemini
		return {
			statusCode: 200, // OK
			body: JSON.stringify({ response }),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	} catch (error: any) {
		// Xử lý lỗi nếu có
		console.error('Lỗi khi gọi Gemini API:', error)
		return {
			statusCode: 500, // Internal Server Error
			body: JSON.stringify({ error: 'Đã xảy ra lỗi khi xử lý tin nhắn. Vui lòng thử lại.' }),
			headers: {
				'Content-Type': 'application/json'
			}
		}
	}
}
