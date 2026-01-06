// Gemini Test Endpoint
// This route tests the Gemini API connection with a simple request

import { genAI } from "@/lib/gemini-client"

export async function POST(request: Request) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const response = await model.generateContent([
      {
        text: "Hello Gemini! You are a helpful assistant. Please respond with a warm greeting.",
      },
    ])

    const result = response.response.text()

    console.log("[v0] Gemini API Response:", result)

    return Response.json(
      {
        success: true,
        message: "Gemini API test successful",
        response: result,
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Gemini API Error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect to Gemini API",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const response = await model.generateContent([
      {
        text: "Hello Gemini! You are a helpful assistant for the HopeLine Crisis Support App. Please respond with a warm greeting.",
      },
    ])

    const result = response.response.text()

    return Response.json(
      {
        success: true,
        message: "Gemini API test successful",
        response: result,
        timestamp: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Gemini Test GET Error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Gemini API test failed",
      },
      { status: 500 },
    )
  }
}
