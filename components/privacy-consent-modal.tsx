"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"

export function PrivacyConsentModal({ onAccept }: { onAccept: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already accepted
    const hasConsented = localStorage.getItem("hopeline-consent")
    if (!hasConsented) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("hopeline-consent", "true")
    setIsOpen(false)
    onAccept()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-start gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-foreground">Privacy & Consent</h2>
          </div>
        </div>

        <div className="space-y-4 mb-6 text-sm text-foreground max-h-60 overflow-y-auto">
          <div>
            <h3 className="font-semibold text-primary mb-2">Your Privacy Matters</h3>
            <p className="text-muted-foreground">
              HopeLine AI is designed for anonymity. We do not store personal information by default.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-2">What We Do</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Provide anonymous emotional support via chat</li>
              <li>Store progress locally on your device only (never on servers)</li>
              <li>Connect you with professional resources</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-2">What We Don't Do</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>We do not store chat messages by default</li>
              <li>We do not collect or sell your data</li>
              <li>We do not replace professional medical care</li>
              <li>If the issues you are facing are increasing please Visit Medical personal<li/>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-primary mb-2">Emergency Situations</h3>
            <p className="text-muted-foreground">
              If you indicate immediate danger, we will encourage you to contact emergency services and local crisis
              resources.
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 mb-6 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border"
            required
            onChange={(e) => {
              // This is for form validation
            }}
          />
          <span className="text-sm text-muted-foreground">I understand and accept the privacy policy</span>
        </label>

        <button
          onClick={handleAccept}
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          I Understand - Let's Begin
        </button>
      </div>
    </div>
  )
}
