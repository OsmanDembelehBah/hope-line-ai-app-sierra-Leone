"use client"

import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { ExternalLink, Phone, MessageCircle, MapPin, Clock } from "lucide-react"

export default function RainboPage() {
  const rainboNumber = "+232 78 111 111"
  const rainboWhatsApp = "https://wa.me/23278111111"

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Rainbo Initiative Sierra Leone</h1>
          <p className="text-muted-foreground">
            Professional support for rape survivors and victims of violence. Available 24/7 with confidential care.
          </p>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 mb-8 border border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-4">You Are Not Alone</h2>
          <p className="text-foreground mb-6">
            Rainbo Initiative is Sierra Leone's leading organization dedicated to supporting sexual assault and violence
            survivors. They provide medical care, psychological support, and legal advocacy—all free and confidential.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href={`tel:${rainboNumber.replace(/\s/g, "")}`}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now: {rainboNumber}
            </a>
            <a
              href={rainboWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Message
            </a>
          </div>
        </div>

        {/* Services */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">Services Provided</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Medical Support</h3>
              <p className="text-sm text-muted-foreground">
                Free medical examination and treatment for injuries. STI and pregnancy testing. Post-exposure
                prophylaxis (PEP) for HIV prevention.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Psychological Counseling</h3>
              <p className="text-sm text-muted-foreground">
                Trauma-informed counseling from trained professionals. Individual and group therapy sessions. Crisis
                support available 24/7.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Legal Advocacy</h3>
              <p className="text-sm text-muted-foreground">
                Information about your legal rights. Support in reporting to police. Accompaniment through the legal
                process.
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Safe Shelter</h3>
              <p className="text-sm text-muted-foreground">
                Safe accommodation for survivors in immediate danger. Temporary housing while planning next steps.
              </p>
            </div>
          </div>
        </div>

        {/* How to Access */}
        <div className="bg-gradient-calm rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-foreground mb-4">How to Access Help</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="font-semibold text-foreground">Call or Message</p>
                <p className="text-sm text-muted-foreground">
                  Contact Rainbo Initiative at {rainboNumber}. You can speak with a counselor who will listen without
                  judgment.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-semibold text-foreground">Tell Your Story</p>
                <p className="text-sm text-muted-foreground">
                  Share what happened at your own pace. You control what you share. Everything is confidential.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="font-semibold text-foreground">Receive Support</p>
                <p className="text-sm text-muted-foreground">
                  Access medical care, counseling, legal advice, or shelter as needed. All services are provided with
                  compassion.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <p className="font-semibold text-foreground">Ongoing Care</p>
                <p className="text-sm text-muted-foreground">
                  Continue with counseling and support as you heal. Rainbo Initiative walks with you throughout your
                  recovery journey.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Main Office Location
            </h3>
            <p className="text-sm text-muted-foreground mb-2">Freetown, Sierra Leone</p>
            <p className="text-xs text-muted-foreground">(PLACEHOLDER - Replace with verified address)</p>
          </div>
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Availability
            </h3>
            <p className="text-sm text-muted-foreground">24/7 Crisis Support</p>
            <p className="text-xs text-muted-foreground">Call anytime you need help</p>
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-destructive/10 rounded-lg p-6 border border-destructive/30">
          <h3 className="font-bold text-foreground mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-foreground list-disc list-inside">
            <li>All services are confidential and free</li>
            <li>You decide whether to report to police—Rainbo Initiative will support your choice</li>
            <li>No judgment, no shame. What happened is not your fault</li>
            <li>Even if the assault happened a long time ago, you deserve support</li>
            <li>You can access services whether or not you have reported to police</li>
            <li>Friends and family can also call for guidance on how to support you</li>
          </ul>
        </div>

        {/* Related Resources */}
        <div className="mt-8 bg-card rounded-lg p-6 border border-border">
          <h3 className="font-bold text-foreground mb-4">Related Resources</h3>
          <div className="space-y-2">
            <a
              href="/survivor-support"
              className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors text-foreground hover:text-primary"
            >
              <span className="font-semibold">Survivor Support Center</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/chat?topic=survivor"
              className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors text-foreground hover:text-primary"
            >
              <span className="font-semibold">Talk Anonymously with AI</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="/crisis"
              className="flex items-center justify-between p-3 hover:bg-muted rounded-lg transition-colors text-foreground hover:text-primary"
            >
              <span className="font-semibold">Emergency Help</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
