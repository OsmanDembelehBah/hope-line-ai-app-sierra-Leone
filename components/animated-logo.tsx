"use client"

import { useState, useEffect } from "react"
import { Heart, Phone } from "lucide-react"

export function AnimatedLogo() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`flex flex-col items-center gap-6 transition-all duration-1000 ${
        mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
      }`}
    >
      <div className="relative animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-50" />
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/20">
          <div className="relative">
            <Phone className="w-16 h-16 sm:w-20 sm:h-20 text-white" strokeWidth={1.5} />
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white absolute -bottom-1 -right-1" />
          </div>
        </div>
      </div>

      <div
        className={`text-center transition-all duration-1000 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">HopeLine AI</h1>
        <p className="text-blue-200 text-sm sm:text-base uppercase tracking-wider mt-2">
          Crisis Support • Sierra Leone
        </p>
      </div>
    </div>
  )
}
