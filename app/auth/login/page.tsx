"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Heart, Loader2, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [redirectUrl, setRedirectUrl] = useState("/community/share-story")
  const router = useRouter()

  // Read redirect param immediately on mount - no delay
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get("redirect")
    if (redirect) setRedirectUrl(redirect)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message === "Invalid login credentials") {
          throw new Error("Invalid email or password. Please check your credentials or reset your password below.")
        }
        throw error
      }

      if (data.session) {
        window.location.href = redirectUrl
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-black">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-4">
            <Heart className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-400 mt-1">Sign in to share your story with the community</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-purple-500/20 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Sign In</h2>
            <p className="text-zinc-400 text-sm mt-1">Enter your email and password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-white">
                  Password
                </label>
                <Link href="/auth/reset-password" className="text-xs text-purple-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <Link href="/auth/sign-up" className="text-purple-400 hover:underline font-medium">
                Create one
              </Link>
            </p>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-zinc-500 hover:text-purple-400 transition-colors">
            ← Back to HopeLine AI
          </Link>
        </div>
      </div>
    </div>
  )
}
