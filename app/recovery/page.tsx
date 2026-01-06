"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { AFFIRMATIONS } from "@/lib/constants"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

export default function RecoveryPage() {
  const [progress, setProgress] = useState(0)
  const [journalEntry, setJournalEntry] = useState("")
  const [journalEntries, setJournalEntries] = useState<Array<{ date: string; text: string }>>([])
  const [dailyAffirmation, setDailyAffirmation] = useState("")

  useEffect(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem("recovery-days")
    if (stored) setProgress(Number.parseInt(stored))

    // Get daily affirmation
    const today = new Date().getDate()
    setDailyAffirmation(AFFIRMATIONS[today % AFFIRMATIONS.length])

    // Load journal entries
    const entries = localStorage.getItem("journal-entries")
    if (entries) setJournalEntries(JSON.parse(entries))
  }, [])

  const handleSaveJournal = () => {
    if (!journalEntry.trim()) return

    const newEntry = {
      date: new Date().toLocaleDateString(),
      text: journalEntry,
    }

    const updated = [newEntry, ...journalEntries]
    setJournalEntries(updated)
    localStorage.setItem("journal-entries", JSON.stringify(updated))
    setJournalEntry("")
  }

  const incrementProgress = () => {
    const newProgress = Math.min(progress + 1, 365)
    setProgress(newProgress)
    localStorage.setItem("recovery-days", String(newProgress))
  }

  const habitSuggestions = [
    "Start your day with a 5-minute breathing exercise",
    "Drink water throughout the day",
    "Do something kind for someone (or yourself)",
    "Move your body—walk, dance, or stretch",
    "Reach out to someone you trust",
    "Write down three things you're grateful for",
    "Avoid places or people that trigger you",
    "Get enough sleep tonight",
  ]

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">Addiction Recovery Companion</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Your journey to recovery, one day at a time. You're stronger than you think.
          </p>
        </div>

        {/* Daily Affirmation */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-border text-center">
          <p className="text-sm font-semibold text-primary mb-2">Today's Affirmation</p>
          <p className="text-lg font-bold text-foreground leading-relaxed">"{dailyAffirmation}"</p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Recovery Progress</h2>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-3">
              <p className="text-4xl font-bold text-primary">{progress}</p>
              <p className="text-muted-foreground">days clean</p>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${(progress / 365) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Goal: 365 days</p>
          </div>

          <button
            onClick={incrementProgress}
            className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            ✓ Mark Today as Clean
          </button>
        </div>

        {/* Daily Habit Suggestions */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Today's Recovery Habit</h2>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="font-semibold text-foreground mb-2">
              {habitSuggestions[Math.floor(Math.random() * habitSuggestions.length)]}
            </p>
            <p className="text-sm text-muted-foreground">Small daily habits build lasting recovery. You can do this.</p>
          </div>
        </div>

        {/* Journal */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Recovery Journal</h2>
          <div className="space-y-3">
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="What's on your mind today? Write freely and safely..."
              className="w-full bg-card border border-border rounded-lg p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            <button
              onClick={handleSaveJournal}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Save Entry
            </button>
          </div>

          {journalEntries.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="font-semibold text-foreground">Past Entries</h3>
              {journalEntries.slice(0, 5).map((entry, idx) => (
                <div key={idx} className="bg-card rounded-lg p-3 border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{entry.date}</p>
                  <p className="text-sm text-foreground line-clamp-2">{entry.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Challenges */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">7-Day No-Kush Challenge</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Join others on a journey of recovery. Daily tasks to keep you focused and supported.
          </p>
          <Link
            href="/challenges"
            className="w-full block text-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Challenge →
          </Link>
        </div>

        {/* Rehab Resources */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">Ready for Professional Help?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Professional rehab centers and support programs are available to help you.
          </p>
          <div className="space-y-2">
            <Link
              href="/rehab-centers"
              className="block text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90"
            >
              Find Rehab Centers
            </Link>
            <Link
              href="/chat"
              className="block text-center bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90"
            >
              Talk to Someone
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
