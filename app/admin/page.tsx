"use client"

import React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import {
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Send,
  Trash2,
  Eye,
  X,
  ArrowLeft,
  RefreshCw,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Mail,
  Calendar,
  FileText,
  Shield,
  Lock,
  ImageIcon,
  Upload,
  Video,
  Youtube,
  Activity,
  Heart,
  Brain,
  ExternalLink,
} from "lucide-react"

const ADMIN_PASSWORD = "Numa8375#$"

interface SupportMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "new" | "in_progress" | "resolved"
  created_at: string
  admin_response?: string
}

interface NewsPost {
  id: string
  title: string
  content: string
  category: string
  is_published: boolean
  created_at: string
  author_name: string
  image_url?: string
  video_url?: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [activeTab, setActiveTab] = useState<"overview" | "messages" | "news" | "users">("overview")
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [news, setNews] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null)
  const [adminResponse, setAdminResponse] = useState("")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "update", image_url: "", video_url: "" })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [stats, setStats] = useState({
    totalMessages: 0,
    newMessages: 0,
    resolvedMessages: 0,
    totalNews: 0,
    totalStories: 0,
  })

  useEffect(() => {
    // Check if already logged in (session storage)
    const savedAuth = sessionStorage.getItem("hopeline_admin_auth")
    if (savedAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      sessionStorage.setItem("hopeline_admin_auth", "true")
      setLoginError("")
    } else {
      setLoginError("Incorrect password. Please try again.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("hopeline_admin_auth")
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
              <p className="text-zinc-400">Enter password to access the dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                Access Dashboard
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                Back to HopeLine
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async function loadData() {
    setLoading(true)
    const supabase = createClient()

    // Load support messages
    const { data: messagesData } = await supabase
      .from("support_messages")
      .select("*")
      .order("created_at", { ascending: false })

    // Load news posts
    const { data: newsData } = await supabase
      .from("news_posts")
      .select("*")
      .order("created_at", { ascending: false })

    // Load stories count
    const { count: storiesCount } = await supabase
      .from("stories")
      .select("*", { count: "exact", head: true })

    if (messagesData) {
      setMessages(messagesData)
      setStats(prev => ({
        ...prev,
        totalMessages: messagesData.length,
        newMessages: messagesData.filter(m => m.status === "new").length,
        resolvedMessages: messagesData.filter(m => m.status === "resolved").length,
      }))
    }

    if (newsData) {
      setNews(newsData)
      setStats(prev => ({ ...prev, totalNews: newsData.length }))
    }

    if (storiesCount !== null) {
      setStats(prev => ({ ...prev, totalStories: storiesCount }))
    }

    setLoading(false)
  }

  async function updateMessageStatus(id: string, status: string, response?: string) {
    setIsSubmitting(true)
    const supabase = createClient()

    const updateData: any = { status }
    if (response) updateData.admin_response = response

    await supabase.from("support_messages").update(updateData).eq("id", id)

    setSelectedMessage(null)
    setAdminResponse("")
    await loadData()
    setIsSubmitting(false)
  }

  async function deleteMessage(id: string) {
    const supabase = createClient()
    await supabase.from("support_messages").delete().eq("id", id)
    await loadData()
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return null
    
    setUploadingImage(true)
    const supabase = createClient()
    
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `news-${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('news-images')
      .upload(fileName, imageFile)
    
    setUploadingImage(false)
    
    if (error) {
      // If bucket doesn't exist, use base64 data URL as fallback
      console.log("[v0] Storage upload error, using preview URL:", error)
      return imagePreview
    }
    
    const { data: urlData } = supabase.storage
      .from('news-images')
      .getPublicUrl(fileName)
    
    return urlData.publicUrl
  }

  async function createNewsPost() {
    if (!newPost.title || !newPost.content) return

    setIsSubmitting(true)
    const supabase = createClient()

    let imageUrl = null
    if (imageFile) {
      imageUrl = await uploadImage()
    }

    const { error } = await supabase.from("news_posts").insert({
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      author_name: "HopeLine Admin",
      is_published: true,
      image_url: imageUrl,
      video_url: newPost.video_url || null,
    })

    if (error) {
      alert("Error creating post: " + error.message)
    } else {
      setNewPost({ title: "", content: "", category: "update", image_url: "", video_url: "" })
      setImageFile(null)
      setImagePreview(null)
      setShowNewPostForm(false)
      await loadData()
    }
    setIsSubmitting(false)
  }

  async function deleteNewsPost(id: string) {
    const supabase = createClient()
    await supabase.from("news_posts").delete().eq("id", id)
    await loadData()
  }

  async function toggleNewsPublished(id: string, isPublished: boolean) {
    const supabase = createClient()
    await supabase.from("news_posts").update({ is_published: !isPublished }).eq("id", id)
    await loadData()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-red-500/20 text-red-400 border-red-500/30"
      case "in_progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "resolved": return "bg-green-500/20 text-green-400 border-green-500/30"
      default: return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "update": return "bg-blue-500/20 text-blue-400"
      case "feature": return "bg-purple-500/20 text-purple-400"
      case "announcement": return "bg-green-500/20 text-green-400"
      case "event": return "bg-orange-500/20 text-orange-400"
      default: return "bg-zinc-500/20 text-zinc-400"
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-xs text-zinc-500">HopeLine Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            </button>
            <div className="relative">
              <Bell className="w-5 h-5 text-zinc-400" />
              {stats.newMessages > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {stats.newMessages}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: "overview", label: "Overview", icon: LayoutDashboard },
            { id: "messages", label: "Messages", icon: MessageSquare, badge: stats.newMessages },
            { id: "news", label: "News & Updates", icon: Newspaper },
            { id: "users", label: "Community", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
              {tab.badge && tab.badge > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-red-500 rounded-full text-xs text-white">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { label: "Total Messages", value: stats.totalMessages, icon: Mail, color: "from-blue-500 to-cyan-500" },
                { label: "New Messages", value: stats.newMessages, icon: AlertCircle, color: "from-red-500 to-orange-500" },
                { label: "Resolved", value: stats.resolvedMessages, icon: CheckCircle, color: "from-green-500 to-emerald-500" },
                { label: "News Posts", value: stats.totalNews, icon: Newspaper, color: "from-purple-500 to-pink-500" },
                { label: "Community Stories", value: stats.totalStories, icon: FileText, color: "from-indigo-500 to-purple-500" },
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* New Features Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* HopeLine Therapy Card */}
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full">NEW FEATURE</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">HopeLine Therapy</h3>
                <p className="text-zinc-400 text-sm mb-4">
                  Live AI video therapy sessions with face-to-face support. Users can see themselves and talk to the AI therapist in real-time.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/therapy"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors text-sm font-medium"
                  >
                    <Video className="w-4 h-4" />
                    Open Therapy
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* HopeLine Angle Card */}
              <div className="bg-gradient-to-br from-teal-900/50 to-cyan-900/50 rounded-2xl p-6 border border-teal-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full">NEW FEATURE</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">HopeLine Angle</h3>
                <p className="text-zinc-400 text-sm mb-4">
                  AI-powered movement analysis with 15+ exercises. Webcam-based pose estimation for physical health and rehabilitation.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/angle"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition-colors text-sm font-medium"
                  >
                    <Activity className="w-4 h-4" />
                    Open Angle
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link
                    href="/angle/session"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                  >
                    Start Session
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Messages */}
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent Messages</h3>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {messages.slice(0, 4).map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${msg.status === "new" ? "bg-red-500" : msg.status === "in_progress" ? "bg-yellow-500" : "bg-green-500"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{msg.subject}</p>
                        <p className="text-xs text-zinc-500">{msg.name} - {new Date(msg.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-zinc-500 py-8">No messages yet</p>
                  )}
                </div>
              </div>

              {/* Recent News */}
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Recent News</h3>
                  <button
                    onClick={() => setActiveTab("news")}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {news.slice(0, 4).map((post) => (
                    <div key={post.id} className="flex items-start gap-3 p-3 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{post.title}</p>
                        <p className="text-xs text-zinc-500">{new Date(post.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {news.length === 0 && (
                    <p className="text-center text-zinc-500 py-8">No news posts yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Support Messages</h2>
              <div className="flex gap-2">
                {["all", "new", "in_progress", "resolved"].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors text-sm capitalize"
                  >
                    {filter.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
              {messages.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No support messages yet</p>
                </div>
              ) : (
                <div className="divide-y divide-zinc-800">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-6 hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(msg.status)}`}>
                              {msg.status.replace("_", " ")}
                            </span>
                            <span className="text-xs text-zinc-500">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-1">{msg.subject}</h3>
                          <p className="text-sm text-zinc-400 mb-2">
                            From: <span className="text-white">{msg.name}</span> ({msg.email})
                          </p>
                          <p className="text-zinc-300 line-clamp-2">{msg.message}</p>
                          {msg.admin_response && (
                            <div className="mt-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                              <p className="text-xs text-purple-400 mb-1">Admin Response:</p>
                              <p className="text-sm text-zinc-300">{msg.admin_response}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedMessage(msg)
                              setAdminResponse(msg.admin_response || "")
                            }}
                            className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">News & Updates</h2>
              <button
                onClick={() => setShowNewPostForm(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Post
              </button>
            </div>

            {/* New Post Form */}
            {showNewPostForm && (
              <div className="bg-zinc-900 rounded-2xl p-6 border border-purple-500/30">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Create New Post</h3>
                  <button onClick={() => setShowNewPostForm(false)} className="text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none"
                      placeholder="Enter post title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none"
                    >
                      <option value="update">Update</option>
                      <option value="feature">New Feature</option>
                      <option value="announcement">Announcement</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Content</label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none resize-none"
                      placeholder="Write your post content..."
                    />
                  </div>
                  
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      <ImageIcon className="w-4 h-4 inline mr-2" />
                      Attach Image (optional)
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 cursor-pointer">
                        <div className="px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 border-dashed text-zinc-400 hover:border-purple-500 hover:text-purple-400 transition-colors flex items-center justify-center gap-2">
                          <Upload className="w-5 h-5" />
                          {imageFile ? imageFile.name : "Choose image file..."}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                      {imagePreview && (
                        <button
                          onClick={() => { setImageFile(null); setImagePreview(null); }}
                          className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    {imagePreview && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-zinc-700">
                        <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
                      </div>
                    )}
                  </div>

                  {/* YouTube Video Link */}
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">
                      <Youtube className="w-4 h-4 inline mr-2" />
                      YouTube Video Link (optional)
                    </label>
                    <input
                      type="url"
                      value={newPost.video_url}
                      onChange={(e) => setNewPost({ ...newPost, video_url: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                    <p className="text-xs text-zinc-500 mt-1">Paste a YouTube video URL to embed in your post</p>
                  </div>

                  <button
                    onClick={createNewsPost}
                    disabled={isSubmitting || !newPost.title || !newPost.content}
                    className="w-full py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Publishing..." : "Publish Post"}
                  </button>
                </div>
              </div>
            )}

            {/* News List */}
            <div className="grid gap-4">
              {news.length === 0 ? (
                <div className="bg-zinc-900 rounded-2xl p-12 text-center border border-zinc-800">
                  <Newspaper className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                  <p className="text-zinc-400">No news posts yet. Create your first post!</p>
                </div>
              ) : (
                news.map((post) => (
                  <div key={post.id} className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                            {post.category}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${post.is_published ? "bg-green-500/20 text-green-400" : "bg-zinc-500/20 text-zinc-400"}`}>
                            {post.is_published ? "Published" : "Draft"}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                        <p className="text-zinc-400 line-clamp-2">{post.content}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleNewsPublished(post.id, post.is_published)}
                          className={`p-2 rounded-lg transition-colors ${post.is_published ? "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600 hover:text-white" : "bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white"}`}
                        >
                          {post.is_published ? <Eye className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteNewsPost(post.id)}
                          className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Users/Community Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Community Overview</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-4">Community Stories</h3>
                <p className="text-4xl font-bold text-purple-400 mb-2">{stats.totalStories}</p>
                <p className="text-zinc-500">Total stories shared by the community</p>
                <Link href="/community" className="inline-flex items-center gap-2 mt-4 text-purple-400 hover:text-purple-300">
                  View Stories <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/community/share-story" className="flex items-center justify-between p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors">
                    <span className="text-white">Add New Story</span>
                    <Plus className="w-5 h-5 text-zinc-400" />
                  </Link>
                  <Link href="/chat" className="flex items-center justify-between p-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors">
                    <span className="text-white">Test AI Chat</span>
                    <MessageSquare className="w-5 h-5 text-zinc-400" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Message Details</h3>
              <button onClick={() => setSelectedMessage(null)} className="text-zinc-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-zinc-500 mb-1">From</p>
                <p className="text-white font-medium">{selectedMessage.name} ({selectedMessage.email})</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Subject</p>
                <p className="text-white font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-1">Message</p>
                <p className="text-zinc-300 whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-500 mb-2">Admin Response</p>
                <textarea
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="Write your response..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, "in_progress", adminResponse)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-yellow-600 text-white font-medium hover:bg-yellow-700 transition-colors disabled:opacity-50"
                >
                  Mark In Progress
                </button>
                <button
                  onClick={() => updateMessageStatus(selectedMessage.id, "resolved", adminResponse)}
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
