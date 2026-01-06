"use client"

import type React from "react"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"

interface FormData {
  name?: string
  age?: string
  city: string
  phone: string
  assistanceType: string
  message: string
  consent: boolean
}

export default function RehabContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    city: "",
    phone: "",
    assistanceType: "general",
    message: "",
    consent: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const validateForm = (): boolean => {
    if (!formData.city.trim()) {
      setErrorMsg("City is required")
      return false
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Phone number is required")
      return false
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please tell us what kind of support you need")
      return false
    }
    if (!formData.consent) {
      setErrorMsg("Please consent to share your information")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg("")

    if (!validateForm()) {
      setStatus("error")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.ok) {
        setStatus("success")
        setFormData({
          name: "",
          age: "",
          city: "",
          phone: "",
          assistanceType: "general",
          message: "",
          consent: false,
        })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
        setErrorMsg(data.error || "Failed to submit form")
      }
    } catch (error) {
      setStatus("error")
      setErrorMsg("Connection error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">Request Rehabilitation Support</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Let us help you connect with professional recovery services.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Your Name (Optional - stay anonymous if you prefer)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Leave blank to stay anonymous"
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Age (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Your Age (Optional)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g., 25"
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* City (Required) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              City or Town <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g., Freetown, Makeni"
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone (Required) */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+232 76 XXX XXX"
              required
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Assistance Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Type of Assistance Needed</label>
            <select
              name="assistanceType"
              value={formData.assistanceType}
              onChange={handleChange}
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="general">General Support</option>
              <option value="kush-addiction">Kush Addiction Recovery</option>
              <option value="trauma">Trauma & Mental Health</option>
              <option value="crisis">Crisis Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Tell Us What You Need <span className="text-destructive">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe what kind of support you're looking for..."
              required
              rows={4}
              className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="w-4 h-4 rounded border-border mt-1"
            />
            <span className="text-sm text-muted-foreground">
              I consent to share this information with rehabilitation centers and support services. My information will
              be kept confidential and used only to connect me with appropriate support.
            </span>
          </label>

          {/* Status Messages */}
          {status === "error" && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
              <p className="text-sm text-destructive font-semibold">Error: {errorMsg}</p>
            </div>
          )}

          {status === "success" && (
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
              <p className="text-sm text-primary font-semibold">
                ✓ Your request has been submitted! A rehabilitation center will contact you soon.
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isLoading ? "Submitting..." : "Send Support Request"}
          </button>
        </form>

        {/* Emergency Note */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
          <p className="text-sm text-destructive font-semibold mb-2">🚨 In Immediate Crisis?</p>
          <p className="text-sm text-foreground mb-3">If you need help right now, please call emergency services:</p>
          <div className="flex gap-2">
            <a
              href="tel:999"
              className="bg-destructive text-destructive-foreground px-3 py-1 rounded text-xs font-semibold"
            >
              Emergency (999)
            </a>
            <a
              href="tel:+232781111111"
              className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-semibold"
            >
              Rainbo Initiative
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
