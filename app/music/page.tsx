"use client"

import { useState, useRef, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Play, Pause, SkipBack, SkipForward, Volume2, Info } from "lucide-react"

interface Song {
  id: string
  title: string
  artist: string
  frequency: number
  type: OscillatorType
  duration: number
  category: string
}

const PLAYLISTS = {
  motivation: {
    name: "Motivation & Strength",
    description: "Songs to inspire courage and inner strength",
    color: "from-purple-500/20 to-pink-500/20",
    songs: [
      {
        id: "1",
        title: "Peaceful Piano",
        artist: "Relaxing Music",
        frequency: 440,
        type: "sine" as OscillatorType,
        duration: 225,
        category: "Motivation",
      },
      {
        id: "2",
        title: "Calm Waters",
        artist: "Nature Sounds",
        frequency: 528,
        type: "sine" as OscillatorType,
        duration: 252,
        category: "Motivation",
      },
      {
        id: "3",
        title: "Meditation Bell",
        artist: "Mindfulness Music",
        frequency: 396,
        type: "triangle" as OscillatorType,
        duration: 300,
        category: "Motivation",
      },
    ],
  },
  calm: {
    name: "Calm & Peaceful",
    description: "Soothing music for relaxation and peace",
    color: "from-blue-500/20 to-cyan-500/20",
    songs: [
      {
        id: "4",
        title: "Forest Rain",
        artist: "Nature Therapy",
        frequency: 432,
        type: "sine" as OscillatorType,
        duration: 240,
        category: "Calm",
      },
      {
        id: "5",
        title: "Ocean Waves",
        artist: "Calm Sounds",
        frequency: 174,
        type: "sine" as OscillatorType,
        duration: 300,
        category: "Calm",
      },
      {
        id: "6",
        title: "Gentle Stream",
        artist: "Peaceful Nature",
        frequency: 639,
        type: "triangle" as OscillatorType,
        duration: 240,
        category: "Calm",
      },
    ],
  },
}

export default function MusicTherapyPage() {
  const [selectedPlaylist, setSelectedPlaylist] = useState<keyof typeof PLAYLISTS>("motivation")
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const playlist = PLAYLISTS[selectedPlaylist]
  const currentSong = playlist.songs[currentSongIndex]

  useEffect(() => {
    return () => {
      stopAudio()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
      } catch (e) {
        // Already stopped
      }
      oscillatorRef.current = null
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startAudio = () => {
    stopAudio()

    // Create audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const audioContext = audioContextRef.current

    // Create oscillator for tone
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.type = currentSong.type
    oscillator.frequency.setValueAtTime(currentSong.frequency, audioContext.currentTime)

    // Set volume to low for pleasant listening
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
    oscillatorRef.current = oscillator
    gainNodeRef.current = gainNode

    // Update time
    setCurrentTime(0)
    intervalRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= currentSong.duration) {
          handleNextSong()
          return 0
        }
        return prev + 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (isPlaying) {
      startAudio()
    } else {
      stopAudio()
    }
  }, [isPlaying, currentSongIndex, selectedPlaylist])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.songs.length)
  }

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.songs.length) % playlist.songs.length)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-3xl font-bold text-primary mb-2">Music Therapy Center</h1>
          <p className="text-muted-foreground">
            Music is healing. Choose a playlist that resonates with your emotional needs.
          </p>

          <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg flex gap-3">
            <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Healing Frequency Tones</p>
              <p>
                These therapeutic tones use specific frequencies known for their calming and healing properties. Click
                play to experience soothing sound therapy.
              </p>
            </div>
          </div>
        </div>

        {/* Playlists Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {Object.entries(PLAYLISTS).map(([key, { name, description, color }]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPlaylist(key as keyof typeof PLAYLISTS)
                setCurrentSongIndex(0)
                setIsPlaying(false)
              }}
              className={`card-glow text-left ${
                selectedPlaylist === key ? `bg-gradient-to-br ${color} border-2 border-primary` : ""
              }`}
            >
              <h3 className="font-bold text-foreground mb-1">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </button>
          ))}
        </div>

        {/* Now Playing */}
        <div className="gradient-purple rounded-2xl p-8 mb-8 animate-fade-in-up">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-5xl relative overflow-hidden">
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <Volume2 className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h2>
            <p className="text-white/80">{currentSong.artist}</p>
            <p className="text-white/60 text-sm mt-1">{currentSong.frequency} Hz • Healing Frequency</p>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handlePrevSong}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              aria-label="Previous song"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-white text-primary hover:scale-110 transition-all"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>

            <button
              onClick={handleNextSong}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
              aria-label="Next song"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Playlist */}
        <div className="space-y-2">
          <h3 className="font-bold text-foreground mb-4">Playlist</h3>
          {playlist.songs.map((song, index) => (
            <button
              key={song.id}
              onClick={() => {
                setCurrentSongIndex(index)
                setIsPlaying(true)
              }}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                index === currentSongIndex ? "bg-primary/20 border-2 border-primary" : "bg-card hover:bg-accent"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{song.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {song.artist} • {song.frequency} Hz
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">{formatTime(song.duration)}</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
