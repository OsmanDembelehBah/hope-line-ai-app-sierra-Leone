"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { AI_SYSTEM_PROMPT } from "@/lib/constants"
import { Send, AlertCircle, ArrowLeft, Loader2 } from "lucide-react"
import { VoiceInput } from "@/components/voice-input"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export default function ChatPage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const quickReplies = [
    { label: "I use Kush", text: "I'm struggling with Kush addiction and don't know how to stop." },
    { label: "I was raped", text: "I was raped and I'm struggling. I need help." },
    { label: "I want to stop", text: "I want to stop using Kush. Where do I start?" },
    { label: "I feel suicidal", text: "I'm having suicidal thoughts and don't know how to cope." },
  ]

  const handleQuickReply = (text: string) => {
    setInput(text)
  }

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: AI_SYSTEM_PROMPT },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: "user", content: userMessage.content },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""

      if (reader) {
        const assistantMessageId = (Date.now() + 1).toString()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const jsonStr = line.substring(2).trim()
                if (jsonStr) {
                  const parsed = JSON.parse(jsonStr)
                  if (parsed && typeof parsed === "string") {
                    assistantMessage += parsed
                  }
                }
              } catch (e) {
                // Skip invalid JSON lines
              }
            }
          }

          // Update assistant message in real-time
          setMessages((prev) => {
            const filtered = prev.filter((m) => m.id !== assistantMessageId)
            return [
              ...filtered,
              {
                id: assistantMessageId,
                role: "assistant" as const,
                content: assistantMessage,
              },
            ]
          })
        }
      }
    } catch (err) {
      console.error("[v0] Chat error:", err)
      setError("Unable to connect to chat service. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (showDisclaimer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-6 max-w-md w-full border border-border">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground">Important Notice</h2>
            </div>
          </div>

          <div className="space-y-4 mb-6 text-sm text-foreground">
            <p>
              HopeLine AI provides emotional support and resources, but is{" "}
              <strong>NOT a replacement for professional mental health or medical treatment</strong>.
            </p>
            <p>
              If you're in <strong>immediate danger</strong>, please contact:
            </p>
            <div className="bg-destructive/10 rounded-lg p-3 space-y-1 text-xs">
              <p>
                <strong>🚨 Emergency: 999</strong>
              </p>
              <p>
                <strong>💙 Rainbo Initiative: +232 78 111 111</strong>
              </p>
            </div>
            <p>
              This chat provides <strong>compassionate emotional support and grounding techniques</strong>. All
              conversations are designed to help connect you with professional resources.
            </p>
          </div>

          <button
            onClick={() => setShowDisclaimer(false)}
            className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            I Understand - Start Chat
          </button>
        </div>
      </div>
    )
  }

  // Filter out system messages for display
  const displayMessages = messages.filter((msg) => msg.role !== "system")

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="gradient-calm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Anonymous Chat</h1>
          <p className="text-sm text-muted-foreground mt-1">Talk to someone who understands. Available 24/7.</p>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {displayMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <p className="text-3xl mb-3">💙</p>
                <p className="text-foreground font-semibold mb-2">Welcome to HopeLine Chat</p>
                <p className="text-muted-foreground text-sm max-w-xs">
                  You're in a safe space. Share what you're going through, and I'll listen without judgment.
                </p>
              </div>
            </div>
          ) : (
            displayMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card border border-border text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border text-foreground px-4 py-3 rounded-2xl rounded-bl-none">
                <div className="flex gap-2 items-center">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Typing...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <p className="text-sm text-destructive font-semibold mb-1">Connection Error</p>
              <p className="text-xs text-muted-foreground">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Reply Buttons */}
        {displayMessages.length === 0 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2 font-semibold">Or start with one of these:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickReply(reply.text)}
                  className="text-left bg-card border border-border hover:border-primary text-foreground px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share what you're feeling... (anonymous)"
            className="flex-1 bg-card border border-border rounded-full px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />

          <VoiceInput onTranscript={handleVoiceInput} disabled={isLoading} />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary text-primary-foreground rounded-full p-3 hover:opacity-90 disabled:opacity-50 transition-opacity"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </main>
    </div>
  )
}
