"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageCircle, Wind, AlertCircle, Heart, Building2, ChevronDown, Shield, Settings, Home } from "lucide-react"

interface NavSection {
  title: string
  icon: any
  items: { label: string; href: string; description: string }[]
}

export default function DashboardPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const navSections: NavSection[] = [
    {
      title: "Support Chat",
      icon: MessageCircle,
      items: [
        { label: "Anonymous Chat", href: "/chat", description: "Talk to AI counselor 24/7" },
        { label: "Voice Hotline", href: "/voice-call", description: "Speak your feelings out loud" },
      ],
    },
    {
      title: "Emergency Help",
      icon: AlertCircle,
      items: [
        { label: "Crisis Support", href: "/crisis", description: "Immediate emergency contacts" },
        { label: "Stay Alive", href: "/stay-alive", description: "Grounding techniques for crises" },
        { label: "Survivor Support", href: "/survivor-support", description: "For rape and GBV survivors" },
      ],
    },
    {
      title: "Rehabilitation & Recovery",
      icon: Heart,
      items: [
        { label: "Recovery Companion", href: "/recovery", description: "Track your Kush recovery journey" },
        { label: "Rehab Centers", href: "/rehab-centers", description: "Find rehabilitation centers" },
        { label: "Self-Improvement", href: "/challenges", description: "7-day challenges and goals" },
      ],
    },
    {
      title: "Government & Support Agencies",
      icon: Building2,
      items: [
        { label: "Official Agencies", href: "/agencies", description: "Ministry contacts and support" },
        { label: "Rainbo Initiative", href: "/rainbo", description: "Sexual assault support center" },
        { label: "Rehab Contact", href: "/rehab-contact", description: "Request rehabilitation support" },
      ],
    },
    {
      title: "Mental Health Resources",
      icon: Wind,
      items: [
        { label: "Breathing Exercises", href: "/breathing", description: "Calm your mind and body" },
        { label: "Relaxation Center", href: "/relax", description: "Meditation and grounding" },
        { label: "Music Therapy", href: "/music", description: "Healing through music" },
        { label: "Mood Check-In", href: "/mood", description: "Track your emotional state" },
        { label: "Journal", href: "/journal", description: "Private journaling with analytics" },
      ],
    },
    {
      title: "Settings & Privacy",
      icon: Settings,
      items: [
        { label: "Settings", href: "/settings", description: "Customize your experience" },
        { label: "Community Stories", href: "/community", description: "Read survivor testimonials" },
        { label: "Our Team", href: "/team", description: "Meet the HopeLine AI team" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-calm border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Home className="w-6 h-6" />
              HopeLine AI Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Your private, secure space for support and recovery</p>
          </div>
          <Link href="/" className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Quick Emergency Banner */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold text-destructive text-lg mb-2">In Immediate Danger?</h3>
              <p className="text-foreground text-sm mb-4">
                If you're facing an immediate threat, contact emergency services now.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="tel:999"
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 text-sm"
                >
                  📞 Police (999)
                </a>
                <a
                  href="tel:+232781111111"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 text-sm"
                >
                  💙 Rainbo Initiative
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections with Accordion */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Navigate Features <span className="text-muted-foreground text-sm font-normal">(Click to expand)</span>
          </h2>

          {navSections.map((section) => {
            const Icon = section.icon
            const isExpanded = expandedSections.includes(section.title)

            return (
              <div
                key={section.title}
                className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-primary"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{section.title}</h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="border-t border-border bg-muted/20 p-4 animate-slide-down">
                    <div className="grid md:grid-cols-2 gap-4">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group flex flex-col gap-2 p-4 rounded-lg bg-card hover:bg-primary/5 border border-border hover:border-primary transition-all"
                        >
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.label}
                          </h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Privacy Notice */}
        <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Your Privacy Matters</p>
              <p>
                All features are designed for anonymous use. We don't track personal information. This dashboard
                provides organized access to support tools while maintaining your privacy.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">HopeLine AI — Sierra Leone</p>
          <p>Compassionate support for crisis, recovery, and healing</p>
          <p className="mt-4 text-xs">All Rights Reserved © Limkokwing University Sierra Leone</p>
        </div>
      </footer>
    </div>
  )
}
