"use client"

import { useState, useRef, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Mic, StopCircle, Volume2, AlertCircle } from "lucide-react"

export default function VoiceCallPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAISpeaking, setIsAISpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBrowserSupported, setIsBrowserSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    synthRef.current = window.speechSynthesis

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsBrowserSupported(false)
      setError("Speech Recognition is not supported in your browser. Please use Chrome, Edge, or Safari.")
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
        speakResponse(aiText)
      } else {
        setError("Failed to get AI response. Please try again.")
      }
    } catch (err) {
      console.error("[v0] API error:", err)
      setError("Failed to connect to AI. Please check your internet connection.")
    }
  }

  const speakResponse = (text: string) => {
    if (!synthRef.current) return

    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsAISpeaking(true)
    utterance.onend = () => setIsAISpeaking(false)

    synthRef.current.speak(utterance)
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
          <div className="flex gap-4 justify-center">
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
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-calm rounded-lg p-6 space-y-4">
          <h2 className="font-bold text-foreground">How to Use Voice Hotline</h2>
          <ol className="space-y-2 text-sm text-foreground list-decimal list-inside">
            <li>Click "Start Speaking" to activate your microphone</li>
            <li>Speak naturally about what's on your mind</li>
            <li>HopeLine AI will listen and respond with support and resources</li>
            <li>You can continue the conversation by speaking again</li>
            <li>If you need immediate help, click the emergency button anytime</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-4">
            Note: Voice recognition requires a secure HTTPS connection and works best in Chrome, Edge, or Safari
            browsers.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
