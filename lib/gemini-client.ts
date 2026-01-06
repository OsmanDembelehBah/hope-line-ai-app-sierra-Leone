// Gemini AI Client Initialization
// Initialize Google Generative AI client with API key from environment

import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini client - API key is read from process.env.GEMINI_API_KEY automatically
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Export the client for use in API routes and server components
export { genAI }
