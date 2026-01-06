"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CHALLENGE_TASKS, AFFIRMATIONS } from "@/lib/constants"
import { CheckCircle2, Circle } from "lucide-react"

export default function ChallengesPage() {
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [currentDay, setCurrentDay] = useState(0)

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem("challenge-progress")
    if (stored) {
      const parsed = JSON.parse(stored)
      setCompletedDays(parsed)
      setCurrentDay(parsed.length > 0 ? Math.max(...parsed) + 1 : 0)
    }
  }, [])

  const toggleDay = (day: number) => {
    setCompletedDays((prev) => {
      const updated = prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
      localStorage.setItem("challenge-progress", JSON.stringify(updated))
      return updated
    })
  }

  const totalCompleted = completedDays.length
  const progressPercent = (totalCompleted / 7) * 100

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">7-Day No-Kush Challenge</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Complete daily tasks and join thousands on the path to recovery.
          </p>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-foreground">Challenge Progress</p>
              <p className="text-primary font-bold">{totalCompleted}/7 Days</p>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {totalCompleted === 7 && (
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <p className="text-lg font-bold text-primary mb-2">🎉 You Did It!</p>
              <p className="text-sm text-foreground">
                You completed the 7-day challenge! You've proven your strength. Keep going—your recovery continues.
              </p>
            </div>
          )}
        </div>

        {/* Daily Tasks */}
        <div className="space-y-3">
          {CHALLENGE_TASKS.map((task) => (
            <div
              key={task.day}
              onClick={() => toggleDay(task.day - 1)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                completedDays.includes(task.day - 1)
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {completedDays.includes(task.day - 1) ? (
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">
                    Day {task.day}: {task.task}
                  </p>
                  <p className="text-sm text-muted-foreground">{task.tip}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-border text-center">
          <p className="text-lg font-semibold text-foreground mb-2">
            {AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]}
          </p>
        </div>

        {/* Tips */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">Challenge Tips</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Check off each day as you complete the task</li>
            <li>Each task is designed to support your recovery</li>
            <li>If you miss a day, that's okay—just start again</li>
            <li>Share your progress with someone you trust</li>
            <li>After 7 days, you've built momentum—keep going!</li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">After This Challenge</h2>
          <p className="text-sm text-muted-foreground mb-4">Completing 7 days is an amazing first step. Consider:</p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li>Starting a 30-day challenge to keep momentum</li>
            <li>Reaching out to a rehab center for professional support</li>
            <li>Joining a support group in your community</li>
            <li>Continuing daily affirmations and grounding exercises</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
