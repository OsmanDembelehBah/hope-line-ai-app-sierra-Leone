"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const MESSAGES = [
  "Hi there! I'm HopeLine",
  "Need someone to talk to?",
  "I'm here 24/7 to support you",
  "Your privacy is 100% protected",
]

export default function FloatingAIAssistant() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    if (!isHomePage) return
    const timer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [isHomePage])

  if (!isHomePage) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      <div className="bg-white rounded-2xl shadow-lg px-5 py-3 max-w-xs border border-purple-300">
        <p className="text-base font-medium text-gray-900">{MESSAGES[messageIndex]}</p>
      </div>

      <Link href="/chat" className="group">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-xl ring-3 ring-purple-500 group-hover:ring-purple-400">
            <img src="/images/hopline-20chat-20booble.png" alt="HopeLine AI" className="object-cover w-full h-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>
      </Link>
    </div>
  )
}
