"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ArrowRight, Activity, Video, Sparkles } from "lucide-react"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const [currentFeature, setCurrentFeature] = useState<"angle" | "therapy">("therapy")

  if (!isVisible) return null

  return (
    <div className={`relative text-white z-[60] ${
      currentFeature === "therapy" 
        ? "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600" 
        : "bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3 flex-1">
            <span className="flex items-center justify-center p-1.5 bg-white/20 rounded-lg">
              {currentFeature === "therapy" ? (
                <Video className="w-5 h-5 text-yellow-300" />
              ) : (
                <Activity className="w-5 h-5 text-yellow-300" />
              )}
            </span>
            <p className="font-medium text-sm sm:text-base">
              <span className="font-bold px-1.5 py-0.5 bg-white/20 rounded text-xs mr-2">NEW</span>
              {currentFeature === "therapy" ? (
                <>
                  <span className="font-bold text-yellow-300">HopeLine Therapy</span>
                  <span className="hidden md:inline"> - Live AI video therapy sessions with face-to-face support!</span>
                </>
              ) : (
                <>
                  <span className="font-bold text-yellow-300">HopeLine Angle</span>
                  <span className="hidden md:inline"> - AI-powered movement analysis & physical health support!</span>
                </>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Toggle between features */}
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <button
                onClick={() => setCurrentFeature("therapy")}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  currentFeature === "therapy" 
                    ? "bg-white/30 text-white" 
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Therapy
              </button>
              <button
                onClick={() => setCurrentFeature("angle")}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  currentFeature === "angle" 
                    ? "bg-white/30 text-white" 
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                Angle
              </button>
            </div>

            <Link
              href={currentFeature === "therapy" ? "/therapy" : "/angle"}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 bg-white rounded-full text-sm font-semibold hover:bg-yellow-300 transition-colors ${
                currentFeature === "therapy" ? "text-purple-700 hover:text-purple-900" : "text-teal-700 hover:text-teal-900"
              }`}
            >
              Try Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse pointer-events-none" />
    </div>
  )
}
