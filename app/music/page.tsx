"use client"

import { useState, useRef, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

interface Song {
  id: string
  title: string
  artist: string
  url: string
  duration: string
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
        url: "/audio/peaceful-piano.mp3",
        duration: "3:45",
        category: "Motivation",
      },
      {
        id: "2",
        title: "Calm Waters",
        artist: "Nature Sounds",
        url: "/audio/calm-waters.mp3",
        duration: "4:12",
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
        id: "3",
        title: "Meditation Flow",
        artist: "Ambient Therapy",
        url: "/audio/meditation.mp3",
        duration: "5:20",
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
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playlist = PLAYLISTS[selectedPlaylist]
  const currentSong = playlist.songs[currentSongIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleEnded = () => {
      handleNextSong()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("[v0] Audio play error:", error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleUserInteraction = () => {
      if (isPlaying && audio.paused) {
        audio.play().catch((error) => {
          console.error("[v0] Audio autoplay blocked:", error)
        })
      }
    }

    document.addEventListener("click", handleUserInteraction, { once: true })

    return () => {
      document.removeEventListener("click", handleUserInteraction)
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.load()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [selectedPlaylist, currentSongIndex])

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
          <p className="text-xs text-muted-foreground mt-2 italic">
            💡 Tip: Click anywhere on the page if audio doesn't start automatically
          </p>
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
            <div className="w-32 h-32 mx-auto mb-6 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center text-white text-5xl">
              ♪
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{currentSong.title}</h2>
            <p className="text-white/80">{currentSong.artist}</p>
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handlePrevSong}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-4 rounded-full bg-white text-primary hover:scale-110 transition-all"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>

            <button
              onClick={handleNextSong}
              className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/20 rounded-full h-2 overflow-hidden cursor-pointer">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/80 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration || 0)}</span>
          </div>

          <audio ref={audioRef} src={currentSong.url} preload="metadata" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
