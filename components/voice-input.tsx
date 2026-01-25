"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, StopCircle } from "lucide-react"

interface VoiceInputProps {
  onTranscript: (transcript: string) => void
  isLoading?: boolean
  disabled?: boolean
}

export function VoiceInput({ onTranscript, isLoading, disabled }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef<any>(null)
  const finalTranscriptRef = useRef("")

  useEffect(() => {
    // Check browser support on mount
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsSupported(false)
    }
  }, [])

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in your browser. Please use Chrome, Safari, or Edge.")
      return
    }

    // Check for HTTPS (required for speech recognition)
    if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
      alert("Voice input requires a secure connection (HTTPS).")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    // iOS Safari works better with these settings
    recognition.continuous = false // iOS Safari doesn't support continuous well
    recognition.interimResults = true
    recognition.lang = "en-US"
    recognition.maxAlternatives = 1

    finalTranscriptRef.current = ""

    recognition.onstart = () => {
      console.log("[v0] Voice recognition started")
      setIsRecording(true)
      setCurrentTranscript("")
    }

    recognition.onresult = (event: any) => {
      let interim = ""
      let final = ""
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += transcriptText + " "
        } else {
          interim += transcriptText
        }
      }
      
      if (final) {
        finalTranscriptRef.current += final
      }
      
      setCurrentTranscript(finalTranscriptRef.current + interim)
    }

    recognition.onerror = (event: any) => {
      console.log("[v0] Voice recognition error:", event.error)
      setIsRecording(false)
      
      if (event.error === "not-allowed") {
        alert("Microphone access was denied. Please allow microphone access and try again.")
      } else if (event.error === "no-speech") {
        // Silently handle no-speech error - this is common
        console.log("[v0] No speech detected")
      }
    }

    recognition.onend = () => {
      console.log("[v0] Voice recognition ended")
      setIsRecording(false)
      
      const finalText = finalTranscriptRef.current.trim()
      if (finalText) {
        onTranscript(finalText)
      }
      
      setCurrentTranscript("")
      finalTranscriptRef.current = ""
    }

    try {
      recognition.start()
    } catch (err) {
      console.error("[v0] Failed to start voice recognition:", err)
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  if (!isSupported) {
    return null // Hide button if not supported
  }

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={isLoading || disabled}
      className={`p-2 rounded-full transition-colors ${
        isRecording
          ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
          : "bg-secondary text-secondary-foreground hover:opacity-90"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
      title={isRecording ? "Stop recording" : "Start voice input"}
    >
      {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  )
}
