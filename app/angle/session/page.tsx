"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Camera,
  CameraOff,
  Play,
  Pause,
  Square,
  ArrowLeft,
  Volume2,
  VolumeX,
  Settings,
  AlertTriangle,
  CheckCircle,
  Info,
  Activity,
  Target,
  TrendingUp,
  Clock,
  Zap,
  ChevronRight,
  RefreshCw,
} from "lucide-react"

interface Landmark {
  x: number
  y: number
  z: number
  visibility: number
}

interface SessionData {
  startTime: Date
  duration: number
  movementScore: number
  riskLevel: "low" | "moderate" | "high"
  corrections: number
  improvements: string[]
}

interface AIMessage {
  id: string
  type: "info" | "correction" | "warning" | "encouragement"
  message: string
  timestamp: Date
}

// Exercise categories
const exerciseCategories = [
  {
    id: "posture",
    name: "Posture Correction",
    description: "Improve your posture alignment",
    icon: Target,
    color: "teal",
  },
  {
    id: "back",
    name: "Lower Back Care",
    description: "Exercises for back health",
    icon: Activity,
    color: "cyan",
  },
  {
    id: "desk",
    name: "Desk Worker Relief",
    description: "Combat sitting-related strain",
    icon: Clock,
    color: "teal",
  },
  {
    id: "rehab",
    name: "Basic Rehabilitation",
    description: "Gentle recovery exercises",
    icon: TrendingUp,
    color: "cyan",
  },
]

// Individual exercises list
const exercises = [
  {
    id: "standing-posture",
    category: "posture",
    name: "Standing Posture Check",
    description: "Assess and correct your standing alignment",
    duration: "5 min",
    difficulty: "Easy",
    instructions: "Stand tall with feet hip-width apart. Keep shoulders back and chin parallel to ground.",
  },
  {
    id: "wall-alignment",
    category: "posture",
    name: "Wall Alignment Test",
    description: "Use a wall to check spinal alignment",
    duration: "3 min",
    difficulty: "Easy",
    instructions: "Stand with back against wall. Head, shoulders, and hips should touch the wall.",
  },
  {
    id: "chin-tuck",
    category: "posture",
    name: "Chin Tuck Exercise",
    description: "Strengthen neck muscles and correct forward head posture",
    duration: "4 min",
    difficulty: "Easy",
    instructions: "Pull chin straight back, creating a double chin. Hold for 5 seconds, repeat 10 times.",
  },
  {
    id: "cat-cow",
    category: "back",
    name: "Cat-Cow Stretch",
    description: "Mobilize the spine with gentle flexion and extension",
    duration: "5 min",
    difficulty: "Easy",
    instructions: "On hands and knees, alternate between arching back up (cat) and letting belly drop (cow).",
  },
  {
    id: "knee-to-chest",
    category: "back",
    name: "Knee to Chest Stretch",
    description: "Release lower back tension",
    duration: "4 min",
    difficulty: "Easy",
    instructions: "Lie on back, pull one knee to chest, hold 20-30 seconds. Alternate legs.",
  },
  {
    id: "pelvic-tilt",
    category: "back",
    name: "Pelvic Tilt",
    description: "Strengthen core and relieve lower back pressure",
    duration: "5 min",
    difficulty: "Easy",
    instructions: "Lie on back with knees bent. Flatten lower back against floor by tightening abs.",
  },
  {
    id: "bird-dog",
    category: "back",
    name: "Bird Dog Exercise",
    description: "Improve core stability and back strength",
    duration: "6 min",
    difficulty: "Medium",
    instructions: "On hands and knees, extend opposite arm and leg simultaneously. Hold, then switch.",
  },
  {
    id: "shoulder-rolls",
    category: "desk",
    name: "Shoulder Rolls",
    description: "Release shoulder and upper back tension",
    duration: "3 min",
    difficulty: "Easy",
    instructions: "Roll shoulders forward, up, back, and down in circular motion. Repeat 10 times each direction.",
  },
  {
    id: "neck-stretches",
    category: "desk",
    name: "Neck Stretches",
    description: "Relieve neck stiffness from screen use",
    duration: "4 min",
    difficulty: "Easy",
    instructions: "Gently tilt head to each side, holding 15-20 seconds. Then look up and down slowly.",
  },
  {
    id: "wrist-circles",
    category: "desk",
    name: "Wrist Circles & Stretches",
    description: "Prevent carpal tunnel and wrist strain",
    duration: "3 min",
    difficulty: "Easy",
    instructions: "Rotate wrists in circles, then extend arm and pull fingers back gently.",
  },
  {
    id: "seated-twist",
    category: "desk",
    name: "Seated Spinal Twist",
    description: "Rotate spine to release tension",
    duration: "4 min",
    difficulty: "Easy",
    instructions: "Sit tall, place hand on opposite knee, gently twist looking over shoulder. Hold 20 seconds.",
  },
  {
    id: "hip-flexor-stretch",
    category: "desk",
    name: "Hip Flexor Stretch",
    description: "Counter effects of prolonged sitting",
    duration: "5 min",
    difficulty: "Easy",
    instructions: "Kneel on one knee, push hips forward until you feel stretch in front of hip. Hold 30 seconds.",
  },
  {
    id: "gentle-squats",
    category: "rehab",
    name: "Gentle Partial Squats",
    description: "Rebuild leg strength safely",
    duration: "5 min",
    difficulty: "Medium",
    instructions: "Stand with support nearby, slowly bend knees to partial squat. Go only as far as comfortable.",
  },
  {
    id: "ankle-circles",
    category: "rehab",
    name: "Ankle Mobility",
    description: "Improve ankle flexibility and circulation",
    duration: "4 min",
    difficulty: "Easy",
    instructions: "Lift foot slightly, rotate ankle in circles. 10 times each direction, both ankles.",
  },
  {
    id: "arm-raises",
    category: "rehab",
    name: "Gentle Arm Raises",
    description: "Restore shoulder range of motion",
    duration: "4 min",
    difficulty: "Easy",
    instructions: "Slowly raise arms forward and up, only as high as comfortable. Lower slowly. Repeat 10 times.",
  },
]

// Clinical AI messages
const clinicalMessages = {
  briefing: [
    "Today we'll focus on posture alignment. If you feel sharp pain, stop immediately.",
    "This session will analyze your movement patterns. Take your time and move naturally.",
    "Remember: smooth, controlled movements are safer than fast ones.",
  ],
  corrections: [
    "Let's slow this movement slightly.",
    "Try to straighten your spine a bit more.",
    "Your shoulders appear uneven. Try to level them.",
    "Reduce the angle at your knee slightly.",
    "Keep your head in a neutral position.",
  ],
  encouragement: [
    "You're doing well. Keep that alignment.",
    "Good progress on that movement.",
    "Your form is improving.",
    "That's better. Continue at this pace.",
  ],
  warnings: [
    "I recommend pausing this exercise for safety.",
    "Let's stop and reset your position.",
    "This movement may strain your lower back.",
  ],
  explanations: [
    "This adjustment reduces strain on your lower back.",
    "Balanced movement helps prevent long-term joint stress.",
    "Proper alignment distributes weight more evenly.",
  ],
}

export default function AngleSessionPage() {
  const [sessionState, setSessionState] = useState<"setup" | "briefing" | "active" | "paused" | "complete">("setup")
  const [cameraPermission, setCameraPermission] = useState<"pending" | "granted" | "denied">("pending")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showExerciseList, setShowExerciseList] = useState(false)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  
  const [sessionData, setSessionData] = useState<SessionData>({
    startTime: new Date(),
    duration: 0,
    movementScore: 85,
    riskLevel: "low",
    corrections: 0,
    improvements: [],
  })
  
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState<string>("")
  const [landmarks, setLandmarks] = useState<Landmark[]>([])
  const animationFrameRef = useRef<number | null>(null)
  
  // Simulated pose landmarks for demo (in production, use MediaPipe/TensorFlow.js)
  const generateSimulatedPose = useCallback(() => {
    // Generate a realistic standing pose
    const basePose = [
      { x: 0.5, y: 0.15, z: 0, visibility: 1 }, // 0: nose
      { x: 0.48, y: 0.12, z: 0, visibility: 1 }, // 1: left eye inner
      { x: 0.47, y: 0.12, z: 0, visibility: 1 }, // 2: left eye
      { x: 0.46, y: 0.12, z: 0, visibility: 1 }, // 3: left eye outer
      { x: 0.52, y: 0.12, z: 0, visibility: 1 }, // 4: right eye inner
      { x: 0.53, y: 0.12, z: 0, visibility: 1 }, // 5: right eye
      { x: 0.54, y: 0.12, z: 0, visibility: 1 }, // 6: right eye outer
      { x: 0.44, y: 0.14, z: 0, visibility: 1 }, // 7: left ear
      { x: 0.56, y: 0.14, z: 0, visibility: 1 }, // 8: right ear
      { x: 0.48, y: 0.18, z: 0, visibility: 1 }, // 9: mouth left
      { x: 0.52, y: 0.18, z: 0, visibility: 1 }, // 10: mouth right
      { x: 0.35, y: 0.28, z: 0, visibility: 1 }, // 11: left shoulder
      { x: 0.65, y: 0.28, z: 0, visibility: 1 }, // 12: right shoulder
      { x: 0.28, y: 0.45, z: 0, visibility: 1 }, // 13: left elbow
      { x: 0.72, y: 0.45, z: 0, visibility: 1 }, // 14: right elbow
      { x: 0.25, y: 0.58, z: 0, visibility: 1 }, // 15: left wrist
      { x: 0.75, y: 0.58, z: 0, visibility: 1 }, // 16: right wrist
      { x: 0.23, y: 0.62, z: 0, visibility: 1 }, // 17: left pinky
      { x: 0.77, y: 0.62, z: 0, visibility: 1 }, // 18: right pinky
      { x: 0.24, y: 0.61, z: 0, visibility: 1 }, // 19: left index
      { x: 0.76, y: 0.61, z: 0, visibility: 1 }, // 20: right index
      { x: 0.24, y: 0.60, z: 0, visibility: 1 }, // 21: left thumb
      { x: 0.76, y: 0.60, z: 0, visibility: 1 }, // 22: right thumb
      { x: 0.42, y: 0.52, z: 0, visibility: 1 }, // 23: left hip
      { x: 0.58, y: 0.52, z: 0, visibility: 1 }, // 24: right hip
      { x: 0.40, y: 0.72, z: 0, visibility: 1 }, // 25: left knee
      { x: 0.60, y: 0.72, z: 0, visibility: 1 }, // 26: right knee
      { x: 0.38, y: 0.92, z: 0, visibility: 1 }, // 27: left ankle
      { x: 0.62, y: 0.92, z: 0, visibility: 1 }, // 28: right ankle
      { x: 0.36, y: 0.95, z: 0, visibility: 1 }, // 29: left heel
      { x: 0.64, y: 0.95, z: 0, visibility: 1 }, // 30: right heel
      { x: 0.40, y: 0.96, z: 0, visibility: 1 }, // 31: left foot index
      { x: 0.60, y: 0.96, z: 0, visibility: 1 }, // 32: right foot index
    ]
    
    // Add small random movement for realism
    const time = Date.now() / 1000
    return basePose.map((point, i) => ({
      x: point.x + Math.sin(time + i * 0.5) * 0.008,
      y: point.y + Math.cos(time + i * 0.3) * 0.005,
      z: point.z,
      visibility: point.visibility,
    }))
  }, [])

  // Draw pose skeleton on canvas
  const drawPoseSkeleton = useCallback(() => {
    const canvas = canvasRef.current
    const video = videoRef.current
    if (!canvas || !video) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Match canvas size to video
    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Generate pose
    const pose = generateSimulatedPose()
    setLandmarks(pose)

    // Define skeleton connections
    const connections = [
      // Face
      [0, 1], [1, 2], [2, 3], [3, 7], // Left eye to ear
      [0, 4], [4, 5], [5, 6], [6, 8], // Right eye to ear
      [9, 10], // Mouth
      // Torso
      [11, 12], // Shoulders
      [11, 23], [12, 24], // Shoulders to hips
      [23, 24], // Hips
      // Left arm
      [11, 13], [13, 15], [15, 17], [15, 19], [15, 21],
      // Right arm
      [12, 14], [14, 16], [16, 18], [16, 20], [16, 22],
      // Left leg
      [23, 25], [25, 27], [27, 29], [27, 31],
      // Right leg
      [24, 26], [26, 28], [28, 30], [28, 32],
    ]

    // Draw connections
    ctx.strokeStyle = "#14b8a6" // Teal color
    ctx.lineWidth = 3
    ctx.lineCap = "round"

    for (const [start, end] of connections) {
      if (pose[start] && pose[end]) {
        const startX = pose[start].x * canvas.width
        const startY = pose[start].y * canvas.height
        const endX = pose[end].x * canvas.width
        const endY = pose[end].y * canvas.height

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }
    }

    // Draw landmarks
    for (let i = 0; i < pose.length; i++) {
      const point = pose[i]
      const x = point.x * canvas.width
      const y = point.y * canvas.height

      // Outer glow
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fillStyle = "rgba(20, 184, 166, 0.3)"
      ctx.fill()

      // Inner dot
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = "#14b8a6"
      ctx.fill()

      // White center
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = "#ffffff"
      ctx.fill()
    }

    // Calculate and draw angles
    const calculateAngle = (p1: Landmark, p2: Landmark, p3: Landmark) => {
      const radians = Math.atan2(p3.y - p2.y, p3.x - p2.x) - Math.atan2(p1.y - p2.y, p1.x - p2.x)
      let angle = Math.abs((radians * 180) / Math.PI)
      if (angle > 180) angle = 360 - angle
      return Math.round(angle)
    }

    // Draw angle at key joints
    const anglePoints = [
      { points: [11, 13, 15], label: "L Elbow" }, // Left elbow
      { points: [12, 14, 16], label: "R Elbow" }, // Right elbow
      { points: [23, 25, 27], label: "L Knee" }, // Left knee
      { points: [24, 26, 28], label: "R Knee" }, // Right knee
      { points: [11, 23, 25], label: "L Hip" }, // Left hip
      { points: [12, 24, 26], label: "R Hip" }, // Right hip
    ]

    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"

    for (const { points, label } of anglePoints) {
      const [i1, i2, i3] = points
      if (pose[i1] && pose[i2] && pose[i3]) {
        const angle = calculateAngle(pose[i1], pose[i2], pose[i3])
        const x = pose[i2].x * canvas.width
        const y = pose[i2].y * canvas.height

        // Background
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(x - 25, y - 28, 50, 32)

        // Angle text
        ctx.fillStyle = angle > 160 || angle < 90 ? "#f59e0b" : "#10b981"
        ctx.fillText(`${angle}°`, x, y - 12)
        
        // Label
        ctx.fillStyle = "#94a3b8"
        ctx.font = "10px sans-serif"
        ctx.fillText(label, x, y)
        ctx.font = "bold 12px sans-serif"
      }
    }
  }, [generateSimulatedPose])

  // Animation loop for pose visualization
  useEffect(() => {
    if (sessionState !== "active" && sessionState !== "paused" && cameraPermission !== "granted") {
      return
    }

    let lastTime = 0
    const fps = 30
    const interval = 1000 / fps

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= interval) {
        drawPoseSkeleton()
        lastTime = currentTime
      }
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [sessionState, cameraPermission, drawPoseSkeleton])

  // Request camera permission
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
        // Clear any existing source
        videoRef.current.srcObject = null
        
        // Set the new stream
        videoRef.current.srcObject = stream
        
        // Wait for metadata to load then play
        videoRef.current.onloadedmetadata = async () => {
          if (videoRef.current) {
            try {
              await videoRef.current.play()
            } catch (playError) {
              // Fallback: try playing on user interaction
            }
          }
        }
        
        // Also try playing directly after a short delay
        setTimeout(async () => {
          if (videoRef.current && videoRef.current.paused) {
            try {
              await videoRef.current.play()
            } catch (e) {
              // Silent fail, will work on next interaction
            }
          }
        }, 100)
      }
      
      setCameraPermission("granted")
    } catch (error) {
      setCameraPermission("denied")
    }
  }, [])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
  }, [])

  // Add AI message
  const addAIMessage = useCallback((type: AIMessage["type"], message: string) => {
    const newMessage: AIMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    }
    setAiMessages(prev => [...prev.slice(-4), newMessage])
    setCurrentMessage(message)

    // Text-to-speech if enabled
    if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8
      window.speechSynthesis.speak(utterance)
    }
  }, [voiceEnabled])

  // Start session
  const startSession = useCallback(() => {
    if (!selectedExercise) return
    
    setSessionState("briefing")
    const exerciseIntro = `We'll be doing ${selectedExercise.name}. ${selectedExercise.instructions}`
    addAIMessage("info", exerciseIntro)
    
    // Move to active after briefing
    setTimeout(() => {
      setSessionState("active")
      setSessionData(prev => ({ ...prev, startTime: new Date() }))
      addAIMessage("info", `${selectedExercise.name} session started. Follow the instructions and I'll guide you through.`)
    }, 4000)
  }, [selectedExercise, addAIMessage])

  // Pause/Resume session
  const togglePause = useCallback(() => {
    if (sessionState === "active") {
      setSessionState("paused")
      addAIMessage("info", "Session paused. Take a moment to rest.")
    } else if (sessionState === "paused") {
      setSessionState("active")
      addAIMessage("info", "Resuming session. Continue when ready.")
    }
  }, [sessionState, addAIMessage])

  // End session
  const endSession = useCallback(() => {
    setSessionState("complete")
    stopCamera()
    addAIMessage("encouragement", "Great session! Your movement quality has been analyzed.")
  }, [stopCamera, addAIMessage])

  // Simulate pose detection feedback (in production, this would use MediaPipe/MoveNet)
  useEffect(() => {
    if (sessionState !== "active") return

    const feedbackInterval = setInterval(() => {
      const rand = Math.random()
      
      if (rand < 0.3) {
        const correction = clinicalMessages.corrections[Math.floor(Math.random() * clinicalMessages.corrections.length)]
        const explanation = clinicalMessages.explanations[Math.floor(Math.random() * clinicalMessages.explanations.length)]
        addAIMessage("correction", `${correction} ${explanation}`)
        setSessionData(prev => ({ ...prev, corrections: prev.corrections + 1 }))
      } else if (rand < 0.5) {
        const encouragement = clinicalMessages.encouragement[Math.floor(Math.random() * clinicalMessages.encouragement.length)]
        addAIMessage("encouragement", encouragement)
      }
      
      // Update movement score
      setSessionData(prev => ({
        ...prev,
        movementScore: Math.min(100, Math.max(60, prev.movementScore + (Math.random() * 4 - 2))),
        duration: Math.floor((new Date().getTime() - prev.startTime.getTime()) / 1000),
      }))
    }, 8000)

    return () => clearInterval(feedbackInterval)
  }, [sessionState, addAIMessage])

  // Update duration timer
  useEffect(() => {
    if (sessionState !== "active") return

    const timer = setInterval(() => {
      setSessionData(prev => ({
        ...prev,
        duration: Math.floor((new Date().getTime() - prev.startTime.getTime()) / 1000),
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [sessionState])

  // Re-attach stream when session state changes (video element might change)
  useEffect(() => {
    if ((sessionState === "active" || sessionState === "paused") && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current
      videoRef.current.play().catch(() => {})
    }
  }, [sessionState])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [stopCamera])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getRiskColor = (risk: string) => {
    if (risk === "low") return "text-green-400 bg-green-500/10"
    if (risk === "moderate") return "text-yellow-400 bg-yellow-500/10"
    return "text-red-400 bg-red-500/10"
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/angle" className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-zinc-400" />
            </Link>
            <div>
              <h1 className="font-semibold text-white">HopeLine Angle</h1>
              <p className="text-xs text-zinc-500">Movement Analysis Session</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {sessionState === "active" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-500/10 rounded-full border border-teal-500/20">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-sm font-medium text-teal-400">{formatTime(sessionData.duration)}</span>
              </div>
            )}
            
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              {voiceEnabled ? (
                <Volume2 className="w-5 h-5 text-zinc-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-zinc-500" />
              )}
            </button>
            
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Settings className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* Setup Phase */}
        {sessionState === "setup" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Consent & Camera Section */}
            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-teal-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Camera Setup</h2>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Your camera is used only for movement analysis. No facial identity is stored. 
                  No video is recorded.
                </p>
              </div>

              {/* Camera Preview */}
              <div className="aspect-video bg-zinc-950 rounded-2xl overflow-hidden mb-6 relative border border-zinc-700">
                {cameraPermission === "granted" ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transform: "scaleX(-1)",
                        display: "block",
                        backgroundColor: "#000"
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 pointer-events-none"
                      style={{ 
                        width: "100%", 
                        height: "100%",
                        transform: "scaleX(-1)" 
                      }}
                    />
                    
                    {/* Camera Active Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-medium text-green-400">Camera Active</span>
                    </div>
                    
                    {/* Positioning Guide Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Body outline guide */}
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                        {/* Center line */}
                        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.3" strokeDasharray="2,2" />
                        
                        {/* Head circle guide */}
                        <circle cx="50" cy="15" r="8" fill="none" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="0.3" strokeDasharray="2,2" />
                        
                        {/* Shoulder line */}
                        <line x1="35" y1="28" x2="65" y2="28" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.3" strokeDasharray="2,2" />
                        
                        {/* Hip line */}
                        <line x1="40" y1="55" x2="60" y2="55" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="0.3" strokeDasharray="2,2" />
                      </svg>
                    </div>
                    
                    {/* Positioning Instructions */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-xl p-3 border border-zinc-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                            <Target className="w-4 h-4 text-teal-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">Position yourself in frame</p>
                            <p className="text-xs text-zinc-400">Stand back so your full body is visible. Align with the guide lines.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : cameraPermission === "denied" ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <CameraOff className="w-16 h-16 text-zinc-600 mb-4" />
                    <p className="text-zinc-400 mb-4">Camera access denied</p>
                    <button
                      onClick={requestCamera}
                      className="px-4 py-2 bg-teal-500 text-black font-medium rounded-lg hover:bg-teal-400 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Camera className="w-16 h-16 text-zinc-600 mb-4" />
                    <p className="text-zinc-400 mb-4">Enable camera to start</p>
                    <button
                      onClick={requestCamera}
                      className="px-6 py-3 bg-teal-500 text-black font-semibold rounded-xl hover:bg-teal-400 transition-colors"
                    >
                      Enable Camera
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Exercise Selection */}
            {cameraPermission === "granted" && (
              <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
                {!showExerciseList ? (
                  <>
                    <h3 className="text-lg font-semibold text-white mb-4">Select Exercise Category</h3>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      {exerciseCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.id)
                            setShowExerciseList(true)
                          }}
                          className={`p-4 rounded-xl border text-left transition-all ${
                            selectedCategory === category.id
                              ? "bg-teal-500/10 border-teal-500/50"
                              : "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600"
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3">
                            <category.icon className="w-5 h-5 text-teal-400" />
                          </div>
                          <h4 className="font-medium text-white mb-1">{category.name}</h4>
                          <p className="text-sm text-zinc-500">{category.description}</p>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => {
                          setShowExerciseList(false)
                          setSelectedExercise(null)
                        }}
                        className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-zinc-400" />
                      </button>
                      <h3 className="text-lg font-semibold text-white">
                        {exerciseCategories.find(c => c.id === selectedCategory)?.name} Exercises
                      </h3>
                    </div>
                    
                    <div className="space-y-3 mb-6 max-h-[300px] overflow-y-auto pr-2">
                      {exercises
                        .filter(ex => ex.category === selectedCategory)
                        .map((exercise) => (
                          <button
                            key={exercise.id}
                            onClick={() => setSelectedExercise(exercise)}
                            className={`w-full p-4 rounded-xl border text-left transition-all ${
                              selectedExercise?.id === exercise.id
                                ? "bg-teal-500/10 border-teal-500/50"
                                : "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-white">{exercise.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-zinc-700 text-zinc-300">{exercise.duration}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  exercise.difficulty === "Easy" 
                                    ? "bg-green-500/10 text-green-400" 
                                    : "bg-yellow-500/10 text-yellow-400"
                                }`}>
                                  {exercise.difficulty}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-zinc-500 mb-2">{exercise.description}</p>
                            {selectedExercise?.id === exercise.id && (
                              <div className="mt-3 pt-3 border-t border-zinc-700">
                                <p className="text-xs text-teal-400 font-medium mb-1">Instructions:</p>
                                <p className="text-sm text-zinc-400">{exercise.instructions}</p>
                              </div>
                            )}
                          </button>
                        ))}
                    </div>
                  </>
                )}

                <button
                  onClick={startSession}
                  disabled={!selectedExercise}
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  {selectedExercise ? `Start: ${selectedExercise.name}` : "Select an Exercise"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Briefing Phase */}
        {sessionState === "briefing" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 text-center">
              <div className="w-20 h-20 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                <Info className="w-10 h-10 text-teal-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Pre-Session Briefing</h2>
              <p className="text-lg text-zinc-300 mb-6 max-w-md mx-auto leading-relaxed">
                {currentMessage}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-sm text-zinc-500">Starting session...</span>
              </div>
            </div>
          </div>
        )}

        {/* Active Session */}
        {(sessionState === "active" || sessionState === "paused") && (
          <div className="h-[calc(100vh-64px)] flex">
            {/* Video Section */}
            <div className="flex-1 relative bg-zinc-950">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  transform: "scaleX(-1)",
                  display: "block",
                  backgroundColor: "#09090b"
                }}
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ 
                  width: "100%", 
                  height: "100%",
                  transform: "scaleX(-1)" 
                }}
              />
              
              {/* Current Exercise Instructions */}
              {selectedExercise && (
                <div className="absolute top-20 left-4 max-w-xs">
                  <div className="bg-black/70 backdrop-blur-sm rounded-xl p-4 border border-zinc-700">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <Activity className="w-3 h-3 text-teal-400" />
                      </div>
                      <h4 className="text-sm font-semibold text-teal-400">Current Exercise</h4>
                    </div>
                    <p className="text-white font-medium mb-2">{selectedExercise.name}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{selectedExercise.instructions}</p>
                    <div className="mt-3 pt-2 border-t border-zinc-700 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-zinc-300">{selectedExercise.duration}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        selectedExercise.difficulty === "Easy" 
                          ? "bg-green-500/10 text-green-400" 
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}>
                        {selectedExercise.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay - Status */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${sessionState === "paused" ? "bg-yellow-500/20 border-yellow-500/30" : "bg-teal-500/20 border-teal-500/30"} border backdrop-blur-sm`}>
                  <div className={`w-2 h-2 rounded-full ${sessionState === "paused" ? "bg-yellow-400" : "bg-teal-400 animate-pulse"}`} />
                  <span className={`text-sm font-medium ${sessionState === "paused" ? "text-yellow-400" : "text-teal-400"}`}>
                    {sessionState === "paused" ? "Paused" : "Analyzing"}
                  </span>
                </div>

                {/* Score Display */}
                <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-zinc-700">
                  <div className="text-center">
                    <p className="text-xs text-zinc-400 mb-1">Movement Score</p>
                    <p className={`text-3xl font-bold ${getScoreColor(sessionData.movementScore)}`}>
                      {Math.round(sessionData.movementScore)}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Message Display */}
              {currentMessage && (
                <div className="absolute bottom-24 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-4 border border-zinc-700 max-w-xl mx-auto">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-teal-400" />
                      </div>
                      <p className="text-zinc-200 leading-relaxed">{currentMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                  onClick={togglePause}
                  className="p-4 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  {sessionState === "paused" ? (
                    <Play className="w-6 h-6 text-white" />
                  ) : (
                    <Pause className="w-6 h-6 text-white" />
                  )}
                </button>
                <button
                  onClick={endSession}
                  className="p-4 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors border border-red-500/30"
                >
                  <Square className="w-6 h-6 text-red-400" />
                </button>
              </div>
            </div>

            {/* Side Panel - Metrics */}
            <div className="w-80 bg-zinc-900 border-l border-zinc-800 overflow-y-auto hidden lg:block">
              <div className="p-6 space-y-6">
                {/* Session Stats */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-4">Session Metrics</h3>
                  <div className="space-y-4">
                    <div className="bg-zinc-800/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-zinc-400">Duration</span>
                        <Clock className="w-4 h-4 text-zinc-500" />
                      </div>
                      <p className="text-2xl font-bold text-white">{formatTime(sessionData.duration)}</p>
                    </div>

                    <div className="bg-zinc-800/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-zinc-400">Risk Level</span>
                        <AlertTriangle className="w-4 h-4 text-zinc-500" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(sessionData.riskLevel)}`}>
                        {sessionData.riskLevel.charAt(0).toUpperCase() + sessionData.riskLevel.slice(1)}
                      </span>
                    </div>

                    <div className="bg-zinc-800/50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-zinc-400">Corrections</span>
                        <Target className="w-4 h-4 text-zinc-500" />
                      </div>
                      <p className="text-2xl font-bold text-white">{sessionData.corrections}</p>
                    </div>
                  </div>
                </div>

                {/* AI Messages History */}
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-4">AI Guidance</h3>
                  <div className="space-y-3">
                    {aiMessages.slice(-5).map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 rounded-xl text-sm ${
                          msg.type === "warning"
                            ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-300"
                            : msg.type === "correction"
                            ? "bg-orange-500/10 border border-orange-500/20 text-orange-300"
                            : msg.type === "encouragement"
                            ? "bg-green-500/10 border border-green-500/20 text-green-300"
                            : "bg-zinc-800 border border-zinc-700 text-zinc-300"
                        }`}
                      >
                        {msg.message}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Session Complete */}
        {sessionState === "complete" && (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Session Complete</h2>
                <p className="text-zinc-400">Great work! Here's your session summary.</p>
              </div>

              {/* Summary Stats */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-400 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-white">{formatTime(sessionData.duration)}</p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-400 mb-1">Movement Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(sessionData.movementScore)}`}>
                    {Math.round(sessionData.movementScore)}
                  </p>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-zinc-400 mb-1">Corrections</p>
                  <p className="text-2xl font-bold text-white">{sessionData.corrections}</p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-teal-500/10 rounded-xl p-4 border border-teal-500/20 mb-8">
                <h3 className="font-semibold text-teal-400 mb-2">Recommendation</h3>
                <p className="text-zinc-300 text-sm">
                  Your posture alignment showed improvement during this session. 
                  Continue practicing these movements 2-3 times per week for best results.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/angle/session"
                  onClick={() => window.location.reload()}
                  className="flex-1 py-3 px-6 bg-teal-500 text-black font-semibold rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  New Session
                </Link>
                <Link
                  href="/angle"
                  className="flex-1 py-3 px-6 bg-zinc-800 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                >
                  Back to Angle
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
