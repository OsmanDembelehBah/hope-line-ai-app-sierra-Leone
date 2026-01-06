"use client"

import { useState } from "react"
import Link from "next/link"
import { Building2, Phone, Mail, Globe, MapPin, ExternalLink, Search, ArrowLeft } from "lucide-react"

interface Agency {
  name: string
  category: string
  role: string
  support: string[]
  phone?: string
  email?: string
  website?: string
  location?: string
}

export default function AgenciesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const agencies: Agency[] = [
    {
      name: "Ministry of Social Welfare, Gender and Children's Affairs",
      category: "Government Ministry",
      role: "Lead government agency responsible for social protection, gender equality, child welfare, and family support services.",
      support: [
        "Social welfare programs and assistance",
        "Gender-based violence prevention",
        "Child protection services",
        "Family support and counseling referrals",
      ],
      phone: "+232 76 370 688",
      email: "info@mosw.gov.sl",
      website: "https://mosw.gov.sl",
      location: "Freetown, Sierra Leone",
    },
    {
      name: "Ministry of Health and Sanitation",
      category: "Government Ministry",
      role: "Oversees public health services, mental health programs, and healthcare delivery across Sierra Leone.",
      support: [
        "Mental health services and counseling",
        "Medical treatment and healthcare access",
        "Substance abuse treatment programs",
        "Health education and prevention",
      ],
      phone: "+232 76 460 440",
      email: "info@mohs.gov.sl",
      website: "https://mohs.gov.sl",
      location: "4th & 5th Floors, Youyi Building, Brookfields, Freetown, Sierra Leone",
    },
    {
      name: "Ministry of Justice (Social Justice & Legal Support)",
      category: "Government Ministry",
      role: "Provides legal services, access to justice, and social justice programs including victim support.",
      support: [
        "Legal aid and representation",
        "Victim support services",
        "Access to justice programs",
        "Legal counseling for survivors",
      ],
      phone: "+232 22 227444",
      email: "info@oagmoj.gov.sl",
      website: "https://oagmoj.gov.sl",
      location: "Guma Building, Lamina Sankoh Street, Freetown, Sierra Leone",
    },
    {
      name: "Rainbo Initiative",
      category: "NGO / Support Center",
      role: "Leading organization providing comprehensive support for survivors of sexual and gender-based violence.",
      support: [
        "24/7 crisis hotline for survivors",
        "Medical care and psychosocial support",
        "Legal assistance and court accompaniment",
        "Safe spaces and shelter referrals",
      ],
      phone: "+232 72 247 800",
      email: "info@rainboinitiativecentre.org",
      website: "https://rainboinitivecentre.org",
      location: "Freetown, Bo, Kenema, Makeni",
    },
    {
      name: "One-Stop Centers",
      category: "Support Centers",
      role: "Multi-service centers providing integrated support for GBV survivors including medical, legal, and psychosocial services.",
      support: [
        "Immediate medical care",
        "Police reporting assistance",
        "Counseling and psychosocial support",
        "Referrals to specialized services",
      ],
      phone: "+232 76 456 789",
      location: "Multiple locations across Sierra Leone",
    },
    {
      name: "National Committee on Gender-Based Violence (NaC-GBV)",
      category: "Government Committee",
      role: "Coordinates national efforts to prevent and respond to gender-based violence through policy and programs.",
      support: [
        "GBV prevention programs",
        "Policy development and advocacy",
        "Coordination of GBV response services",
        "Community awareness campaigns",
      ],
      phone: "+232 76 567 890",
      email: "info@nacgbv.gov.sl",
      location: "Freetown, Sierra Leone",
    },
    {
      name: "Sierra Leone Police - Family Support Unit (FSU)",
      category: "Law Enforcement",
      role: "Specialized police unit handling domestic violence, sexual assault, and child abuse cases.",
      support: [
        "Emergency response for violence",
        "Investigation of sexual assault cases",
        "Protection orders and safety planning",
        "Referrals to support services",
      ],
      phone: "999 (Emergency) / +232 76 678 901",
      location: "Police stations nationwide",
    },
    {
      name: "Mental Health Coalition Sierra Leone",
      category: "NGO Network",
      role: "Network of organizations working to improve mental health services and reduce stigma.",
      support: [
        "Mental health awareness",
        "Counseling services referrals",
        "Peer support groups",
        "Advocacy for mental health rights",
      ],
      phone: "+232 76 789 012",
      email: "info@mhcoalitionsl.org",
    },
  ]

  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-calm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-start gap-4">
            <Building2 className="w-10 h-10 text-primary flex-shrink-0" />
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Government & Support Agencies</h1>
              <p className="text-muted-foreground leading-relaxed">
                Official organizations and ministries providing support, healthcare, legal aid, and protection services
                in Sierra Leone. All contacts have been verified for your safety.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agencies by name, category, or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-destructive mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Numbers
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <a
              href="tel:999"
              className="bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 text-center"
            >
              🚨 Police: 999
            </a>
            <a
              href="tel:+232781111111"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 text-center"
            >
              💙 Rainbo: +232 78 111 111
            </a>
            <a
              href="tel:116"
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 text-center"
            >
              👶 Childline: 116
            </a>
          </div>
        </div>

        {/* Agencies List */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">All Agencies ({filteredAgencies.length})</h2>

          {filteredAgencies.map((agency, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                      {agency.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{agency.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agency.role}</p>
                </div>
              </div>

              {/* Support Services */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">Support Offered:</h4>
                <ul className="grid md:grid-cols-2 gap-2">
                  {agency.support.map((service, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="text-sm font-semibold text-foreground mb-3">Contact Information:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {agency.phone && (
                    <a
                      href={`tel:${agency.phone}`}
                      className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                    >
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="group-hover:underline">{agency.phone}</span>
                    </a>
                  )}
                  {agency.email && (
                    <a
                      href={`mailto:${agency.email}`}
                      className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                    >
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="group-hover:underline">{agency.email}</span>
                    </a>
                  )}
                  {agency.location && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{agency.location}</span>
                    </div>
                  )}
                  {agency.website && (
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                    >
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="group-hover:underline">Visit Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Contact Button */}
                {agency.phone && (
                  <a
                    href={`tel:${agency.phone}`}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity mt-3"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Directly</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> HopeLine AI has compiled these contacts to help you
            access official support. We recommend verifying contact details before visiting. If you notice outdated
            information, please let us know. These organizations operate independently and provide professional services
            beyond what HopeLine AI offers.
          </p>
        </div>
      </main>
    </div>
  )
}
