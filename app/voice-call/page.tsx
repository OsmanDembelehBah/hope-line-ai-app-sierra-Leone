"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Mic, StopCircle, Volume2, AlertCircle, Play } from "lucide-react"

export default function VoiceCallPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBrowserSupported, setIsBrowserSupported] = useState(true)
  const [isIOS, setIsIOS] = useState(false)
  const [pendingResponse, setPendingResponse] = useState<string | null>(null)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Detect iOS
  useEffect(() => {
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(iOS)
  }, [])

  useEffect(() => {
    synthRef.current = window.speechSynthesis

    // Load voices - required for iOS
    const loadVoices = () => {
      const voices = synthRef.current?.getVoices()
      if (voices && voices.length > 0) {
        setVoicesLoaded(true)
      }
    }

    // Voices load asynchronously on some browsers
    loadVoices()
    if (synthRef.current) {
      synthRef.current.onvoiceschanged = loadVoices
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsBrowserSupported(false)
      setError("Speech Recognition is not supported in your browser. Please use Chrome, Edge, or Safari.")
    }

    // iOS Safari workaround: keep speech synthesis alive
    // iOS pauses speech synthesis when not in focus
    const keepAlive = setInterval(() => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.pause()
        synthRef.current.resume()
      }
    }, 5000)

    return () => {
      clearInterval(keepAlive)
      if (synthRef.current) {
        synthRef.current.onvoiceschanged = null
      }
    }
  }, [])

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError("Speech Recognition not supported in your browser. Please use Chrome, Edge, or Safari.")
      return
    }

    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
      setError("Voice recognition requires a secure connection (HTTPS). Please access this page via HTTPS.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"

    recognition.onstart = () => {
      setIsRecording(true)
      setTranscript("")
      setError(null)
    }

    recognition.onresult = (event: any) => {
      let final = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        final += event.results[i][0].transcript
      }
      setTranscript(final)
      handleVoiceInput(final)
    }

    recognition.onerror = (event: any) => {
      console.error("[v0] Recognition error:", event.error)
      setIsRecording(false)

      if (event.error === "network") {
        setError("Network error. Please check your internet connection and ensure you're using HTTPS.")
      } else if (event.error === "not-allowed") {
        setError("Microphone access denied. Please allow microphone access in your browser settings.")
      } else if (event.error === "no-speech") {
        setError("No speech detected. Please try again and speak clearly.")
      } else {
        setError(`Speech recognition error: ${event.error}`)
      }
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    try {
      recognition.start()
    } catch (err) {
      console.error("[v0] Failed to start recognition:", err)
      setError("Failed to start voice recognition. Please try again.")
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleVoiceInput = async (text: string) => {
    try {
      // iOS workaround: "warm up" speech synthesis with user gesture
      // This helps maintain the user gesture chain for auto-play
      if (isIOS && synthRef.current) {
        const warmup = new SpeechSynthesisUtterance("")
        warmup.volume = 0
        synthRef.current.speak(warmup)
      }

      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
      })

      if (response.ok) {
        const reader = response.body?.getReader()
        const decoder = new TextDecoder()
        let aiText = ""

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const chunk = decoder.decode(value)
            aiText += chunk
          }
        }

        setAiResponse(aiText)
        
        // On iOS, auto-play may not work - show play button instead
        if (isIOS) {
          setPendingResponse(aiText)
          // Still try to speak, but it may be blocked
          speakResponse(aiText, false)
        } else {
          speakResponse(aiText, true)
        }
      } else {
        setError("Failed to get AI response. Please try again.")
      }
    } catch (err) {
      console.error("[v0] API error:", err)
      setError("Failed to connect to AI. Please check your internet connection.")
    }
  }

  // iOS-compatible speech function
  const speakResponse = useCallback((text: string, isUserTriggered = false) => {
    if (!synthRef.current) {
      console.log("[v0] Speech synthesis not available")
      return
    }

    // Cancel any ongoing speech
    synthRef.current.cancel()

    // For iOS, if not user-triggered, store the response for manual playback
    if (isIOS && !isUserTriggered) {
      console.log("[v0] iOS detected, storing response for manual playback")
      setPendingResponse(text)
      setIsAISpeaking(false)
      return
    }

    // Split long text into chunks for iOS (iOS has issues with long utterances)
    const maxLength = isIOS ? 200 : 500
    const chunks: string[] = []
    
    if (text.length > maxLength) {
      // Split by sentences first
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
      let currentChunk = ""
      
      for (const sentence of sentences) {
        if ((currentChunk + sentence).length > maxLength) {
          if (currentChunk) chunks.push(currentChunk.trim())
          currentChunk = sentence
        } else {
          currentChunk += sentence
        }
      }
      if (currentChunk) chunks.push(currentChunk.trim())
    } else {
      chunks.push(text)
    }

    // Get available voices and prefer English voice
    const voices = synthRef.current.getVoices()
    const englishVoice = voices.find(v => v.lang.startsWith('en') && v.localService) || 
                         voices.find(v => v.lang.startsWith('en')) ||
                         voices[0]

    let chunkIndex = 0

    const speakNextChunk = () => {
      if (chunkIndex >= chunks.length) {
        setIsAISpeaking(false)
        setPendingResponse(null)
        return
      }

      const utterance = new SpeechSynthesisUtterance(chunks[chunkIndex])
      utteranceRef.current = utterance
      
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      
      if (englishVoice) {
        utterance.voice = englishVoice
      }

      utterance.onstart = () => {
        console.log("[v0] Started speaking chunk", chunkIndex + 1, "of", chunks.length)
        setIsAISpeaking(true)
      }
      
      utterance.onend = () => {
        console.log("[v0] Finished speaking chunk", chunkIndex + 1)
        chunkIndex++
        speakNextChunk()
      }
      
      utterance.onerror = (event) => {
        console.log("[v0] Speech error:", event.error)
        // On iOS, "interrupted" is common and not a real error
        if (event.error !== 'interrupted') {
          setError(`Speech error: ${event.error}. Try tapping "Play Response" button.`)
        }
        setIsAISpeaking(false)
      }

      // iOS workaround: small delay before speaking
      setTimeout(() => {
        if (synthRef.current) {
          synthRef.current.speak(utterance)
        }
      }, isIOS ? 100 : 0)
    }

    speakNextChunk()
  }, [isIOS])

  // Manual play button for iOS
  const playPendingResponse = () => {
    if (pendingResponse) {
      speakResponse(pendingResponse, true)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsAISpeaking(false)
    }
  }

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Voice Support Hotline</h1>
          <p className="text-muted-foreground">
            Talk to HopeLine AI using your voice. Speak naturally about what you're going through.
          </p>
        </div>

        {/* Warning */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="text-sm text-foreground">
            <p className="font-semibold mb-1">For Immediate Emergency:</p>
            <p className="text-muted-foreground">
              If you are in immediate danger, call emergency services at <strong>999</strong> or Rainbo Initiative at{" "}
              <strong>+232 78 111 111</strong>
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-8 flex gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">{error}</p>
          </div>
        )}

        {/* Main Interface */}
        <div className="bg-card rounded-2xl p-8 border border-border mb-8">
          {/* Status */}
          <div className="text-center mb-8">
            {isRecording ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <Mic className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground">Listening...</p>
                <p className="text-sm text-muted-foreground">Speak now. I'm listening.</p>
              </div>
            ) : isAISpeaking ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center animate-pulse">
                    <Volume2 className="w-12 h-12 text-secondary" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground">HopeLine is speaking...</p>
              </div>
            ) : pendingResponse ? (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Play className="w-12 h-12 text-green-600" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground">Response Ready</p>
                <p className="text-sm text-muted-foreground">Tap "Play Response" to hear HopeLine</p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                    <Mic className="w-12 h-12 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-lg font-semibold text-foreground">Ready to listen</p>
                <p className="text-sm text-muted-foreground">Press the button below to start</p>
              </div>
            )}
          </div>

          {/* Transcript */}
          {transcript && (
            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">You said:</p>
              <p className="text-foreground italic">"{transcript}"</p>
            </div>
          )}

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-secondary/10 rounded-lg p-4 mb-6">
              <p className="text-xs text-muted-foreground mb-1 font-semibold">HopeLine's response:</p>
              <p className="text-foreground">{aiResponse}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            {!isRecording && !isAISpeaking && (
              <button
                onClick={startRecording}
                disabled={!isBrowserSupported}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mic className="w-5 h-5" />
                Start Speaking
              </button>
            )}

            {isRecording && (
              <button
                onClick={stopRecording}
                className="bg-destructive text-destructive-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <StopCircle className="w-5 h-5" />
                Stop
              </button>
            )}

            {isAISpeaking && (
              <button
                onClick={stopSpeaking}
                className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <StopCircle className="w-5 h-5" />
                Stop Speaking
              </button>
            )}

            {/* iOS Play Button - shows when there's a response ready to play */}
            {pendingResponse && !isAISpeaking && !isRecording && (
              <button
                onClick={playPendingResponse}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 animate-pulse"
              >
                <Play className="w-5 h-5" />
                Play Response
              </button>
            )}
          </div>

          {/* iOS Notice */}
          {isIOS && pendingResponse && !isAISpeaking && (
            <p className="text-center text-sm text-amber-600 mt-4">
              Tap "Play Response" to hear HopeLine's answer (required on iPhone/iPad)
            </p>
          )}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-calm rounded-lg p-6 space-y-4">
          <h2 className="font-bold text-foreground">How to Use Voice Hotline</h2>
          <ol className="space-y-2 text-sm text-foreground list-decimal list-inside">
            <li>Click "Start Speaking" to activate your microphone</li>
            <li>Speak naturally about what's on your mind</li>
            <li>HopeLine AI will listen and respond with support and resources</li>
            {isIOS && <li className="text-amber-700 font-medium">On iPhone/iPad: Tap "Play Response" to hear the answer</li>}
            <li>You can continue the conversation by speaking again</li>
            <li>If you need immediate help, click the emergency button anytime</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Voice recognition requires a secure HTTPS connection and works best in Chrome, Edge, or Safari
            browsers.
          </p>
          {isIOS && (
            <p className="text-xs text-amber-600 mt-2">
              iPhone/iPad users: Due to iOS restrictions, you need to tap the "Play Response" button to hear 
              HopeLine's voice. This is a security feature built into iOS.
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
