"use client"

import { useState, useEffect } from "react"
import { Apple } from "lucide-react"
import { motion } from "framer-motion"

export function AppleLogoHeader() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const fullText = "HopeLine AI"

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % 1
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-6 left-6 z-50 flex items-center gap-3"
    >
      {/* Apple Logo */}
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
        <Apple className="w-7 h-7 text-white fill-current" />
      </div>

      {/* Typewriter Text */}
      <div className="font-bold text-2xl text-white">
        {text}
        <span className="animate-pulse">|</span>
      </div>
    </motion.div>
  )
}
