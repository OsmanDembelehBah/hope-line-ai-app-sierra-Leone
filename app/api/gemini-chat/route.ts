import { GoogleGenerativeAI } from "@google/generative-ai"
import { AI_SYSTEM_PROMPT } from "@/lib/constants"

export const maxDuration = 30

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyAnQEMJtM995XCjT_roXWcOpq3psxAnw8A")

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      tools: [
        {
          googleSearch: {},
        },
      ],
    })

    // Format messages for Gemini
    const chatHistory = messages
      .filter((m: any) => m.role !== "system")
      .map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }))

    const lastMessage = chatHistory.pop()

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: 0.8, // Increased for more natural conversation
        topP: 0.95,
        maxOutputTokens: 2048, // Increased for longer, more detailed responses
      },
    })

    const userMessage =
      chatHistory.length === 0 ? `${AI_SYSTEM_PROMPT}\n\nUser: ${lastMessage.parts[0].text}` : lastMessage.parts[0].text

    const result = await chat.sendMessageStream(userMessage)

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text()
            controller.enqueue(encoder.encode(`0:"${text}"\n`))
          }
          controller.close()
        } catch (error) {
          console.error("[v0] Stream error:", error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("[v0] Gemini API error:", error)
    return Response.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
