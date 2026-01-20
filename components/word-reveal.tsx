"use client"

import { useState, useEffect } from "react"

interface WordRevealProps {
  text: string
  className?: string
  delay?: number
}

export function WordReveal({ text, className = "", delay = 0 }: WordRevealProps) {
  const words = text.split(" ")
  const [visibleWords, setVisibleWords] = useState<number[]>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    
    words.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleWords(prev => [...prev, index])
      }, (delay * 1000) + (index * 100))
      timers.push(timer)
    })

    return () => timers.forEach(t => clearTimeout(t))
  }, [words.length, delay])

  return (
    <div className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mr-2 transition-all duration-500 ${
            visibleWords.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  )
}
