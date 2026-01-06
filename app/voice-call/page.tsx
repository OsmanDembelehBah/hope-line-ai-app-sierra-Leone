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
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    synthRef.current = window.speechSynthesis
  }, [])

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser")
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
      console.error("Recognition error:", event.error)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognition.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleVoiceInput = async (text: string) => {
    // This would connect to the AI API
    const response = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
    })

    if (response.ok) {
      const data = await response.json()
      const aiText = data.content
      setAiResponse(aiText)
      speakResponse(aiText)
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
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
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
        </div>
      </main>

      <Footer />
    </div>
  )
}
