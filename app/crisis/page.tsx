"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { EMERGENCY_CONTACTS } from "@/lib/constants"

export default function CrisisPage() {
  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* EMERGENCY BUTTON */}
        <div className="gradient-emergency rounded-2xl p-8 border-2 border-destructive">
          <a
            href="tel:999"
            className="block w-full bg-destructive text-destructive-foreground px-6 py-6 rounded-xl font-bold text-2xl hover:opacity-90 transition-opacity text-center mb-4"
          >
            🆘 EMERGENCY HELP NOW
          </a>
          <p className="text-foreground text-center text-sm">
            If you're in immediate danger, call emergency immediately
          </p>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Emergency Contacts</h2>
          <div className="space-y-3">
            {Object.values(EMERGENCY_CONTACTS).map((contact, idx) => (
              <div key={idx} className="bg-muted rounded-lg p-4">
                <p className="font-semibold text-foreground mb-1">{contact.name}</p>
                <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                <a
                  href={`tel:${contact.number.replace(/\D/g, "")}`}
                  className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90"
                >
                  📞 {contact.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tools */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href="/breathing"
            className="block bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors"
          >
            <div className="text-2xl mb-2">🌬️</div>
            <p className="font-semibold text-foreground text-sm">Breathing</p>
          </a>
          <a
            href="/chat"
            className="block bg-card border border-border rounded-lg p-4 text-center hover:border-primary transition-colors"
          >
            <div className="text-2xl mb-2">💬</div>
            <p className="font-semibold text-foreground text-sm">Talk Now</p>
          </a>
        </div>

        {/* Important Notes */}
        <div className="bg-card rounded-lg p-4 border border-border text-sm text-muted-foreground space-y-2">
          <p>
            <strong>PLACEHOLDER NUMBERS:</strong> The emergency numbers above are placeholders for development. Before
            deployment, verify and update with real Sierra Leone emergency services.
          </p>
          <p>
            <strong>Your Safety:</strong> If you're in immediate danger, contact local emergency services. These
            resources can help.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
