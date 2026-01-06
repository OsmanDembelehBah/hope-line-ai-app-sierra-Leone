"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import Link from "next/link"

export default function ShareStoryPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [fullStory, setFullStory] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [category, setCategory] = useState<"addiction" | "survivor" | "mental-health" | "recovery">("addiction")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const categories = [
    { id: "addiction", label: "Addiction Recovery", icon: "🌱" },
    { id: "survivor", label: "Survivor Stories", icon: "💪" },
    { id: "mental-health", label: "Mental Health", icon: "💙" },
    { id: "recovery", label: "Recovery Milestones", icon: "🎯" },
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const supabase = createClient()

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()
      if (userError || !user) {
        throw new Error("You must be logged in to share a story")
      }

      let imageUrl = null

      if (image) {
        const fileExt = image.name.split(".").pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("story-images")
          .upload(fileName, image)

        if (uploadError) {
          console.error("Image upload error:", uploadError)
        } else {
          const {
            data: { publicUrl },
          } = supabase.storage.from("story-images").getPublicUrl(uploadData.path)
          imageUrl = publicUrl
        }
      }

      const { error: insertError } = await supabase.from("stories").insert({
        user_id: user.id,
        title,
        excerpt,
        full_story: fullStory,
        author_name: authorName,
        category,
        image_url: imageUrl,
      })

      if (insertError) throw insertError

      router.push("/community")
    } catch (err: any) {
      setError(err.message || "Failed to share story")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/community" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Share Your Story</h1>
          <p className="text-muted-foreground">
            Your journey can inspire others. Share your experience anonymously to help those who need hope.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <Label htmlFor="category">Story Category</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as any)}
                  className={`p-3 rounded-lg text-sm font-semibold transition-all ${
                    category === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Story Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Journey to Recovery"
              required
              className="mt-2"
            />
          </div>

          {/* Author Name */}
          <div>
            <Label htmlFor="authorName">Your Name (or Anonymous)</Label>
            <Input
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="John D., Freetown"
              required
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">You can use a pseudonym or "Anonymous" if you prefer</p>
          </div>

          {/* Excerpt */}
          <div>
            <Label htmlFor="excerpt">Short Summary (2-3 sentences)</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief overview of your story..."
              required
              rows={3}
              className="mt-2"
            />
          </div>

          {/* Full Story */}
          <div>
            <Label htmlFor="fullStory">Your Full Story</Label>
            <Textarea
              id="fullStory"
              value={fullStory}
              onChange={(e) => setFullStory(e.target.value)}
              placeholder="Share your complete journey, challenges, and how you found hope..."
              required
              rows={10}
              className="mt-2"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Add an Image (Optional)</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImage(null)
                      setImagePreview(null)
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Click to upload image</span>
                  <input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sharing Story...
              </>
            ) : (
              "Share Your Story"
            )}
          </Button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
