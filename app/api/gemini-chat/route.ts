import { streamText, convertToModelMessages, UIMessage } from "ai"
import { AI_SYSTEM_PROMPT } from "@/lib/constants"

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json()

    if (!messages || messages.length === 0) {
      return Response.json({ error: "No messages provided" }, { status: 400 })
    }

    const result = streamText({
      model: "openai/gpt-4o-mini",
      system: AI_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxTokens: 4096,
      temperature: 0.8,
      abortSignal: req.signal,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json(
      {
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
