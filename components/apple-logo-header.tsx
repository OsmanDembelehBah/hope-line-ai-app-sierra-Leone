"use client"

import { useState, useEffect } from "react"
import { Apple } from "lucide-react"

export function AppleLogoHeader() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const [mounted, setMounted] = useState(false)

  const fullText = "HopeLine AI"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const currentText = fullText

      setText(isDeleting ? currentText.substring(0, text.length - 1) : currentText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === currentText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <div
      className={`fixed top-14 left-6 z-50 flex items-center gap-3 transition-all duration-700 ${
        mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
      }`}
    >
      {/* Logo */}
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
        <Apple className="w-6 h-6 text-white fill-current" />
      </div>

      {/* Typewriter Text */}
      <div className="font-bold text-xl text-white">
        {text}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  )
}
