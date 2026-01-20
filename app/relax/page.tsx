"use client"

import { useState, useRef, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

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
  {
    id: "rain",
    name: "Gentle Rain",
    duration: "∞",
    icon: "🌧️",
    frequency: 200,
    type: "pink" as const,
  },
  {
    id: "forest",
    name: "Forest Ambience",
    duration: "∞",
    icon: "🌲",
    frequency: 150,
    type: "brown" as const,
  },
  {
    id: "ocean",
    name: "Ocean Waves",
    duration: "∞",
    icon: "🌊",
    frequency: 100,
    type: "pink" as const,
  },
  {
    id: "stream",
    name: "Gentle Stream",
    duration: "∞",
    icon: "💧",
    frequency: 300,
    type: "white" as const,
  },
  {
    id: "meditation",
    name: "Meditation Bell",
    duration: "∞",
    icon: "🔔",
    frequency: 432,
    type: "sine" as const,
  },
  {
    id: "calm",
    name: "Calm Waters",
    duration: "∞",
    icon: "🌊",
    frequency: 174,
    type: "sine" as const,
  },
]

export default function RelaxationPage() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedSound, setSelectedSound] = useState<string | null>(null)
  const [isSoundPlaying, setIsSoundPlaying] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const noiseNodeRef = useRef<AudioBufferSourceNode | null>(null)

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      stopSound()
    }
  }, [])

  // Generate white/pink/brown noise for nature sounds
  const createNoiseBuffer = (type: "white" | "pink" | "brown") => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioContext = audioContextRef.current
    const bufferSize = 2 * audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const output = buffer.getChannelData(0)

    if (type === "white") {
      // White noise - equal energy across all frequencies
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }
    } else if (type === "pink") {
      // Pink noise - more natural, like rain/ocean
      let b0 = 0,
        b1 = 0,
        b2 = 0,
        b3 = 0,
        b4 = 0,
        b5 = 0,
        b6 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.969 * b2 + white * 0.153852
        b3 = 0.8665 * b3 + white * 0.3104856
        b4 = 0.55 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.016898
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362
        output[i] *= 0.11
        b6 = white * 0.115926
      }
    } else if (type === "brown") {
      // Brown noise - deeper, like forest ambience
      let lastOut = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        output[i] = (lastOut + 0.02 * white) / 1.02
        lastOut = output[i]
        output[i] *= 3.5
      }
    }

    return buffer
  }

  // Stop current sound playback
  const stopSound = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
      } catch (e) {
        // Already stopped
      }
      oscillatorRef.current = null
    }
    if (noiseNodeRef.current) {
      try {
        noiseNodeRef.current.stop()
      } catch (e) {
        // Already stopped
      }
      noiseNodeRef.current = null
    }
  }

  // Start playing the selected sound
  const startSound = (soundId: string) => {
    stopSound()

    const sound = NATURE_SOUNDS.find((s) => s.id === soundId)
    if (!sound) return

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioContext = audioContextRef.current
    const gainNode = audioContext.createGain()
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime) // Low volume

    if (sound.type === "sine") {
      // For meditation bells - use oscillator
      const oscillator = audioContext.createOscillator()
      oscillator.type = "sine"
      oscillator.frequency.setValueAtTime(sound.frequency, audioContext.currentTime)
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      oscillator.start()
      oscillatorRef.current = oscillator
    } else {
      // For nature sounds - use noise
      const buffer = createNoiseBuffer(sound.type)
      const source = audioContext.createBufferSource()
      source.buffer = buffer
      source.loop = true
      source.connect(gainNode)
      gainNode.connect(audioContext.destination)
      source.start()
      noiseNodeRef.current = source
    }

    gainNodeRef.current = gainNode
  }

  // Handle sound playback when selection changes
  useEffect(() => {
    if (selectedSound && isSoundPlaying) {
      startSound(selectedSound)
    } else {
      stopSound()
    }
  }, [selectedSound, isSoundPlaying])

  const toggleSound = (soundId: string) => {
    if (selectedSound === soundId) {
      setIsSoundPlaying(!isSoundPlaying)
    } else {
      setSelectedSound(soundId)
      setIsSoundPlaying(true)
    }
  }

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
            Play calming background sounds to create a peaceful environment. Click any sound to start playing.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {NATURE_SOUNDS.map((sound) => (
              <button
                key={sound.id}
                onClick={() => toggleSound(sound.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedSound === sound.id && isSoundPlaying
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : "border-border hover:border-primary"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">{sound.icon}</div>
                  {selectedSound === sound.id && (
                    <div
                      className={`p-1 rounded-full ${isSoundPlaying ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                    >
                      {isSoundPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </div>
                  )}
                </div>
                <p className="font-semibold text-foreground text-sm">{sound.name}</p>
                <p className="text-xs text-muted-foreground">
                  {selectedSound === sound.id && isSoundPlaying ? "Playing..." : "Click to play"}
                </p>
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
