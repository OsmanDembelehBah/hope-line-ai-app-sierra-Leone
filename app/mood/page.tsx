"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"

interface MoodOption {
  id: string
  label: string
  icon: string
  description: string
  response: string
  actions: Array<{
    label: string
    href?: string
    phone?: string
  }>
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "addicted",
    label: "I feel addicted",
    icon: "😔",
    description: "Struggling with Kush use",
    response:
      "Your feelings are valid. Addiction is real, and recovery is possible. Many people have walked this path before you. Let's talk about what support looks like for you.",
    actions: [
      { label: "Chat now", href: "/chat" },
      { label: "Find rehab", href: "/rehab-centers" },
      { label: "Recovery tips", href: "/recovery" },
    ],
  },
  {
    id: "depressed",
    label: "I feel depressed",
    icon: "😞",
    description: "Feeling low, sad, or hopeless",
    response:
      "Depression is a real struggle, and you're brave for acknowledging it. You deserve support and care. Let's explore what might help you feel better.",
    actions: [
      { label: "Talk anonymously", href: "/chat" },
      { label: "Try breathing", href: "/breathing" },
      { label: "Emergency help", href: "/crisis" },
    ],
  },
  {
    id: "stressed",
    label: "I feel stressed",
    icon: "😰",
    description: "Overwhelmed or anxious",
    response:
      "Stress is your body's way of responding to pressure. You can learn to manage it. Let's use some calming techniques to help you feel more grounded.",
    actions: [
      { label: "Breathe with me", href: "/breathing" },
      { label: "Ground yourself", href: "/chat" },
      { label: "Journal", href: "/recovery" },
    ],
  },
  {
    id: "unsafe",
    label: "I feel unsafe",
    icon: "🚨",
    description: "Experiencing abuse or danger",
    response:
      "Your safety is the priority right now. You deserve to be safe. If you're in immediate danger, please contact emergency services. We're here to help you find support.",
    actions: [
      { label: "Emergency help", href: "/crisis" },
      { label: "Survivor support", href: "/survivor-support" },
      { label: "Call police", phone: "tel:999" },
    ],
  },
  {
    id: "quit",
    label: "I want to quit Kush",
    icon: "💪",
    description: "Ready to take action",
    response:
      "That's a powerful decision. You're taking a brave step. Quitting requires support, planning, and patience with yourself. Let's connect you with resources that can help.",
    actions: [
      { label: "Recovery plan", href: "/recovery" },
      { label: "Find help", href: "/rehab-centers" },
      { label: "Join challenge", href: "/challenges" },
    ],
  },
  {
    id: "suicidal",
    label: "I feel suicidal",
    icon: "🆘",
    description: "Having thoughts of ending your life",
    response:
      "I hear you. These feelings are serious, and you deserve immediate professional support. Please reach out to emergency services or call a crisis line right now. You matter.",
    actions: [
      { label: "Crisis help NOW", href: "/stay-alive" },
      { label: "Call 999", phone: "tel:999" },
      { label: "Call Rainbo", phone: "tel:+232781111111" },
    ],
  },
  {
    id: "overwhelmed",
    label: "I feel overwhelmed",
    icon: "😵",
    description: "Too much happening at once",
    response:
      "When everything feels like too much, it's important to break things into smaller pieces. Let's take it one step at a time. You don't have to handle this alone.",
    actions: [
      { label: "Calm down first", href: "/breathing" },
      { label: "Talk it out", href: "/chat" },
      { label: "Get support", href: "/rehab-centers" },
    ],
  },
]

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const mood = MOOD_OPTIONS.find((m) => m.id === selectedMood)

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">How Are You Feeling?</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Tell me how you're feeling, and I'll help you find the right support.
          </p>
        </div>

        {!selectedMood ? (
          /* Mood Selection */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className="bg-card border-2 border-border hover:border-primary rounded-lg p-4 text-center transition-all hover:shadow-md"
              >
                <div className="text-3xl mb-2">{mood.icon}</div>
                <p className="font-semibold text-foreground text-sm">{mood.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{mood.description}</p>
              </button>
            ))}
          </div>
        ) : (
          /* Mood Response */
          <div className="space-y-6">
            <button
              onClick={() => setSelectedMood(null)}
              className="text-primary hover:underline text-sm font-semibold"
            >
              ← Back to moods
            </button>

            <div className="bg-gradient-calm rounded-2xl p-6 border border-border">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{mood?.icon}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-2">{mood?.label}</h2>
                  <p className="text-foreground leading-relaxed">{mood?.response}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-foreground mb-3">What can we do right now?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mood?.actions.map((action, idx) => {
                  if (action.phone) {
                    return (
                      <a
                        key={idx}
                        href={action.phone}
                        className="bg-destructive text-destructive-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
                      >
                        {action.label}
                      </a>
                    )
                  }
                  return (
                    <Link
                      key={idx}
                      href={action.href || "#"}
                      className="bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
                    >
                      {action.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Supportive Message */}
            <div className="bg-card rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Remember:</strong> What you're feeling is valid. Seeking help is a sign of strength, not
                weakness. You deserve support, and we're here for you.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
