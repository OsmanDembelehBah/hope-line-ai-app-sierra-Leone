"use client"

import { useState, useRef } from "react"
import { Mic, StopCircle } from "lucide-react"

interface VoiceInputProps {
  onTranscript: (transcript: string) => void
  isLoading?: boolean
}

export function VoiceInput({ onTranscript, isLoading }: VoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState("")
  const recognitionRef = useRef<any>(null)

  const startRecording = () => {
    // Check if Speech Recognition API is available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition

    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsRecording(true)
      setTranscript("")
    }

    recognition.onresult = (event: any) => {
      let interim = ""
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + " ")
        } else {
          interim += transcript
        }
      }
    }

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error)
    }

    recognition.onend = () => {
      setIsRecording(false)
      if (transcript.trim()) {
        onTranscript(transcript.trim())
        setTranscript("")
      }
    }

    recognition.start()
  }

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  return (
    <button
      type="button"
      onClick={isRecording ? stopRecording : startRecording}
      disabled={isLoading}
      className={`p-2 rounded-full transition-colors ${
        isRecording
          ? "bg-destructive text-destructive-foreground hover:opacity-90"
          : "bg-secondary text-secondary-foreground hover:opacity-90"
      } disabled:opacity-50`}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
      title={isRecording ? "Stop recording" : "Start voice input"}
    >
      {isRecording ? <StopCircle className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  )
}
