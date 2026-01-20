"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, Loader2, X, CheckCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function ShareStoryPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [fullStory, setFullStory] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [category, setCategory] = useState<"addiction" | "survivor" | "mental-health" | "recovery">("addiction")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(undefined)
  const [authChecked, setAuthChecked] = useState(false)
  const router = useRouter()

  const categories = [
    { id: "addiction", label: "Addiction Recovery", icon: "🌱" },
    { id: "survivor", label: "Survivor Stories", icon: "💪" },
    { id: "mental-health", label: "Mental Health", icon: "💙" },
    { id: "recovery", label: "Recovery Milestones", icon: "🎯" },
  ]

  useEffect(() => {
    const supabase = createClient()
    
    const timeout = setTimeout(() => {
      if (!authChecked) {
        setAuthChecked(true)
        if (user === undefined) setUser(null)
      }
    }, 2000)
    
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        clearTimeout(timeout)
        setAuthChecked(true)
        if (session?.user) {
          setUser(session.user)
          if (session.user.user_metadata?.display_name) {
            setAuthorName(session.user.user_metadata.display_name)
          }
        } else {
          setUser(null)
        }
      })
      .catch(() => {
        clearTimeout(timeout)
        setAuthChecked(true)
        setUser(null)
      })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        setAuthChecked(true)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
      }
    })

    return () => {
      clearTimeout(timeout)
      subscription.unsubscribe()
    }
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image must be less than 2MB")
        return
      }
      setError(null)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError("You must be logged in to share a story.")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient()

      const { error: insertError } = await supabase.from("stories").insert({
        user_id: user.id,
        title: title.trim(),
        excerpt: excerpt.trim(),
        full_story: fullStory.trim(),
        author_name: authorName.trim() || "Anonymous",
        category,
        image_url: imagePreview,
      })

      if (insertError) {
        throw new Error(insertError.message)
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/community")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to share story. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading only while checking auth (max 2 seconds)
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show login prompt only after auth check confirms no user
  if (authChecked && !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 rounded-2xl p-8 border border-purple-500/20 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Share Your Story</h1>
          <p className="text-zinc-400 mb-6">Please sign in to share your story with the community.</p>
          <div className="flex flex-col gap-3">
            <Link href="/auth/login?redirect=/community/share-story">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up?redirect=/community/share-story">
              <Button
                variant="outline"
                className="w-full border-purple-500/30 bg-transparent text-white hover:bg-purple-600/10"
              >
                Create Account
              </Button>
            </Link>
          </div>
          <Link href="/community" className="inline-block mt-6 text-sm text-zinc-500 hover:text-purple-400">
            ← Back to Stories
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 rounded-2xl p-8 border border-green-500/20 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Story Shared!</h1>
          <p className="text-zinc-400 mb-4">Thank you for sharing. Redirecting to community...</p>
          <Link href="/community">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">View Stories</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link href="/community" className="inline-flex items-center gap-2 text-purple-400 hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Share Your Story</h1>
          <p className="text-sm text-zinc-400">Logged in as {user?.email}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-zinc-900 p-6 rounded-xl border border-purple-500/20">
          <div>
            <Label className="font-semibold text-white">Category *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as any)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    category === cat.id
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 border border-zinc-700 text-zinc-300 hover:border-purple-500/50"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="title" className="font-semibold text-white">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Journey to Recovery"
              required
              className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <Label htmlFor="authorName" className="font-semibold text-white">Your Name</Label>
            <Input
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Anonymous"
              className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <Label htmlFor="excerpt" className="font-semibold text-white">Short Summary *</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief overview..."
              required
              rows={2}
              className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <Label htmlFor="fullStory" className="font-semibold text-white">Full Story *</Label>
            <Textarea
              id="fullStory"
              value={fullStory}
              onChange={(e) => setFullStory(e.target.value)}
              placeholder="Share your complete journey..."
              required
              rows={8}
              className="mt-1 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>

          <div>
            <Label className="font-semibold text-white">Image (Optional)</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 text-white p-1.5 rounded-full"
                    onClick={() => setImagePreview(null)}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-purple-500/30 rounded-lg cursor-pointer hover:bg-purple-600/5">
                  <Upload className="w-6 h-6 text-purple-400 mb-1" />
                  <span className="text-sm text-zinc-400">Upload image (max 2MB)</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sharing...
              </>
            ) : (
              "Share Story"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
