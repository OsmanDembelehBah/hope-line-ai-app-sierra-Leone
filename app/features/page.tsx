"use client"

import Link from "next/link"
import {
  MessageCircle,
  Wind,
  Music,
  Brain,
  Target,
  BookOpen,
  Heart,
  AlertCircle,
  Building2,
  Shield,
  Phone,
  ArrowLeft,
  Users,
  Sparkles,
  Calendar,
  Headphones,
  FileText,
  TrendingUp,
  Home,
  Activity,
  Clock,
  MapPin,
} from "lucide-react"

export default function FeaturesPage() {
  const allFeatures = [
    {
      category: "Support Tools",
      description: "Get immediate help and support",
      items: [
        { icon: MessageCircle, label: "AI Chat Counselor", href: "/chat", color: "bg-purple-500", description: "Talk to our compassionate AI counselor 24/7. Get personalized support for whatever you're going through." },
        { icon: Wind, label: "Breathing Exercises", href: "/breathing", color: "bg-blue-500", description: "Guided breathing techniques to help calm anxiety, reduce stress, and find peace." },
        { icon: Music, label: "Music Therapy", href: "/music", color: "bg-pink-500", description: "Curated calming music and sounds to help you relax and find inner peace." },
        { icon: Headphones, label: "Relaxation", href: "/relax", color: "bg-teal-500", description: "Various relaxation techniques and guided meditations for stress relief." },
      ],
    },
    {
      category: "Personal Growth",
      description: "Track your journey and grow",
      items: [
        { icon: Brain, label: "Personal Journal", href: "/journal", color: "bg-indigo-500", description: "Write your thoughts, track your emotions, and reflect on your journey privately." },
        { icon: Target, label: "7-Day Challenges", href: "/challenges", color: "bg-green-500", description: "Take on daily wellness challenges to build healthy habits and improve mental health." },
        { icon: TrendingUp, label: "Recovery Tracker", href: "/recovery", color: "bg-cyan-500", description: "Track your recovery progress with personalized milestones and achievements." },
        { icon: Calendar, label: "Daily Check-in", href: "/dashboard", color: "bg-amber-500", description: "Monitor your mood and wellbeing with daily check-ins and insights." },
      ],
    },
    {
      category: "Community",
      description: "Connect and share with others",
      items: [
        { icon: BookOpen, label: "Community Stories", href: "/community", color: "bg-orange-500", description: "Read inspiring recovery stories from others who have walked similar paths." },
        { icon: FileText, label: "Share Your Story", href: "/community/share-story", color: "bg-rose-500", description: "Share your journey and inspire others in the community. Your story matters." },
        { icon: Users, label: "Support Groups", href: "/community", color: "bg-violet-500", description: "Connect with others who understand. Find community in shared experiences." },
        { icon: Sparkles, label: "News & Updates", href: "/news", color: "bg-fuchsia-500", description: "Stay updated with the latest mental health resources and HopeLine news." },
      ],
    },
    {
      category: "Crisis Support",
      description: "Immediate help when you need it",
      items: [
        { icon: AlertCircle, label: "Emergency Help", href: "/crisis", color: "bg-red-500", description: "Immediate crisis resources and emergency contacts. You're not alone." },
        { icon: Phone, label: "Hotlines", href: "/crisis", color: "bg-red-600", description: "Direct access to crisis hotlines and emergency services in Sierra Leone." },
        { icon: Heart, label: "Stay Alive Plan", href: "/stay-alive", color: "bg-red-400", description: "Create a personal safety plan for difficult moments. Small steps matter." },
        { icon: Shield, label: "Survivor Support", href: "/survivor-support", color: "bg-purple-600", description: "Specialized support for trauma and abuse survivors. Healing is possible." },
      ],
    },
    {
      category: "Resources",
      description: "Find help and information",
      items: [
        { icon: Building2, label: "Government Agencies", href: "/agencies", color: "bg-slate-500", description: "Directory of government mental health and social services in Sierra Leone." },
        { icon: MapPin, label: "Rehab Centers", href: "/rehab-centers", color: "bg-emerald-500", description: "Find rehabilitation centers and treatment facilities near you." },
        { icon: Heart, label: "Rainbo Initiative", href: "/rainbo", color: "bg-yellow-500", description: "Learn about the Rainbo Initiative's support for survivors of sexual violence." },
        { icon: Users, label: "Our Team", href: "/team", color: "bg-blue-600", description: "Meet the passionate team behind HopeLine AI Sierra Leone." },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-400" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">All Features</h1>
                <p className="text-sm text-zinc-400">Everything HopeLine has to offer</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-medium"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Explore All Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Complete Mental Health Toolkit
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            HopeLine offers a comprehensive suite of tools and resources designed to support your mental health journey.
            All features are free, anonymous, and available 24/7.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">20+</div>
            <div className="text-sm text-zinc-400">Features</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">24/7</div>
            <div className="text-sm text-zinc-400">Available</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">100%</div>
            <div className="text-sm text-zinc-400">Anonymous</div>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-400">Free</div>
            <div className="text-sm text-zinc-400">Always</div>
          </div>
        </div>

        {/* Feature Categories */}
        <div className="space-y-12">
          {allFeatures.map((category) => (
            <section key={category.category}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{category.category}</h3>
                <p className="text-zinc-400">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((feature) => {
                  const Icon = feature.icon
                  return (
                    <Link
                      key={feature.href + feature.label}
                      href={feature.href}
                      className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500/50 hover:bg-zinc-800/50 transition-all"
                    >
                      <div className={`inline-flex p-3 rounded-xl ${feature.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold mb-2 group-hover:text-purple-300 transition-colors">
                        {feature.label}
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </Link>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-zinc-300 mb-6 max-w-xl mx-auto">
            Whether you need someone to talk to, want to track your progress, or find resources - we're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-colors font-semibold"
            >
              <MessageCircle className="w-5 h-5" />
              Start Chatting
            </Link>
            <Link
              href="/crisis"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition-colors font-semibold"
            >
              <AlertCircle className="w-5 h-5" />
              Get Help Now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-semibold text-zinc-300 mb-2">HopeLine AI - Sierra Leone</p>
          <p className="text-sm text-zinc-500">Compassionate support for crisis, recovery, and healing</p>
        </div>
      </footer>
    </div>
  )
}
