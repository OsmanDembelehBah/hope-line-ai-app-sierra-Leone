"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  PhoneOff,
  ArrowLeft,
  Volume2,
  VolumeX,
  Send,
  Heart,
  Brain,
  MessageCircle,
  Sparkles,
  Shield,
  User,
  ChevronDown,
  Check,
  Loader2,
  Square,
  Play,
  StopCircle,
  AlertCircle,
  Keyboard,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface VoiceOption {
  id: string
  name: string
  lang: string
  gender: "female" | "male"
  description: string
  pitch: number
  rate: number
}

const voiceOptions: VoiceOption[] = [
  { id: "female-1", name: "Sarah", lang: "en-US", gender: "female", description: "Warm & Calming", pitch: 1.1, rate: 0.9 },
  { id: "female-2", name: "Emma", lang: "en-GB", gender: "female", description: "Professional & Clear", pitch: 1.05, rate: 0.95 },
  { id: "male-1", name: "James", lang: "en-US", gender: "male", description: "Supportive & Deep", pitch: 0.9, rate: 0.9 },
  { id: "male-2", name: "David", lang: "en-GB", gender: "male", description: "Gentle & Reassuring", pitch: 0.95, rate: 0.85 },
]

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "listening" | "thinking" | "speaking"

function AIAvatar({ isSpeaking, isThinking, size = "large" }: { isSpeaking: boolean; isThinking?: boolean; size?: "small" | "large" }) {
  const sizeClasses = size === "large" ? "w-28 h-28 md:w-36 md:h-36" : "w-16 h-16"
  
  return (
    <div className={`relative ${sizeClasses} mx-auto`}>
      {isSpeaking && (
        <>
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-30" />
          <div className="absolute inset-[-12px] rounded-full bg-purple-500/20 animate-pulse" />
          <div className="absolute inset-[-20px] rounded-full bg-purple-500/10 animate-pulse" style={{ animationDelay: "0.3s" }} />
        </>
      )}
      
      {isThinking && (
        <div className="absolute inset-[-8px] rounded-full border-4 border-purple-500/30 border-t-purple-500 animate-spin" />
      )}
      
      <div className={`relative ${sizeClasses} rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/40 border-4 ${isSpeaking ? "border-purple-300" : "border-purple-400/30"} transition-all duration-300`}>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <Brain className={`${size === "large" ? "w-12 h-12 md:w-16 md:h-16" : "w-8 h-8"} text-white`} strokeWidth={1.5} />
        </div>
        <Sparkles className={`absolute ${size === "large" ? "top-1 right-1 w-5 h-5" : "top-0 right-0 w-3 h-3"} text-yellow-300 ${isSpeaking ? "animate-bounce" : "animate-pulse"}`} />
      </div>
    </div>
  )
}

function VoiceWaveform({ isActive, type }: { isActive: boolean; type: "incoming" | "outgoing" }) {
  const bars = 16
  const color = type === "incoming" ? "bg-purple-400" : "bg-teal-400"
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(4))

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(bars).fill(4))
      return
    }

    const interval = setInterval(() => {
      setHeights(Array(bars).fill(0).map((_, i) => {
        const wave = Math.sin(Date.now() / 100 + i * 0.5) * 0.5 + 0.5
        return isActive ? wave * 24 + 4 : 4
      }))
    }, 50)

    return () => clearInterval(interval)
  }, [isActive])
  
  return (
    <div className="flex items-center justify-center gap-[3px] h-8">
      {heights.map((height, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-full transition-all duration-75 ${color} ${isActive ? "opacity-100" : "opacity-30"}`}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  )
}

function StatusIndicator({ status }: { status: ConnectionStatus }) {
  const statusConfig = {
    disconnected: { color: "bg-zinc-500", text: "Disconnected", pulse: false },
    connecting: { color: "bg-yellow-500", text: "Connecting...", pulse: true },
    connected: { color: "bg-green-500", text: "Connected", pulse: false },
    listening: { color: "bg-teal-500", text: "Listening...", pulse: true },
    thinking: { color: "bg-purple-500", text: "Thinking...", pulse: true },
    speaking: { color: "bg-pink-500", text: "Speaking...", pulse: true },
  }

  const config = statusConfig[status]

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-zinc-700">
      <div className={`w-3 h-3 rounded-full ${config.color} ${config.pulse ? "animate-pulse" : ""}`} />
      <span className="text-sm font-medium text-white">{config.text}</span>
    </div>
  )
}

function LiveCaption({ text, speaker, isLive }: { text: string; speaker: "user" | "ai"; isLive?: boolean }) {
  if (!text) return null
  
  return (
    <div className="absolute bottom-36 left-4 right-4 z-20">
      <div className={`max-w-3xl mx-auto px-5 py-4 rounded-2xl backdrop-blur-md shadow-xl ${
        speaker === "ai" 
          ? "bg-purple-900/90 border border-purple-500/40" 
          : "bg-zinc-900/90 border border-teal-500/40"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2.5 h-2.5 rounded-full ${speaker === "ai" ? "bg-purple-400" : "bg-teal-400"} ${isLive ? "animate-pulse" : ""}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${speaker === "ai" ? "text-purple-400" : "text-teal-400"}`}>
            {speaker === "ai" ? "HopeLine AI Therapist" : "You"}
          </span>
          {isLive && (
            <span className="text-xs text-zinc-500 ml-auto flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Live
            </span>
          )}
        </div>
        <p className="text-white text-base md:text-lg leading-relaxed">{text}</p>
      </div>
    </div>
  )
}

export default function TherapyPage() {
  const [sessionState, setSessionState] = useState<"landing" | "consent" | "settings" | "active" | "ended">("landing")
  const [cameraEnabled, setCameraEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(true)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected")
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [sessionDuration, setSessionDuration] = useState(0)
  const [currentCaption, setCurrentCaption] = useState("")
  const [captionSpeaker, setCaptionSpeaker] = useState<"user" | "ai">("ai")
  const [showChat, setShowChat] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(voiceOptions[0])
  const [transcript, setTranscript] = useState("")
  const [speechSupported, setSpeechSupported] = useState(true)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const [useTextInput, setUseTextInput] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const finalTranscriptRef = useRef<string>("")

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      setSpeechSupported(!!SpeechRecognition)
      if (!SpeechRecognition) {
        setUseTextInput(true)
      }
    }
  }, [])

  // Load voices - with iOS compatibility
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        setAvailableVoices(voices)
        setVoicesLoaded(true)
      }
    }

    // Load voices immediately
    loadVoices()

    // Also listen for voiceschanged event (needed for some browsers)
    window.speechSynthesis.onvoiceschanged = loadVoices

    // iOS Safari workaround - trigger voice loading
    const utterance = new SpeechSynthesisUtterance("")
    utterance.volume = 0
    window.speechSynthesis.speak(utterance)
    window.speechSynthesis.cancel()

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (sessionState !== "active") return
    const timer = setInterval(() => {
      setSessionDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [sessionState])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getSystemVoice = useCallback(() => {
    if (availableVoices.length === 0) return null
    
    const genderKeywords = selectedVoice.gender === "female" 
      ? ["female", "woman", "samantha", "victoria", "karen", "moira", "fiona", "zira", "hazel", "susan", "siri"]
      : ["male", "man", "daniel", "alex", "fred", "david", "george", "james", "thomas", "mark"]
    
    // Try to find a voice matching the selected language and gender
    let matchedVoice = availableVoices.find(v => 
      v.lang.startsWith(selectedVoice.lang.split("-")[0]) &&
      genderKeywords.some(k => v.name.toLowerCase().includes(k))
    )
    
    // Fallback to any voice in the selected language
    if (!matchedVoice) {
      matchedVoice = availableVoices.find(v => v.lang.startsWith(selectedVoice.lang.split("-")[0]))
    }
    
    // Fallback to any English voice
    if (!matchedVoice) {
      matchedVoice = availableVoices.find(v => v.lang.startsWith("en"))
    }
    
    return matchedVoice || availableVoices[0]
  }, [selectedVoice, availableVoices])

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
    setConnectionStatus("connected")
  }, [])

  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) {
      // If voice is disabled, still show caption
      setCurrentCaption(text)
      setCaptionSpeaker("ai")
      setTimeout(() => {
        setCurrentCaption("")
        onEnd?.()
      }, 5000)
      return
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = selectedVoice.rate
    utterance.pitch = selectedVoice.pitch
    utterance.volume = 1
    
    const voice = getSystemVoice()
    if (voice) {
      utterance.voice = voice
    }

    utterance.onstart = () => {
      setIsSpeaking(true)
      setConnectionStatus("speaking")
      setCurrentCaption(text)
      setCaptionSpeaker("ai")
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      setConnectionStatus("connected")
      setTimeout(() => setCurrentCaption(""), 3000)
      onEnd?.()
    }

    utterance.onerror = (e) => {
      // On error, still show the text as caption
      setIsSpeaking(false)
      setConnectionStatus("connected")
      setCurrentCaption(text)
      setCaptionSpeaker("ai")
      setTimeout(() => setCurrentCaption(""), 5000)
      onEnd?.()
    }

    // iOS Safari workaround - need a small delay
    setTimeout(() => {
      window.speechSynthesis.speak(utterance)
    }, 100)
  }, [voiceEnabled, selectedVoice, getSystemVoice])

  const sendMessageToAI = useCallback(async (userText: string) => {
    if (!userText.trim() || isThinking) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userText.trim(),
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setTranscript("")
    setIsThinking(true)
    setConnectionStatus("thinking")
    setCurrentCaption("")

    try {
      const response = await fetch("/api/therapy-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, aiMessage])
      setIsThinking(false)
      speakText(data.response)

    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm here with you. Let me take a moment... Could you please share that with me again?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      setIsThinking(false)
      setConnectionStatus("connected")
      speakText(errorMessage.content)
    }
  }, [messages, isThinking, speakText])

  const initSpeechRecognition = useCallback(() => {
    if (typeof window === "undefined") return null
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return null
    
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"
    
    return recognition
  }, [])

  // Start recording - manual tap
  const startRecording = useCallback(() => {
    if (!micEnabled || isThinking) return
    
    if (isSpeaking) {
      stopSpeaking()
    }

    if (!speechSupported) {
      setUseTextInput(true)
      setShowChat(true)
      return
    }

    const recognition = initSpeechRecognition()
    if (!recognition) {
      setUseTextInput(true)
      setShowChat(true)
      return
    }

    recognitionRef.current = recognition
    finalTranscriptRef.current = ""

    recognition.onresult = (event: any) => {
      let interimTranscript = ""
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcriptText + " "
        } else {
          interimTranscript = transcriptText
        }
      }

      if (finalTranscript) {
        finalTranscriptRef.current += finalTranscript
      }

      const displayText = finalTranscriptRef.current + interimTranscript
      setTranscript(displayText)
      setCurrentCaption(displayText)
      setCaptionSpeaker("user")
    }

    recognition.onerror = (event: any) => {
      if (event.error === "not-allowed") {
        setUseTextInput(true)
        setShowChat(true)
      }
    }

    recognition.onend = () => {
      // Recognition ended unexpectedly
      if (isRecording) {
        setIsRecording(false)
        setConnectionStatus("connected")
      }
    }

    try {
      recognition.start()
      setIsRecording(true)
      setConnectionStatus("listening")
    } catch (e) {
      setUseTextInput(true)
      setShowChat(true)
    }
  }, [micEnabled, isThinking, isSpeaking, stopSpeaking, initSpeechRecognition, speechSupported, isRecording])

  // Stop recording - manual tap
  const stopRecording = useCallback(() => {
    if (!isRecording) return

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {}
      recognitionRef.current = null
    }

    setIsRecording(false)
    setConnectionStatus("connected")

    const finalText = finalTranscriptRef.current.trim()
    if (finalText) {
      sendMessageToAI(finalText)
    } else {
      setCurrentCaption("")
    }
  }, [isRecording, sendMessageToAI])

  // Toggle recording for tap button
  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }, [isRecording, startRecording, stopRecording])

  const requestCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      })
      
      streamRef.current = stream
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        // iOS requires this to be called after user interaction
        try {
          await videoRef.current.play()
        } catch (e) {
          // Will try again on user interaction
        }
      }
      setCameraEnabled(true)
      return true
    } catch (error) {
      setCameraEnabled(false)
      return false
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setCameraEnabled(false)
  }, [])

  const toggleCamera = useCallback(async () => {
    if (cameraEnabled) {
      stopCamera()
    } else {
      await requestCamera()
    }
  }, [cameraEnabled, stopCamera, requestCamera])

  // Re-attach stream when entering active state
  useEffect(() => {
    if (sessionState === "active" && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch(() => {})
    }
  }, [sessionState])

  const startSession = useCallback(async () => {
    setConnectionStatus("connecting")
    
    // Request camera
    await requestCamera()
    
    // Small delay for UI feedback
    setTimeout(() => {
      setConnectionStatus("connected")
      setSessionState("active")
      
      const greeting = `Hello, I'm ${selectedVoice.name}, your HopeLine AI therapist. Welcome to this safe and confidential space. I'm fully here with you. How are you feeling right now? ${speechSupported ? "Tap the microphone button to speak, or use the chat to type." : "Use the chat button to type your message."}`
      
      const greetingMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: greeting,
        timestamp: new Date()
      }
      setMessages([greetingMessage])
      
      // Speak after a short delay to ensure everything is ready
      setTimeout(() => {
        speakText(greeting)
      }, 500)
    }, 2000)
  }, [requestCamera, selectedVoice, speakText, speechSupported])

  const endSession = useCallback(() => {
    stopCamera()
    stopSpeaking()
    if (recognitionRef.current) {
      try { recognitionRef.current.stop() } catch (e) {}
    }
    setConnectionStatus("disconnected")
    setSessionState("ended")
  }, [stopCamera, stopSpeaking])

  const handleSend = useCallback(() => {
    if (!inputText.trim() || isThinking) return
    stopSpeaking()
    sendMessageToAI(inputText)
    setInputText("")
  }, [inputText, isThinking, stopSpeaking, sendMessageToAI])

  useEffect(() => {
    return () => {
      stopCamera()
      stopSpeaking()
    }
  }, [stopCamera, stopSpeaking])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Landing Page */}
      {sessionState === "landing" && (
        <div className="min-h-screen flex flex-col">
          <header className="p-4 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </Link>
              <h1 className="text-lg font-bold">HopeLine Therapy</h1>
              <div className="w-20" />
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto text-center">
              <AIAvatar isSpeaking={false} />
              
              <h2 className="text-4xl md:text-5xl font-bold mt-8 mb-4">
                Live AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Therapy</span>
              </h2>
              
              <p className="text-xl text-zinc-400 mb-8">
                Face-to-face video sessions with your compassionate AI therapist. Talk naturally, be heard, and receive supportive guidance.
              </p>

              {!speechSupported && (
                <div className="mb-6 p-4 bg-yellow-900/30 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-center gap-3 text-yellow-400">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm text-left">Voice input is not supported on this browser. You can still use text chat during the session.</p>
                  </div>
                </div>
              )}

              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                    <Camera className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Video Session</h3>
                  <p className="text-sm text-zinc-500">See yourself on camera</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center mx-auto mb-3">
                    <Mic className="w-5 h-5 text-pink-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Voice & Text</h3>
                  <p className="text-sm text-zinc-500">Speak or type to chat</p>
                </div>
                <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Private & Safe</h3>
                  <p className="text-sm text-zinc-500">Confidential session</p>
                </div>
              </div>

              <button
                onClick={() => setSessionState("consent")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-lg font-bold hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/25"
              >
                Start Therapy Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Consent Screen */}
      {sessionState === "consent" && (
        <div className="min-h-screen flex flex-col">
          <header className="p-4 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <button onClick={() => setSessionState("landing")} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-lg font-bold">Session Agreement</h1>
              <div className="w-20" />
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-xl mx-auto">
              <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-center mb-6">Before We Begin</h2>
                
                <div className="space-y-4 mb-8 text-zinc-400">
                  <div className="flex gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p>This is an AI-powered therapy session. While supportive, it's not a replacement for professional mental health care.</p>
                  </div>
                  <div className="flex gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p>Your session is private. Video stays on your device and is not recorded or stored.</p>
                  </div>
                  <div className="flex gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p>If you're in crisis or having thoughts of self-harm, please contact emergency services or a crisis hotline.</p>
                  </div>
                </div>

                <button
                  onClick={() => setSessionState("settings")}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  I Understand, Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Selection */}
      {sessionState === "settings" && (
        <div className="min-h-screen flex flex-col">
          <header className="p-4 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <button onClick={() => setSessionState("consent")} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-lg font-bold">Choose Your Therapist</h1>
              <div className="w-20" />
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto w-full">
              <div className="text-center mb-8">
                <AIAvatar isSpeaking={false} size="large" />
                <h2 className="text-2xl font-bold mt-6 mb-2">Select a Voice</h2>
                <p className="text-zinc-400">Choose the voice that feels most comfortable for you</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {voiceOptions.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      selectedVoice.id === voice.id
                        ? "bg-purple-500/20 border-purple-500"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">{voice.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        voice.gender === "female" 
                          ? "bg-pink-500/20 text-pink-400" 
                          : "bg-blue-500/20 text-blue-400"
                      }`}>
                        {voice.gender === "female" ? "Female" : "Male"}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{voice.description}</p>
                    {selectedVoice.id === voice.id && (
                      <div className="mt-3 flex items-center gap-2 text-purple-400">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={startSession}
                disabled={connectionStatus === "connecting"}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {connectionStatus === "connecting" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start Session with {selectedVoice.name}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Session */}
      {sessionState === "active" && (
        <div className="h-screen flex flex-col bg-zinc-950">
          {/* Main Video Area */}
          <div className="flex-1 relative overflow-hidden">
            {/* User Video Feed - Full Background */}
            {cameraEnabled ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: "scaleX(-1)",
                  backgroundColor: "#18181b"
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                    <User className="w-16 h-16 text-zinc-600" />
                  </div>
                  <p className="text-zinc-400 mb-4">Camera is off</p>
                  <button
                    onClick={toggleCamera}
                    className="px-6 py-3 bg-purple-600 rounded-xl font-medium hover:bg-purple-500 transition-colors"
                  >
                    Turn on Camera
                  </button>
                </div>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <StatusIndicator status={connectionStatus} />
              
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full border border-zinc-700">
                  <span className="text-sm font-mono text-white">{formatDuration(sessionDuration)}</span>
                </div>
                <button
                  onClick={endSession}
                  className="p-3 bg-red-600 rounded-full hover:bg-red-500 transition-colors"
                >
                  <PhoneOff className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* AI Avatar - Picture in Picture */}
            <div className="absolute top-24 right-4 z-10">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-zinc-700">
                <AIAvatar isSpeaking={isSpeaking} isThinking={isThinking} size="small" />
                <p className="text-center text-xs text-zinc-400 mt-2">{selectedVoice.name}</p>
                
                {/* Voice Waveform */}
                <div className="mt-2">
                  <VoiceWaveform isActive={isSpeaking} type="incoming" />
                </div>
              </div>
            </div>

            {/* User Speaking Waveform */}
            {isRecording && (
              <div className="absolute top-24 left-4 z-10">
                <div className="bg-black/60 backdrop-blur-sm rounded-2xl px-4 py-3 border border-teal-500/50">
                  <p className="text-xs text-teal-400 mb-2 font-medium">You are speaking...</p>
                  <VoiceWaveform isActive={isRecording} type="outgoing" />
                </div>
              </div>
            )}

            {/* Live Caption */}
            <LiveCaption 
              text={currentCaption} 
              speaker={captionSpeaker} 
              isLive={isRecording || isSpeaking} 
            />

            {/* Chat Panel */}
            {showChat && (
              <div className="absolute bottom-36 left-4 right-4 md:left-auto md:right-4 md:w-96 max-h-[50vh] z-20">
                <div className="bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-700 overflow-hidden">
                  <div className="p-4 border-b border-zinc-800">
                    <h3 className="font-semibold">Chat</h3>
                  </div>
                  <div className="h-64 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] px-4 py-2 rounded-2xl ${
                            msg.role === "user"
                              ? "bg-teal-600 text-white"
                              : "bg-zinc-800 text-zinc-100"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    {isThinking && (
                      <div className="flex justify-start">
                        <div className="bg-zinc-800 px-4 py-2 rounded-2xl">
                          <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  <div className="p-4 border-t border-zinc-800">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
                      />
                      <button
                        onClick={handleSend}
                        disabled={!inputText.trim() || isThinking}
                        className="p-2 bg-purple-600 rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Control Bar */}
          <div className="bg-zinc-900 border-t border-zinc-800 p-4 safe-area-pb">
            <div className="max-w-lg mx-auto">
              {/* Instructions */}
              <p className="text-center text-sm text-zinc-400 mb-4">
                {isThinking ? "AI is thinking..." : 
                 isSpeaking ? "AI is speaking... Tap mic to interrupt" :
                 isRecording ? "Listening... Tap STOP when done" :
                 speechSupported ? "Tap the microphone to speak, or use chat" :
                 "Use the chat button to type your message"}
              </p>

              <div className="flex items-center justify-center gap-4">
                {/* Camera Toggle */}
                <button
                  onClick={toggleCamera}
                  className={`p-4 rounded-full transition-all ${
                    cameraEnabled 
                      ? "bg-zinc-700 hover:bg-zinc-600" 
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {cameraEnabled ? (
                    <Camera className="w-6 h-6" />
                  ) : (
                    <CameraOff className="w-6 h-6 text-zinc-500" />
                  )}
                </button>

                {/* Main Mic/Speak Button */}
                {speechSupported ? (
                  <button
                    onClick={toggleRecording}
                    disabled={isThinking}
                    className={`relative p-6 rounded-full transition-all ${
                      isRecording
                        ? "bg-red-600 hover:bg-red-500 scale-110"
                        : isThinking
                        ? "bg-purple-600 opacity-50 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <StopCircle className="w-8 h-8" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-ping" />
                      </>
                    ) : isThinking ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowChat(true)}
                    className="p-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all"
                  >
                    <Keyboard className="w-8 h-8" />
                  </button>
                )}

                {/* Voice Toggle */}
                <button
                  onClick={() => {
                    if (isSpeaking) stopSpeaking()
                    setVoiceEnabled(!voiceEnabled)
                  }}
                  className={`p-4 rounded-full transition-all ${
                    voiceEnabled 
                      ? "bg-zinc-700 hover:bg-zinc-600" 
                      : "bg-zinc-800 hover:bg-zinc-700"
                  }`}
                >
                  {voiceEnabled ? (
                    <Volume2 className="w-6 h-6" />
                  ) : (
                    <VolumeX className="w-6 h-6 text-zinc-500" />
                  )}
                </button>

                {/* Chat Toggle */}
                <button
                  onClick={() => setShowChat(!showChat)}
                  className={`p-4 rounded-full transition-all ${
                    showChat 
                      ? "bg-purple-600 hover:bg-purple-500" 
                      : "bg-zinc-700 hover:bg-zinc-600"
                  }`}
                >
                  <MessageCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Session Ended */}
      {sessionState === "ended" && (
        <div className="min-h-screen flex flex-col">
          <header className="p-4 border-b border-zinc-800">
            <div className="max-w-6xl mx-auto flex items-center justify-center">
              <h1 className="text-lg font-bold">Session Complete</h1>
            </div>
          </header>

          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">Thank You</h2>
              <p className="text-zinc-400 mb-8">
                I hope our conversation was helpful. Remember, taking time for your mental health is an act of self-care and strength.
              </p>

              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 mb-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-zinc-500 mb-1">Duration</p>
                    <p className="text-2xl font-bold">{formatDuration(sessionDuration)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 mb-1">Messages</p>
                    <p className="text-2xl font-bold">{messages.length}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSessionState("settings")
                    setMessages([])
                    setSessionDuration(0)
                  }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  Start New Session
                </button>
                <Link
                  href="/dashboard"
                  className="block w-full py-4 bg-zinc-800 rounded-xl font-bold hover:bg-zinc-700 transition-colors"
                >
                  Return to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
