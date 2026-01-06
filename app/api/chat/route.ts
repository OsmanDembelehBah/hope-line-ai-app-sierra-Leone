import { streamText } from "ai"
import { AI_SYSTEM_PROMPT } from "@/lib/constants"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    const result = streamText({
      model: "openai/gpt-4o-mini",
      system: AI_SYSTEM_PROMPT,
      messages: messages
        .filter((msg: any) => msg.role !== "system")
        .map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
