"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import {
  MessageCircle,
  Wind,
  AlertCircle,
  Heart,
  Building2,
  Shield,
  Settings,
  Home,
  TrendingUp,
  Users,
  Clock,
  Activity,
  BookOpen,
  Music,
  Brain,
  Phone,
  ChevronRight,
  Plus,
  Calendar,
  Target,
  Sparkles,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Smile,
  Frown,
  Meh,
} from "lucide-react"

interface Story {
  id: string
  title: string
  author_name: string
  created_at: string
  category: string
}

export default function DashboardPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [storiesCount, setStoriesCount] = useState(0)
  const [currentMood, setCurrentMood] = useState<string | null>(null)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    // Set greeting based on time
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good Morning")
    else if (hour < 18) setGreeting("Good Afternoon")
    else setGreeting("Good Evening")

    // Fetch stories count
    const fetchData = async () => {
      const supabase = createClient()
      const { data, count } = await supabase
        .from("stories")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .limit(3)
      
      if (data) {
        setStories(data)
        setStoriesCount(count || 0)
      }
    }
    fetchData()
  }, [])

  const quickActions = [
    { icon: MessageCircle, label: "AI Chat", href: "/chat", color: "bg-purple-500", description: "Talk to counselor" },
    { icon: Wind, label: "Breathing", href: "/breathing", color: "bg-blue-500", description: "Calm exercises" },
    { icon: Music, label: "Music", href: "/music", color: "bg-pink-500", description: "Therapy sounds" },
    { icon: Brain, label: "Journal", href: "/journal", color: "bg-indigo-500", description: "Write thoughts" },
    { icon: Target, label: "Challenges", href: "/challenges", color: "bg-green-500", description: "7-day goals" },
    { icon: BookOpen, label: "Stories", href: "/community", color: "bg-orange-500", description: "Read & share" },
  ]

  const stats = [
    { label: "Community Stories", value: storiesCount.toString(), change: "+12%", trend: "up", icon: BookOpen },
    { label: "Active Sessions", value: "24/7", change: "Always", trend: "up", icon: Activity },
    { label: "Resources", value: "50+", change: "+5 new", trend: "up", icon: Heart },
    { label: "Response Time", value: "<1s", change: "Instant", trend: "up", icon: Clock },
  ]

  const moodOptions = [
    { icon: Smile, label: "Good", color: "text-green-400 bg-green-500/20 hover:bg-green-500/30" },
    { icon: Meh, label: "Okay", color: "text-yellow-400 bg-yellow-500/20 hover:bg-yellow-500/30" },
    { icon: Frown, label: "Low", color: "text-red-400 bg-red-500/20 hover:bg-red-500/30" },
  ]

  const navSections = [
    {
      title: "Crisis Support",
      icon: AlertCircle,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      items: [
        { label: "Emergency Help", href: "/crisis", icon: Phone },
        { label: "Stay Alive", href: "/stay-alive", icon: Heart },
        { label: "Survivor Support", href: "/survivor-support", icon: Shield },
      ],
    },
    {
      title: "Recovery Tools",
      icon: Heart,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      items: [
        { label: "Recovery Companion", href: "/recovery", icon: Target },
        { label: "Rehab Centers", href: "/rehab-centers", icon: Building2 },
        { label: "Self-Improvement", href: "/challenges", icon: TrendingUp },
      ],
    },
    {
      title: "Resources",
      icon: Building2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      items: [
        { label: "Government Agencies", href: "/agencies", icon: Building2 },
        { label: "Rainbo Initiative", href: "/rainbo", icon: Heart },
        { label: "Contact Support", href: "/rehab-contact", icon: MessageCircle },
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">HopeLine Dashboard</h1>
                <p className="text-sm text-zinc-400">{greeting}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/settings"
                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <Settings className="w-5 h-5 text-zinc-400" />
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-medium"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-900/40 to-red-800/20 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-red-500/20">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-red-300">Need Immediate Help?</h3>
                <p className="text-sm text-zinc-400">24/7 emergency support is available</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="tel:999"
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition-colors text-sm font-semibold"
              >
                Call 999
              </a>
              <Link
                href="/crisis"
                className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-colors text-sm font-semibold"
              >
                Crisis Resources
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 text-red-400" />
                    )}
                    <span className="text-green-400">{stat.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Quick Actions
                </h2>
                <Link href="/features" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                  View all <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="group flex flex-col items-center gap-3 p-5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 hover:border-purple-500/50 hover:bg-zinc-800 transition-all"
                    >
                      <div className={`p-3 rounded-xl ${action.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-center">
                        <div className="font-semibold group-hover:text-purple-300 transition-colors">{action.label}</div>
                        <div className="text-xs text-zinc-500">{action.description}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Navigation Sections */}
            <div className="grid md:grid-cols-3 gap-4">
              {navSections.map((section) => {
                const SectionIcon = section.icon
                return (
                  <div
                    key={section.title}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${section.bgColor}`}>
                        <SectionIcon className={`w-5 h-5 ${section.color}`} />
                      </div>
                      <h3 className="font-semibold">{section.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800 transition-colors group"
                          >
                            <ItemIcon className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
                            <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                              {item.label}
                            </span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Mood Check */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                How are you feeling?
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {moodOptions.map((mood) => {
                  const MoodIcon = mood.icon
                  return (
                    <button
                      key={mood.label}
                      onClick={() => setCurrentMood(mood.label)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                        currentMood === mood.label
                          ? mood.color + " ring-2 ring-offset-2 ring-offset-zinc-900"
                          : "bg-zinc-800 hover:bg-zinc-700"
                      }`}
                    >
                      <MoodIcon className={`w-6 h-6 ${currentMood === mood.label ? "" : "text-zinc-400"}`} />
                      <span className="text-xs font-medium">{mood.label}</span>
                    </button>
                  )
                })}
              </div>
              {currentMood && (
                <div className="mt-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <p className="text-sm text-purple-300">
                    {currentMood === "Good" && "Great! Keep taking care of yourself."}
                    {currentMood === "Okay" && "It's okay to have neutral days. We're here if you need us."}
                    {currentMood === "Low" && "We're here for you. Consider talking to our AI counselor."}
                  </p>
                </div>
              )}
            </div>

            {/* Recent Stories */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Recent Stories
                </h3>
                <Link href="/community" className="text-sm text-purple-400 hover:text-purple-300">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {stories.length > 0 ? (
                  stories.map((story) => (
                    <Link
                      key={story.id}
                      href="/community"
                      className="block p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                    >
                      <div className="font-medium text-sm truncate">{story.title}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-zinc-500">by {story.author_name}</span>
                        <span className="text-xs text-purple-400 capitalize">{story.category}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-4 text-zinc-500 text-sm">
                    No stories yet. Be the first to share!
                  </div>
                )}
              </div>
              <Link
                href="/community/share-story"
                className="flex items-center justify-center gap-2 mt-4 p-3 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                Share Your Story
              </Link>
            </div>

            {/* Daily Tip */}
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-300 mb-2">Daily Wellness Tip</h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    Take 5 minutes today to practice deep breathing. It can help reduce stress and improve focus.
                  </p>
                  <Link
                    href="/breathing"
                    className="inline-flex items-center gap-1 mt-3 text-sm text-purple-400 hover:text-purple-300"
                  >
                    Try breathing exercises <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-500/10">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-green-300 mb-1">Your Privacy is Protected</h3>
              <p className="text-sm text-zinc-400">
                All features are designed for anonymous use. We don't track personal information or store
                identifiable data. Your conversations and activities remain private and secure.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-semibold text-zinc-300 mb-2">HopeLine AI - Sierra Leone</p>
          <p className="text-sm text-zinc-500">Compassionate support for crisis, recovery, and healing</p>
          <p className="mt-4 text-xs text-zinc-600">All Rights Reserved - Limkokwing University Sierra Leone</p>
        </div>
      </footer>
    </div>
  )
}
