"use client"

import { useState, useEffect } from "react"

interface TypewriterProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  pauseDuration?: number
  className?: string
}

export function Typewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const currentText = texts[textIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setTextIndex((prev) => (prev + 1) % texts.length)
    } else {
      const nextText = isDeleting
        ? currentText.substring(0, displayText.length - 1)
        : currentText.substring(0, displayText.length + 1)

      timeout = setTimeout(() => setDisplayText(nextText), isDeleting ? deleteSpeed : speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseDuration])

  return (
    <span className={`${className} inline-flex items-center min-h-[1.5em]`}>
      <span className="text-purple-600 dark:text-purple-400 font-bold">{displayText || "\u00A0"}</span>
      <span className="inline-block w-0.5 h-6 ml-1 bg-purple-600 dark:bg-purple-400 animate-pulse"></span>
    </span>
  )
}
