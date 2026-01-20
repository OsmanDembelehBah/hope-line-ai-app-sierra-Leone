"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Newspaper, Calendar, Tag, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"

interface NewsPost {
  id: string
  title: string
  content: string
  category: string
  published: boolean
  created_at: string
  author_name: string
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    async function loadNews() {
      const supabase = createClient()
      const { data } = await supabase
        .from("news_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (data) setNews(data)
      setLoading(false)
    }
    loadNews()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "update": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "feature": return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "announcement": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "event": return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default: return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
    }
  }

  const categories = ["all", "update", "feature", "announcement", "event"]
  const filteredNews = selectedCategory && selectedCategory !== "all"
    ? news.filter(post => post.category === selectedCategory)
    : news

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      <div className="max-w-5xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-6">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">News & Updates</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Stay informed about the latest features, updates, and announcements from HopeLine AI.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === "all" ? null : cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors capitalize whitespace-nowrap ${
                (selectedCategory === cat) || (cat === "all" && !selectedCategory)
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-zinc-500">Loading news...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 rounded-3xl border border-zinc-800">
            <Sparkles className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No News Yet</h3>
            <p className="text-zinc-500">Check back soon for updates and announcements!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredNews.map((post, index) => (
              <article
                key={post.id}
                className={`bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-zinc-700 transition-all ${
                  index === 0 ? "lg:flex lg:gap-8" : ""
                }`}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                      <Tag className="w-3 h-3 inline mr-1" />
                      {post.category}
                    </span>
                    <span className="text-sm text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  
                  <h2 className={`font-bold text-white mb-4 ${index === 0 ? "text-3xl" : "text-2xl"}`}>
                    {post.title}
                  </h2>
                  
                  <p className={`text-zinc-400 leading-relaxed whitespace-pre-wrap ${index === 0 ? "text-lg" : ""}`}>
                    {post.content}
                  </p>
                  
                  {post.author_name && (
                    <p className="mt-4 text-sm text-zinc-500">
                      Posted by <span className="text-purple-400">{post.author_name}</span>
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
