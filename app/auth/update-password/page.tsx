"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has a valid session from the reset link
    const checkSession = async () => {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) {
        setError("Invalid or expired reset link. Please request a new one.")
      }
    }
    checkSession()
  }, [])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push("/auth/login")
      }, 3000)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-b from-background to-purple-950/20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-600/20 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Password Updated!</h1>
            <p className="text-muted-foreground mt-2">
              Your password has been successfully updated. Redirecting to login...
            </p>
          </div>

          <div className="text-center">
            <Link href="/auth/login">
              <Button className="bg-purple-600 hover:bg-purple-700">Go to Sign In</Button>
            </Link>
          </div>
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
          <h1 className="text-2xl font-bold text-foreground">Set New Password</h1>
          <p className="text-muted-foreground mt-1">Enter your new password below</p>
        </div>

        <Card className="border-purple-500/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">New Password</CardTitle>
            <CardDescription>Choose a strong password with at least 6 characters</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50"
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-background/50"
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
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
