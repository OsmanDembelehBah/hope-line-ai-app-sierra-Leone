"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { EMERGENCY_CONTACTS } from "@/lib/constants"
import Link from "next/link"

export default function StayAlivePage() {
  const groundingSteps = [
    {
      title: "Breathe",
      description: "Take 5 deep breaths: inhale for 5 seconds, hold for 4, exhale for 5",
    },
    {
      title: "Ground Yourself",
      description: "Use 5 senses: 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
    },
    {
      title: "Move Your Body",
      description: "Stand up, move around, splash cold water on your face—anything to feel present",
    },
    {
      title: "Reach Out",
      description: "Call someone you trust, text a crisis line, chat here, or call emergency",
    },
  ]

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* EMERGENCY BANNER */}
        <div className="gradient-emergency rounded-2xl p-6 border-2 border-destructive">
          <div className="text-center">
            <p className="text-sm font-semibold text-destructive mb-2">🆘 IMMEDIATE HELP</p>
            <h1 className="text-3xl font-bold text-destructive mb-4">You Deserve to Survive</h1>
            <p className="text-foreground mb-6">
              What you're feeling right now is temporary. These feelings will pass. You are worth saving.
            </p>

            <div className="grid gap-2 mb-6">
              {Object.values(EMERGENCY_CONTACTS).map((contact, idx) => (
                <a
                  key={idx}
                  href={`tel:${contact.number.replace(/\D/g, "")}`}
                  className="block bg-destructive text-destructive-foreground px-4 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity text-center"
                >
                  📞 {contact.name}: {contact.number}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Key Message */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-xl font-bold text-primary mb-3">Listen to Me</h2>
          <div className="space-y-3 text-foreground">
            <p>
              💙 <strong>You are not alone.</strong> Millions have felt what you're feeling right now.
            </p>
            <p>
              💪 <strong>This is temporary.</strong> Crisis feelings come and go. You will feel different.
            </p>
            <p>
              ❤️ <strong>You matter.</strong> Your life has value. People care about you.
            </p>
            <p>
              🌟 <strong>Help is available.</strong> Professional people are ready to support you NOW.
            </p>
          </div>
        </div>

        {/* Immediate Coping */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Use These Right Now</h2>
          <div className="space-y-3">
            {groundingSteps.map((step, idx) => (
              <div key={idx} className="bg-card rounded-lg p-4 border border-border">
                <p className="font-semibold text-primary mb-1">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Talk to Someone */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Talk to Someone Right Now</h2>
          <div className="grid gap-3">
            <Link
              href="/chat"
              className="block text-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90"
            >
              💬 Chat With HopeLine AI
            </Link>
            <a
              href="tel:999"
              className="block text-center bg-destructive text-destructive-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90"
            >
              📞 Call Emergency (999)
            </a>
            <Link
              href="/breathing"
              className="block text-center bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90"
            >
              🌬️ Calm Your Breathing
            </Link>
          </div>
        </div>

        {/* Recovery Stories */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">Why People Survive Crisis</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✅ They reached out for help—just like you can</li>
            <li>✅ They got professional support and things improved</li>
            <li>✅ They found new reasons to live</li>
            <li>✅ They helped others who felt the same way</li>
            <li>✅ They realized their life had more to offer</li>
          </ul>
        </div>

        {/* Important Numbers */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">Save These Numbers</h2>
          <p className="text-sm text-muted-foreground mb-4">Put these in your phone right now:</p>
          <div className="space-y-2 text-sm font-mono bg-card p-3 rounded-lg">
            <p>
              <strong>🚨 Emergency:</strong> 999
            </p>
            <p>
              <strong>💙 Rainbo Initiative:</strong> +232 78 111 111
            </p>
            <p>
              <strong>👧 Childline:</strong> 116
            </p>
            <p>
              <strong>🏥 Hospital:</strong> 999
            </p>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-destructive/10 rounded-2xl p-6 border border-destructive/30 text-center">
          <p className="text-foreground font-semibold mb-2">
            Crisis is temporary. Survival is possible. Your life matters.
          </p>
          <p className="text-sm text-muted-foreground">Please reach out to someone right now. You deserve support.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
