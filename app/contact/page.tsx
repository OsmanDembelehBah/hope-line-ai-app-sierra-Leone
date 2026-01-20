"use client"

import React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Send, CheckCircle, Mail, User, MessageSquare, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)
    setError("")

    const supabase = createClient()
    const { error: insertError } = await supabase.from("support_messages").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      status: "new",
    })

    if (insertError) {
      setError("Failed to send message. Please try again.")
      setIsSubmitting(false)
      return
    }

    setSuccess(true)
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black">
        <NavBar />
        <div className="max-w-2xl mx-auto px-6 py-20">
          <div className="bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-800">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Message Sent!</h1>
            <p className="text-zinc-400 mb-8">
              Thank you for reaching out. Our team will review your message and get back to you as soon as possible.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
              >
                Send Another
              </button>
              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
              <p className="text-xl text-zinc-400 leading-relaxed">
                Have questions, suggestions, or need support? We're here to help. Send us a message and our team will respond as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Support Requests</h3>
                  <p className="text-zinc-400">Get help with using HopeLine AI or report any issues you encounter.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Partnership Inquiries</h3>
                  <p className="text-zinc-400">Interested in partnering with HopeLine? Let's talk about how we can work together.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">General Feedback</h3>
                  <p className="text-zinc-400">Share your thoughts on how we can improve HopeLine for everyone.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-sm text-zinc-400 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
