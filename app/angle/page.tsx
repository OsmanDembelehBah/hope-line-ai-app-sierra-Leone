"use client"

import Link from "next/link"
import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import {
  Activity,
  Camera,
  Shield,
  Brain,
  Heart,
  ArrowRight,
  CheckCircle,
  Play,
  Sparkles,
  Monitor,
  Users,
  TrendingUp,
  AlertTriangle,
  Clock,
  Target,
  Zap,
  Eye,
  Lock,
} from "lucide-react"

export default function AnglePage() {
  const [showConsentModal, setShowConsentModal] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 via-black to-black" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-400">New Feature</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              HopeLine{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Angle
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-4 leading-relaxed">
              AI-Powered Movement & Physical Health Intelligence
            </p>

            <p className="text-zinc-500 max-w-2xl mx-auto mb-10">
              Professional-grade posture analysis, movement correction, and rehabilitation support 
              using your webcam. Designed for preventative care and recovery guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/angle/session"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-bold rounded-full hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/25"
              >
                <Play className="w-5 h-5" />
                Start Session
              </Link>
              <button
                onClick={() => setShowConsentModal(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 text-white font-medium rounded-full hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                <Shield className="w-5 h-5" />
                How It Works
              </button>
            </div>
          </div>

          {/* Feature Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-teal-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Real-Time Analysis</h3>
              <p className="text-zinc-400 text-sm">
                Advanced pose estimation tracks your movement in real-time using your webcam.
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-cyan-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">AI Guidance</h3>
              <p className="text-zinc-400 text-sm">
                Clinical-style feedback and corrections delivered in calm, professional language.
              </p>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-teal-500/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-zinc-400 text-sm">
                Track your improvement over time with detailed session reports and metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What is HopeLine Angle */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What is HopeLine Angle?
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                HopeLine Angle is a professional, medical-aware AI system that uses your webcam 
                and computer vision to analyze human posture, movement quality, and exercise 
                execution in real time.
              </p>
              <p className="text-zinc-400 leading-relaxed mb-6">
                This is <strong className="text-white">not</strong> a fitness app and{" "}
                <strong className="text-white">not</strong> a medical diagnosis tool. It's a 
                preventative, rehabilitation-support, and physical health monitoring platform 
                built for low-resource environments and global scalability.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300">Posture alignment analysis (neck, spine, hips)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300">Joint symmetry measurement (left vs right)</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300">Range of motion (ROM) estimation</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <p className="text-zinc-300">Compensatory movement detection</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
              <div className="aspect-video bg-black rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5" />
                <div className="text-center relative z-10">
                  <Camera className="w-16 h-16 text-zinc-600 mx-auto mb-3" />
                  <p className="text-zinc-500">Camera preview will appear here</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-teal-400">0-100</p>
                  <p className="text-xs text-zinc-500">Movement Score</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-cyan-400">Low</p>
                  <p className="text-xs text-zinc-500">Risk Level</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Real-time</p>
                  <p className="text-xs text-zinc-500">Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Functionality</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Professional-grade features designed for clinical environments and personal use
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Pose Estimation",
                description: "Track full skeletal landmarks: head, spine, hips, knees, shoulders, ankles in real-time.",
                color: "teal",
              },
              {
                icon: Activity,
                title: "Movement Assessment",
                description: "Analyze posture alignment, joint symmetry, and range of motion with medical-grade accuracy.",
                color: "cyan",
              },
              {
                icon: Target,
                title: "Form Correction",
                description: "Receive real-time feedback: 'Straighten your spine slightly', 'Reduce knee angle'.",
                color: "teal",
              },
              {
                icon: AlertTriangle,
                title: "Safety Detection",
                description: "Automatic session pause when unsafe movements are detected. Your safety comes first.",
                color: "yellow",
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Track improvement trends over time with movement quality scores and detailed metrics.",
                color: "cyan",
              },
              {
                icon: Monitor,
                title: "Session Reports",
                description: "Get clinical summaries with movement accuracy, ROM improvement, and recommendations.",
                color: "teal",
              },
            ].map((feature, i) => (
              <div key={i} className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800 hover:border-teal-500/30 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Communication Style */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 flex-1">
                    <p className="text-zinc-300 text-sm">"Let's slow this movement slightly."</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 flex-1">
                    <p className="text-zinc-300 text-sm">"You're improving compared to your last session."</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 flex-1 border border-yellow-500/20">
                    <p className="text-zinc-300 text-sm">"I recommend pausing this exercise for safety."</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-4 flex-1">
                    <p className="text-zinc-300 text-sm">"This adjustment reduces strain on your lower back."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Clinical AI Communication
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                HopeLine Angle communicates using professional, clinical-style language. 
                This is not conversational AI for fun — it's clinical guidance.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <p className="text-zinc-300">Calm and neutral tone</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <p className="text-zinc-300">Non-judgmental and encouraging</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <p className="text-zinc-300">Never alarming or pressuring</p>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <p className="text-zinc-300">Explains reasoning when helpful</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Who It's For</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Designed for individuals and clinicians in various settings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 rounded-3xl p-8 border border-teal-500/20">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Individual Mode</h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                  Friendly, simple guidance
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                  Focus on safety and progress
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                  Perfect for home rehabilitation
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-400 mt-1 flex-shrink-0" />
                  Desk workers and posture correction
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-900/20 to-teal-900/20 rounded-3xl p-8 border border-cyan-500/20">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6">
                <Monitor className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Clinician Mode</h3>
              <ul className="space-y-3 text-zinc-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  Technical metrics and ROM values
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  Joint angle measurements
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  Trend charts and analytics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                  Patient monitoring dashboards
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Safety */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-teal-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Your Privacy & Safety
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Your camera is used <strong className="text-white">only</strong> for movement analysis. 
            No facial identity is stored. No video is recorded or transmitted. 
            All processing happens in your browser.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <Shield className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">No Recording</h3>
              <p className="text-zinc-500 text-sm">Video never leaves your device</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <Eye className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">No Identity</h3>
              <p className="text-zinc-500 text-sm">No facial recognition used</p>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-800">
              <Lock className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Your Control</h3>
              <p className="text-zinc-500 text-sm">Stop anytime, delete anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-teal-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Begin your first movement analysis session. No account required.
          </p>
          <Link
            href="/angle/session"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-bold rounded-full hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/25 text-lg"
          >
            <Play className="w-6 h-6" />
            Start Your First Session
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />

      {/* Consent Modal */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 rounded-3xl p-8 max-w-lg w-full border border-zinc-800 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">How HopeLine Angle Works</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal-400 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Camera Access</h4>
                  <p className="text-zinc-400 text-sm">We'll ask permission to use your webcam for movement tracking.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal-400 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">AI Analysis</h4>
                  <p className="text-zinc-400 text-sm">Our AI tracks your skeletal landmarks and analyzes your movement.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal-400 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Real-Time Feedback</h4>
                  <p className="text-zinc-400 text-sm">Receive professional guidance and corrections as you move.</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
              <p className="text-zinc-400 text-sm text-center">
                <Lock className="w-4 h-4 inline mr-1" />
                No video is recorded or stored. Processing happens locally.
              </p>
            </div>

            <button
              onClick={() => setShowConsentModal(false)}
              className="w-full py-3 bg-teal-500 text-black font-semibold rounded-xl hover:bg-teal-400 transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
