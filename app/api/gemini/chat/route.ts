// Gemini Chat API Route
// Replaces the default chat endpoint with Google Generative AI

import { genAI } from "@/lib/gemini-client"
import { AI_SYSTEM_PROMPT } from "@/lib/constants"

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: AI_SYSTEM_PROMPT,
    })

    // Convert messages to Gemini format
    const chatHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }))

    const userMessage = messages[messages.length - 1].content

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
    })

    // Send the latest user message
    const response = await chat.sendMessage(userMessage)
    const text = response.response.text()

    console.log("[v0] Gemini Chat Response generated successfully")

    return Response.json(
      { content: text },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    )
  } catch (error) {
    console.error("[v0] Gemini Chat Error:", error)
    return Response.json({ error: "Failed to generate response from Gemini" }, { status: 500 })
  }
}
