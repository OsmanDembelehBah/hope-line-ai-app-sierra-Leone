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

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const redirectUrl =
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/update-password`

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      })

      if (error) throw error

      setSuccess(true)
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
            <h1 className="text-2xl font-bold text-foreground">Check Your Email</h1>
            <p className="text-muted-foreground mt-2">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
          </div>

          <Card className="border-purple-500/20 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="space-y-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to reset your password. The link will expire in 24 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSuccess(false)
                    setEmail("")
                  }}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="text-sm text-purple-400 hover:underline">
              ← Back to Sign In
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
          <h1 className="text-2xl font-bold text-foreground">Reset Password</h1>
          <p className="text-muted-foreground mt-1">Enter your email to receive a reset link</p>
        </div>

        <Card className="border-purple-500/20 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">Forgot Password?</CardTitle>
            <CardDescription>No worries, we'll send you reset instructions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
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
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link href="/auth/login" className="text-purple-400 hover:underline font-medium">
                  Sign In
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
