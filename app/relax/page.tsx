"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Play, Pause } from "lucide-react"

interface MeditationSession {
  id: string
  title: string
  description: string
  duration: string
  category: string
  techniques: string[]
  color: string
}

const SESSIONS: MeditationSession[] = [
  {
    id: "1",
    title: "Anxiety Relief Meditation",
    description: "Guided meditation to calm racing thoughts and reduce anxiety",
    duration: "10 min",
    category: "Anxiety",
    techniques: ["Body scan", "Breathing focus", "Grounding"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: "2",
    title: "Sleep & Rest Meditation",
    description: "Relax your body and mind for better sleep",
    duration: "15 min",
    category: "Sleep",
    techniques: ["Progressive relaxation", "Visualization", "Sleep affirmations"],
    color: "from-purple-500/20 to-indigo-500/20",
  },
  {
    id: "3",
    title: "Trauma Release Meditation",
    description: "Gentle meditation for processing difficult emotions",
    duration: "12 min",
    category: "Healing",
    techniques: ["Emotional awareness", "Safe space creation", "Self-compassion"],
    color: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "4",
    title: "Self-Love & Acceptance",
    description: "Cultivate compassion and acceptance toward yourself",
    duration: "10 min",
    category: "Healing",
    techniques: ["Loving-kindness", "Affirmations", "Body awareness"],
    color: "from-rose-500/20 to-red-500/20",
  },
  {
    id: "5",
    title: "Grounding in Nature",
    description: "Connect with nature sounds and earth energy",
    duration: "8 min",
    category: "Grounding",
    techniques: ["Nature visualization", "Sensory awareness", "Grounding"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: "6",
    title: "Mindful Awareness",
    description: "Present-moment awareness to calm the mind",
    duration: "7 min",
    category: "Mindfulness",
    techniques: ["Breath awareness", "Thought observation", "Present moment"],
    color: "from-orange-500/20 to-amber-500/20",
  },
]

const NATURE_SOUNDS = [
  { id: "rain", name: "Gentle Rain", duration: "∞", icon: "🌧️" },
  { id: "forest", name: "Forest Ambience", duration: "∞", icon: "🌲" },
  { id: "ocean", name: "Ocean Waves", duration: "∞", icon: "🌊" },
  { id: "birds", name: "Bird Chirping", duration: "∞", icon: "🐦" },
  { id: "wind", name: "Wind Breeze", duration: "∞", icon: "💨" },
  { id: "fire", name: "Crackling Fire", duration: "∞", icon: "🔥" },
]

export default function RelaxationPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedSound, setSelectedSound] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Relaxation & Meditation</h1>
          <p className="text-muted-foreground">
            Step into a peaceful space designed for healing, rest, and inner calm.
          </p>
        </div>

        {/* Featured Session */}
        <div className="bg-gradient-to-br from-primary/30 to-secondary/20 rounded-2xl p-8 mb-8 border border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-3">Start with a Guided Session</h2>
          <p className="text-foreground mb-6">
            Choose a meditation or relaxation session tailored to what you need right now.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setSelectedSession("1")}
              className="p-4 rounded-lg bg-card border-2 border-primary hover:bg-primary/10 transition-all text-left"
            >
              <p className="font-bold text-foreground">Anxiety Relief</p>
              <p className="text-sm text-muted-foreground">10 minutes</p>
            </button>
            <button
              onClick={() => setSelectedSession("3")}
              className="p-4 rounded-lg bg-card border-2 border-secondary hover:bg-secondary/10 transition-all text-left"
            >
              <p className="font-bold text-foreground">Trauma Healing</p>
              <p className="text-sm text-muted-foreground">12 minutes</p>
            </button>
          </div>
        </div>

        {/* Meditation Sessions Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Guided Meditation Sessions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {SESSIONS.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session.id)}
                className={`p-6 rounded-xl transition-all text-left border-2 ${
                  selectedSession === session.id ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-foreground">{session.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{session.duration}</p>
                  </div>
                  {selectedSession === session.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsPlaying(!isPlaying)
                      }}
                      className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{session.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {session.techniques.map((tech, idx) => (
                    <span key={idx} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Nature Sounds */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Ambient Nature Sounds</h2>
          <p className="text-muted-foreground text-sm mb-4">
            Play calming background sounds to create a peaceful environment for work, rest, or reflection.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {NATURE_SOUNDS.map((sound) => (
              <button
                key={sound.id}
                onClick={() => setSelectedSound(selectedSound === sound.id ? null : sound.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSound === sound.id ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                }`}
              >
                <div className="text-3xl mb-2">{sound.icon}</div>
                <p className="font-semibold text-foreground text-sm">{sound.name}</p>
                <p className="text-xs text-muted-foreground">Infinite loop</p>
              </button>
            ))}
          </div>
        </div>

        {/* Relaxation Techniques */}
        <div className="bg-gradient-calm rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4">Quick Relaxation Techniques</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-background/50 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Progressive Muscle Relaxation</p>
              <p className="text-sm text-muted-foreground">
                Tense and release muscle groups from head to toe. Reduces physical tension and anxiety.
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Visualization</p>
              <p className="text-sm text-muted-foreground">
                Imagine a safe, peaceful place. Engage all senses to create a mental escape.
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Box Breathing</p>
              <p className="text-sm text-muted-foreground">
                Inhale 4 counts, hold 4, exhale 4, hold 4. Simple yet deeply calming.
              </p>
            </div>
            <div className="bg-background/50 rounded-lg p-4">
              <p className="font-semibold text-foreground mb-2">Body Scan</p>
              <p className="text-sm text-muted-foreground">
                Mentally scan your body from head to toe, noticing and releasing tension.
              </p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-card rounded-lg p-4 border border-border text-sm text-muted-foreground">
          <p className="mb-3 font-semibold text-foreground">Tips for Best Results</p>
          <ul className="space-y-2">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Find a quiet, comfortable space where you won't be interrupted</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Use headphones for better audio immersion</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Practice consistently for 2-3 weeks to notice real benefits</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Combine meditation with breathing exercises for maximum calm</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>If you have trauma, start with shorter sessions and work your way up</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}
