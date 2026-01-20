"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import { AI_SYSTEM_PROMPT } from "@/lib/constants"
import { Send, AlertCircle, ArrowLeft, Loader2, Copy, Check, User, Sparkles } from "lucide-react"
import { VoiceInput } from "@/components/voice-input"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

// Code block component with copy button
function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false)
  const language = className?.replace("language-", "") || ""

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-4 rounded-lg bg-zinc-900 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 text-xs text-zinc-400">
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className="text-zinc-100">{children}</code>
      </pre>
    </div>
  )
}

// Markdown renderer component
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings
        h1: ({ children }) => <h1 className="text-2xl font-bold mt-6 mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xl font-bold mt-5 mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-lg font-semibold mt-4 mb-2">{children}</h3>,
        
        // Paragraphs
        p: ({ children }) => <p className="mb-4 leading-7 last:mb-0">{children}</p>,
        
        // Lists
        ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
        li: ({ children }) => <li className="leading-7">{children}</li>,
        
        // Links - clickable
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
          >
            {children}
          </a>
        ),
        
        // Code blocks
        code: ({ className, children, ...props }) => {
          const isInline = !className
          if (isInline) {
            return (
              <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-purple-300 text-sm font-mono">
                {children}
              </code>
            )
          }
          return <CodeBlock className={className}>{String(children).replace(/\n$/, "")}</CodeBlock>
        },
        pre: ({ children }) => <>{children}</>,
        
        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-purple-500 pl-4 my-4 italic text-zinc-300">
            {children}
          </blockquote>
        ),
        
        // Strong and emphasis
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        
        // Horizontal rule
        hr: () => <hr className="my-6 border-zinc-700" />,
        
        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border border-zinc-700 rounded-lg">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-zinc-800">{children}</thead>,
        th: ({ children }) => <th className="px-4 py-2 text-left font-semibold border-b border-zinc-700">{children}</th>,
        td: ({ children }) => <td className="px-4 py-2 border-b border-zinc-800">{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default function ChatPage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px"
    }
  }, [input])

  const quickReplies = [
    { label: "I use Kush", text: "I'm struggling with Kush addiction and don't know how to stop." },
    { label: "I was raped", text: "I was raped and I'm struggling. I need help." },
    { label: "I want to stop", text: "I want to stop using Kush. Where do I start?" },
    { label: "I feel suicidal", text: "I'm having suicidal thoughts and don't know how to cope." },
  ]

  const handleQuickReply = (text: string) => {
    setInput(text)
    textareaRef.current?.focus()
  }

  const handleVoiceInput = (transcript: string) => {
    setInput(transcript)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
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

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

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
              } catch {
                // Skip invalid JSON lines
              }
            }
          }

          // Update assistant message in real-time (streaming effect)
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
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 rounded-2xl p-6 max-w-md w-full border border-zinc-800">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-white">Important Notice</h2>
            </div>
          </div>

          <div className="space-y-4 mb-6 text-sm text-zinc-300">
            <p>
              HopeLine AI provides emotional support and resources, but is{" "}
              <strong className="text-white">NOT a replacement for professional mental health or medical treatment</strong>.
            </p>
            <p>
              If you're in <strong className="text-white">immediate danger</strong>, please contact:
            </p>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 space-y-1 text-xs">
              <p><strong>Emergency: 999</strong></p>
              <p><strong>Rainbo Initiative: +232 78 111 111</strong></p>
            </div>
            <p>
              This chat provides <strong className="text-white">compassionate emotional support and grounding techniques</strong>. All
              conversations are designed to help connect you with professional resources.
            </p>
          </div>

          <button
            onClick={() => setShowDisclaimer(false)}
            className="w-full bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
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
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      {/* Header - minimal like ChatGPT */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">HopeLine AI</span>
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          {displayMessages.length === 0 ? (
            /* Welcome Screen */
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2">How can I help you today?</h1>
              <p className="text-zinc-400 text-center max-w-md mb-8">
                You're in a safe space. Share what you're going through, and I'll listen without judgment.
              </p>
              
              {/* Quick Reply Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply.text)}
                    className="text-left bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50 text-zinc-300 px-4 py-3 rounded-xl text-sm transition-all"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="py-4">
              {displayMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`px-4 py-6 ${msg.role === "assistant" ? "bg-zinc-900/50" : ""}`}
                >
                  <div className="max-w-3xl mx-auto flex gap-4">
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === "user" 
                        ? "bg-purple-600" 
                        : "bg-gradient-to-br from-purple-500 to-pink-500"
                    }`}>
                      {msg.role === "user" ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-zinc-400 mb-1">
                        {msg.role === "user" ? "You" : "HopeLine AI"}
                      </p>
                      <div className="text-zinc-100 prose prose-invert max-w-none">
                        {msg.role === "assistant" ? (
                          <MarkdownContent content={msg.content} />
                        ) : (
                          <p className="whitespace-pre-wrap leading-7">{msg.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && !messages.find(m => m.role === "assistant" && m.content === "") && (
                <div className="px-4 py-6 bg-zinc-900/50">
                  <div className="max-w-3xl mx-auto flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
                      <span className="text-sm text-zinc-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="px-4 py-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                      <p className="text-sm text-red-400 font-semibold mb-1">Connection Error</p>
                      <p className="text-xs text-zinc-400">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input Area - Fixed at bottom like ChatGPT */}
      <div className="sticky bottom-0 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent pt-6 pb-4">
        <div className="max-w-3xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-700 rounded-2xl px-4 py-3 focus-within:border-zinc-600 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message HopeLine AI..."
                className="flex-1 bg-transparent text-white placeholder-zinc-500 focus:outline-none resize-none max-h-[200px] text-sm leading-6"
                rows={1}
                disabled={isLoading}
              />
              
              <div className="flex items-center gap-2">
                <VoiceInput onTranscript={handleVoiceInput} disabled={isLoading} />
                
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-white text-black rounded-lg p-2 hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-white transition-all"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
          
          <p className="text-xs text-zinc-600 text-center mt-3">
            HopeLine AI provides support but is not a replacement for professional help. 
            <Link href="/crisis" className="text-zinc-500 hover:text-zinc-400 ml-1 underline">
              Crisis resources
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
