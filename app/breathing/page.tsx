"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Play, Pause, Download } from "lucide-react"

export default function BreathingPage() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [count, setCount] = useState(5)
  const [cycles, setCycles] = useState(0)
  const [inhaleDuration] = useState(5)
  const [holdDuration] = useState(4)
  const [exhaleDuration] = useState(5)

  // Breathing animation timer
  useEffect(() => {
    if (!isActive) return

    let duration = inhaleDuration
    if (phase === "hold") duration = holdDuration
    if (phase === "exhale") duration = exhaleDuration

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          if (phase === "inhale") {
            setPhase("hold")
            setCount(holdDuration)
          } else if (phase === "hold") {
            setPhase("exhale")
            setCount(exhaleDuration)
          } else {
            setPhase("inhale")
            setCount(inhaleDuration)
            setCycles((c) => c + 1)
          }
          return duration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, phase, inhaleDuration, holdDuration, exhaleDuration])

  const groundingExercises = [
    {
      name: "5-4-3-2-1 Senses",
      description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    },
    {
      name: "Progressive Muscle Relaxation",
      description: "Tense each muscle group for 5 seconds, then relax. Start from toes to head.",
    },
    {
      name: "Grounding Technique",
      description: "Focus on physical sensations: feel your feet on the floor, hands on your lap, temperature.",
    },
  ]

  const downloadCalmCard = () => {
    const text = `HopeLine AI - Calm Card
    
When you're overwhelmed, try this:

1. BREATHE (5-4-5)
   - Inhale for 5 seconds
   - Hold for 4 seconds
   - Exhale for 5 seconds
   - Repeat 5-10 times

2. GROUND YOURSELF (5-4-3-2-1)
   - 5 things you see
   - 4 things you can touch
   - 3 things you hear
   - 2 things you smell
   - 1 thing you taste

3. REACH OUT
   - Call someone you trust
   - Contact Rainbo Initiative: +232 78 111 111
   - Chat with HopeLine AI
   - Call emergency: 999

Remember: You are safe. You are not alone. You deserve support.`

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
    element.setAttribute("download", "hopeline-calm-card.txt")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">Calm & Breathing</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Take a few minutes to ground yourself and calm your nervous system.
          </p>
        </div>

        {/* Breathing Coach */}
        <div className="bg-card rounded-2xl p-8 border border-border text-center">
          <h2 className="text-xl font-bold text-foreground mb-6">Breathing Coach</h2>

          {/* Animated Circle */}
          <div className="flex justify-center mb-8">
            <div
              className={`w-40 h-40 rounded-full flex items-center justify-center transition-all duration-1000 ${
                phase === "inhale"
                  ? "bg-primary scale-100"
                  : phase === "hold"
                    ? "bg-secondary scale-100"
                    : "bg-accent scale-75"
              }`}
            >
              <div className="text-center">
                <p className="text-primary-foreground text-sm font-semibold capitalize">{phase}</p>
                <p className="text-primary-foreground text-5xl font-bold">{count}</p>
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-muted-foreground">
              Cycles completed: <span className="text-primary font-bold text-lg">{cycles}</span>
            </p>
          </div>

          <button
            onClick={() => setIsActive(!isActive)}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </button>

          <p className="text-xs text-muted-foreground mt-4">Pattern: 5s inhale • 4s hold • 5s exhale</p>
        </div>

        {/* Grounding Exercises */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Grounding Exercises</h2>
          <div className="space-y-3">
            {groundingExercises.map((exercise, idx) => (
              <div key={idx} className="bg-card rounded-lg p-4 border border-border">
                <h3 className="font-semibold text-foreground mb-1">{exercise.name}</h3>
                <p className="text-sm text-muted-foreground">{exercise.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calm Card Download */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-border">
          <h3 className="font-bold text-foreground mb-2">📌 Quick Reference</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Download your personal calm card with breathing techniques and emergency resources.
          </p>
          <button
            onClick={downloadCalmCard}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Calm Card
          </button>
        </div>

        {/* Tips */}
        <div className="bg-card rounded-lg p-4 border border-border text-sm text-muted-foreground">
          <p className="mb-2">
            💡 <strong>Tips:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use this exercise when you feel anxious, stressed, or overwhelmed</li>
            <li>Try 3-5 minutes daily for best results</li>
            <li>Find a comfortable, quiet place if possible</li>
            <li>This is not medical advice—if symptoms persist, seek professional help</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
