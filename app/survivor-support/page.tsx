"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { AlertCircle } from "lucide-react"

export default function SurvivorSupportPage() {
  const [showAIModal, setShowAIModal] = useState(false)

  const immediateSteps = [
    {
      step: 1,
      title: "Ensure Your Safety",
      description: "If you're in immediate danger, call police (999) or go to the nearest safe place.",
    },
    {
      step: 2,
      title: "Tell Someone You Trust",
      description: "Share what happened with someone safe—a friend, family member, counselor, or crisis line.",
    },
    {
      step: 3,
      title: "Seek Medical Care",
      description: "Visit a hospital for medical attention and evidence preservation if you choose to report.",
    },
    {
      step: 4,
      title: "Report if You're Ready",
      description: "You can report to police (999) or call Rainbo Initiative (+232 78 111 111) for support.",
    },
    {
      step: 5,
      title: "Get Professional Support",
      description: "Trauma-informed counseling and support groups help many survivors heal.",
    },
  ]

  const yourRights = [
    "The right to safety and respect",
    "The right to be believed",
    "The right to support and counseling",
    "The right to report or not report",
    "The right to medical care",
    "The right to move forward at your own pace",
    "The right to say no to anything",
  ]

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">Survivor Support Center</h1>
          <p className="text-muted-foreground text-sm mt-1">
            For survivors of rape and gender-based violence. You are not alone.
          </p>
        </div>

        {/* Safety Banner */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-bold text-destructive mb-2">If You're in Immediate Danger</h2>
              <p className="text-sm text-foreground mb-3">
                Your safety is the priority. Please reach out for immediate help:
              </p>
              <div className="space-y-2">
                <a
                  href="tel:999"
                  className="block bg-destructive text-destructive-foreground px-3 py-2 rounded font-semibold text-sm hover:opacity-90"
                >
                  📞 Call Police: 999
                </a>
                <a
                  href="tel:+232781111111"
                  className="block bg-primary text-primary-foreground px-3 py-2 rounded font-semibold text-sm hover:opacity-90"
                >
                  💙 Rainbo Initiative: +232 78 111 111
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Message of Support */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-primary mb-3">What Happened Was Not Your Fault</h2>
          <div className="space-y-3 text-foreground text-sm">
            <p>💙 What happened to you was a crime committed against you. It was not your fault.</p>
            <p>💪 Your feelings are valid—anger, shame, fear, confusion are all normal responses to trauma.</p>
            <p>🌟 You are a survivor. You are brave. You deserve healing and support.</p>
            <p>❤️ Recovery is possible. Many survivors have found healing and moved forward.</p>
          </div>
        </div>

        {/* Immediate Steps */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Steps You Can Take</h2>
          <div className="space-y-3">
            {immediateSteps.map((item) => (
              <div key={item.step} className="bg-card rounded-lg p-4 border border-border">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-primary mb-4">Your Rights as a Survivor</h2>
          <ul className="space-y-2">
            {yourRights.map((right, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-primary font-bold mt-1">✓</span>
                <span>{right}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Talk to Someone */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-4">Talk to Someone</h2>
          <div className="grid gap-3">
            <button
              onClick={() => setShowAIModal(true)}
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90 text-center"
            >
              💬 Talk as a Survivor (AI)
            </button>
            <a
              href="tel:+232781111111"
              className="block text-center bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90"
            >
              📞 Call Rainbo Initiative
            </a>
            <a
              href="tel:999"
              className="block text-center bg-destructive text-destructive-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90"
            >
              📞 Call Police
            </a>
          </div>
        </div>

        {/* Healing Resources */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-4">Healing & Support Resources</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Professional Counseling:</strong> Trauma-informed therapists can help you process what happened
            </li>
            <li>
              <strong>Support Groups:</strong> Connecting with other survivors provides validation and hope
            </li>
            <li>
              <strong>Medical Care:</strong> Both physical and mental health support
            </li>
            <li>
              <strong>Legal Support:</strong> If you choose to report, advocates can support you through the process
            </li>
            <li>
              <strong>Community Resources:</strong> Local organizations dedicated to survivor support
            </li>
          </ul>
        </div>

        {/* Reporting Information */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-semibold text-foreground mb-2">About Reporting</h3>
          <p className="text-sm text-muted-foreground mb-3">Reporting is your choice. You can:</p>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Report immediately or whenever you're ready</li>
            <li>Talk to Rainbo Initiative for support before deciding</li>
            <li>Choose not to report and still get counseling</li>
            <li>Report to police anonymously or confidentially</li>
          </ul>
        </div>

        {/* Self-Care */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">Taking Care of Yourself</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Rest and sleep are healing</li>
            <li>✓ Eat well and drink water</li>
            <li>✓ Move your body gently (walk, stretch, dance)</li>
            <li>✓ Spend time with people who care about you</li>
            <li>✓ Do things that bring you joy</li>
            <li>✓ Practice grounding techniques (breathing, 5-4-3-2-1)</li>
            <li>✓ Journal or express yourself creatively</li>
          </ul>
        </div>

        {/* Affirmation */}
        <div className="bg-destructive/10 rounded-lg p-4 text-center border border-destructive/30">
          <p className="text-foreground font-semibold text-sm">
            "Your healing journey is valid. You deserve support, respect, and hope. You will survive this."
          </p>
        </div>
      </main>

      {/* Survivor Support AI Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-foreground mb-3">Talk As a Rape Survivor</h3>
            <p className="text-sm text-muted-foreground mb-4">
              HopeLine AI is trained to listen as a survivor would. I understand your pain and won't judge you.
            </p>
            <div className="space-y-2">
              <Link
                href="/chat"
                onClick={() => setShowAIModal(false)}
                className="block w-full text-center bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                Start Conversation
              </Link>
              <button
                onClick={() => setShowAIModal(false)}
                className="w-full bg-muted text-muted-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
