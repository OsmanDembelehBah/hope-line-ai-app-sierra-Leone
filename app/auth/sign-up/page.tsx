"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/login`,
          data: {
            display_name: displayName || email.split("@")[0],
          },
        },
      })

      if (error) throw error

      if (data?.user?.identities?.length === 0) {
        setError("This email is already registered. Please sign in instead.")
        setIsLoading(false)
        return
      }

      setSuccess(true)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred during sign up")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-background to-purple-950/20">
        <div className="w-full max-w-md">
          <Card className="border-green-500/20 bg-card/50 backdrop-blur text-center">
            <CardContent className="pt-8 pb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-600/20 mb-6">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email!</h2>
              <p className="text-muted-foreground mb-4">We sent a confirmation link to:</p>
              <p className="text-purple-400 font-semibold mb-4">{email}</p>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left text-sm">
                    <p className="font-semibold text-yellow-500">Important:</p>
                    <p className="text-muted-foreground">
                      You MUST click the link in your email before you can sign in. Check your spam folder if you don't
                      see it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">I've Verified - Go to Sign In</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-background to-purple-950/20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/20 mb-4">
            <Heart className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Join HopeLine Community</h1>
          <p className="text-muted-foreground mt-1">Create an account to share your story</p>
        </div>

        <Card className="border-purple-500/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">Create Account</CardTitle>
            <CardDescription>Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name (Optional)</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="How you want to be known"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-purple-400 hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-purple-400">
            ← Back to HopeLine AI
          </Link>
        </div>
      </div>
    </div>
  )
}
