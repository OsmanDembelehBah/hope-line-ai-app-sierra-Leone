"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Heart, Plus } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface Story {
  id: string
  category: "addiction" | "survivor" | "mental-health" | "recovery"
  title: string
  excerpt: string
  full_story: string
  author_name: string
  image_url: string | null
  created_at: string
}

export default function CommunityPage() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)

  const categories = [
    { id: "addiction", label: "Addiction Recovery", icon: "🌱" },
    { id: "survivor", label: "Survivor Stories", icon: "💪" },
    { id: "mental-health", label: "Mental Health", icon: "💙" },
    { id: "recovery", label: "Recovery Milestones", icon: "🎯" },
  ]

  useEffect(() => {
    async function fetchStories() {
      const supabase = createClient()
      const { data, error } = await supabase.from("stories").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching stories:", error)
      } else {
        setStories(data || [])
      }
      setLoading(false)
    }

    fetchStories()
  }, [])

  const filteredStories = selectedCategory ? stories.filter((s) => s.category === selectedCategory) : stories

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Community Stories</h1>
            <p className="text-muted-foreground">
              Read inspiring stories from people who found hope and healing. You're not alone in this journey.
            </p>
          </div>
          <Link
            href="/community/share-story"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Share Story
          </Link>
        </div>

        {selectedStory ? (
          // Story Detail View
          <div className="bg-card rounded-2xl p-8 border border-border">
            <button onClick={() => setSelectedStory(null)} className="text-primary font-semibold mb-6 hover:underline">
              ← Back to Stories
            </button>

            {selectedStory.image_url && (
              <img
                src={selectedStory.image_url || "/placeholder.svg"}
                alt={selectedStory.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <div className="mb-6">
              <span className="text-xs font-bold text-primary bg-primary/20 px-3 py-1 rounded-full">
                {categories.find((c) => c.id === selectedStory.category)?.label}
              </span>
              <h2 className="text-2xl font-bold text-foreground mt-3 mb-2">{selectedStory.title}</h2>
              <p className="text-muted-foreground text-sm">By {selectedStory.author_name}</p>
            </div>

            <div className="prose prose-sm max-w-none text-foreground">
              {selectedStory.full_story.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-foreground font-semibold mb-2">Inspired by this story?</p>
              <p className="text-sm text-muted-foreground">
                You have the same strength. Start your healing journey today with HopeLine AI.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-muted-foreground mb-3">Filter by Category</p>
              <div className="grid md:grid-cols-4 gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  All Stories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading stories...</p>
              </div>
            ) : filteredStories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No stories yet. Be the first to share!</p>
                <Link
                  href="/community/share-story"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  <Plus className="w-4 h-4" />
                  Share Your Story
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className="bg-card rounded-xl p-6 border border-border hover:border-primary transition-all text-left group"
                  >
                    {story.image_url && (
                      <img
                        src={story.image_url || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded">
                        {categories.find((c) => c.id === story.category)?.label}
                      </span>
                      <Heart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{story.excerpt}</p>

                    <p className="text-xs text-muted-foreground">— {story.author_name}</p>
                  </button>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 bg-gradient-calm rounded-2xl p-8 border border-primary/30 text-center">
              <h2 className="text-xl font-bold text-foreground mb-3">Your Story Matters Too</h2>
              <p className="text-muted-foreground mb-6">
                Would you like to share your recovery story? Inspire others on their journey.
              </p>
              <Link
                href="/community/share-story"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Share Your Story
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
