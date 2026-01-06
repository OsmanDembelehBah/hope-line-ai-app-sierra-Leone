"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Heart, Save, Trash2, Award } from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  mood: number
  text: string
  timestamp: number
}

interface MoodData {
  date: string
  mood: number
}

const ACHIEVEMENTS = [
  { id: "week1", label: "7 Days Strong", description: "Journaled for 7 consecutive days", icon: "🌟" },
  { id: "week2", label: "14 Days Consistent", description: "2 weeks of daily journaling", icon: "💪" },
  { id: "month1", label: "Monthly Champion", description: "30 days of journaling", icon: "👑" },
  { id: "mood", label: "Mood Improver", description: "Average mood improved by 20%", icon: "📈" },
  { id: "survivor", label: "Survivor Strength", description: "Opened up about survival journey", icon: "💎" },
  { id: "recovery", label: "Recovery Committed", description: "50+ recovery entries", icon: "🌱" },
]

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState("")
  const [selectedMood, setSelectedMood] = useState(5)
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("journalEntries")
    if (saved) {
      const parsedEntries = JSON.parse(saved)
      setEntries(parsedEntries)
      generateMoodData(parsedEntries)
      checkAchievements(parsedEntries)
    }
  }, [])

  const generateMoodData = (entries: JournalEntry[]) => {
    const last7Days = entries.slice(-7).map((entry) => ({
      date: new Date(entry.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      mood: entry.mood,
    }))
    setMoodData(last7Days)
  }

  const checkAchievements = (entries: JournalEntry[]) => {
    const achieved: string[] = []

    if (entries.length >= 7) achieved.push("week1")
    if (entries.length >= 14) achieved.push("week2")
    if (entries.length >= 30) achieved.push("month1")

    const avgMood = entries.reduce((sum, e) => sum + e.mood, 0) / entries.length
    if (avgMood > 6 && entries.length >= 5) achieved.push("mood")

    if (entries.some((e) => e.text.toLowerCase().includes("survivor"))) achieved.push("survivor")
    if (entries.some((e) => e.text.toLowerCase().includes("recovery") || e.text.toLowerCase().includes("clean"))) {
      achieved.push("recovery")
    }

    setUnlockedAchievements(achieved)
  }

  const handleSaveEntry = () => {
    if (!newEntry.trim()) {
      alert("Please write something in your journal entry")
      return
    }

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      mood: selectedMood,
      text: newEntry,
      timestamp: Date.now(),
    }

    const updated = [...entries, entry]
    setEntries(updated)
    localStorage.setItem("journalEntries", JSON.stringify(updated))
    setNewEntry("")
    setSelectedMood(5)
    generateMoodData(updated)
    checkAchievements(updated)
  }

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id)
    setEntries(updated)
    localStorage.setItem("journalEntries", JSON.stringify(updated))
    generateMoodData(updated)
    checkAchievements(updated)
  }

  const avgMood =
    entries.length > 0 ? Math.round((entries.reduce((sum, e) => sum + e.mood, 0) / entries.length) * 10) / 10 : 0
  const totalEntries = entries.length
  const currentStreak = calculateStreak(entries)

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Daily Journal & Recovery Tracker</h1>
          <p className="text-muted-foreground">
            Your private space to reflect, process emotions, and track your healing journey.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
            <p className="text-3xl font-bold text-primary">{totalEntries}</p>
          </div>
          <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-4 border border-secondary/20">
            <p className="text-sm text-muted-foreground mb-1">Average Mood</p>
            <p className="text-3xl font-bold text-secondary">{avgMood}/10</p>
          </div>
          <div className="bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-4 border border-accent/20">
            <p className="text-sm text-muted-foreground mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-accent">{currentStreak} days</p>
          </div>
          <div className="bg-gradient-to-br from-chart-1/20 to-chart-1/5 rounded-xl p-4 border border-chart-1/20">
            <p className="text-sm text-muted-foreground mb-1">Achievements</p>
            <p className="text-3xl font-bold text-chart-1">
              {unlockedAchievements.length}/{ACHIEVEMENTS.length}
            </p>
          </div>
        </div>

        {/* Mood Trend Chart */}
        {moodData.length > 0 && (
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h2 className="font-bold text-foreground mb-4">Mood Trend (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#667eea" dot={{ fill: "#667eea", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* New Entry Form */}
        <div className="bg-gradient-calm rounded-2xl p-6 mb-8 border border-primary/30">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            Today's Entry
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground mb-2">How are you feeling today?</label>
            <div className="flex gap-2 items-center">
              <input
                type="range"
                min="1"
                max="10"
                value={selectedMood}
                onChange={(e) => setSelectedMood(Number.parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="flex items-center gap-2 min-w-fit">
                <span className="text-2xl">
                  {selectedMood <= 2
                    ? "😢"
                    : selectedMood <= 4
                      ? "😞"
                      : selectedMood <= 6
                        ? "😐"
                        : selectedMood <= 8
                          ? "🙂"
                          : "😊"}
                </span>
                <span className="font-bold text-lg text-primary">{selectedMood}/10</span>
              </div>
            </div>
          </div>

          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write what's on your mind... This is your safe, private space. You can share anything."
            className="w-full h-32 bg-background border border-border rounded-lg p-4 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />

          <button
            onClick={handleSaveEntry}
            className="mt-4 w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Entry
          </button>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((achievement) => (
              <div
                key={achievement.id}
                className={`rounded-lg p-4 text-center transition-all ${
                  unlockedAchievements.includes(achievement.id)
                    ? "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30"
                    : "bg-muted/50 border border-border opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="font-semibold text-foreground text-sm">{achievement.label}</p>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Previous Entries */}
        {entries.length > 0 && (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="bg-primary/10 px-6 py-4 border-b border-border">
              <h2 className="font-bold text-foreground">Journal Entries ({entries.length})</h2>
            </div>
            <div className="divide-y divide-border max-h-96 overflow-y-auto">
              {entries
                .slice()
                .reverse()
                .map((entry) => (
                  <div key={entry.id} className="p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{entry.date}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm">
                            {entry.mood <= 2
                              ? "😢"
                              : entry.mood <= 4
                                ? "😞"
                                : entry.mood <= 6
                                  ? "😐"
                                  : entry.mood <= 8
                                    ? "🙂"
                                    : "😊"}
                          </span>
                          <span className="text-sm font-semibold text-muted-foreground">Mood: {entry.mood}/10</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        aria-label="Delete entry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">{entry.text}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {entries.length === 0 && (
          <div className="text-center py-12 bg-card rounded-2xl border border-border">
            <p className="text-3xl mb-3">📔</p>
            <p className="text-foreground font-semibold mb-2">Start Your Journal Today</p>
            <p className="text-muted-foreground text-sm">
              Write your first entry above to begin tracking your mood and documenting your healing journey.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

function calculateStreak(entries: JournalEntry[]): number {
  if (entries.length === 0) return 0

  let streak = 1
  const sortedEntries = entries
    .sort((a, b) => b.timestamp - a.timestamp)
    .map((e) => new Date(e.timestamp).toDateString())

  for (let i = 1; i < sortedEntries.length; i++) {
    const current = new Date(sortedEntries[i - 1])
    const prev = new Date(sortedEntries[i])
    const diffDays = Math.floor((current.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      streak++
    } else {
      break
    }
  }

  return streak
}
