"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { AlertCircle, Activity, Users, Clock, LayoutDashboard } from "lucide-react"
import { Typewriter } from "@/components/typewriter"

// Lazy load the floating assistant - doesn't block initial render
const FloatingAIAssistant = dynamic(() => import("@/components/floating-ai-assistant"), {
  ssr: false,
  loading: () => null,
})

export function HeroSection() {
  return (
    <>
      <FloatingAIAssistant />

      {/* Fixed Dashboard Button */}
      <Link href="/dashboard">
        <button className="fixed top-24 right-6 z-40 flex items-center gap-2 px-6 py-3 rounded-full border-2 border-purple-500 bg-transparent text-white font-semibold hover:bg-purple-600 hover:border-purple-600 transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>
      </Link>

      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-indigo-900/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Anonymous Support for
            <br />
            <span className="text-3xl md:text-5xl italic block mt-4">
              <Typewriter
                texts={["Mental Health & Recovery", "Trauma & Healing", "Addiction Support", "Crisis Intervention"]}
                speed={80}
                deleteSpeed={40}
                pauseDuration={2500}
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
              />
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            24/7 confidential support for Kush addiction, trauma survivors, and mental health crises across Sierra
            Leone. No judgment. No barriers. Always free.
          </p>

          <div className="flex justify-center pt-4">
            <Link
              href="/crisis"
              className="bg-red-600 text-white px-12 py-5 rounded-full text-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-3"
            >
              <AlertCircle className="w-6 h-6" />
              Emergency Help
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Activity className="w-5 h-5" />
                <span className="text-2xl font-bold">Live</span>
              </div>
              <p className="text-sm text-gray-400">AI Available Now</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold">1000+</span>
              </div>
              <p className="text-sm text-gray-400">Lives Supported</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-indigo-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">24/7</span>
              </div>
              <p className="text-sm text-gray-400">Always Online</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
