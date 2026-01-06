"use client"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { getRehabCenters } from "@/lib/rehab-data"
import { Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function RehabCentersPage() {
  const [selectedCity, setSelectedCity] = useState("")
  const centers = getRehabCenters()
  const cities = Array.from(new Set(centers.map((c) => c.city)))
  const filtered = selectedCity ? centers.filter((c) => c.city === selectedCity) : centers

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="gradient-calm rounded-2xl p-6 pb-8">
          <h1 className="text-2xl font-bold text-primary">Rehabilitation Centers</h1>
          <p className="text-muted-foreground text-sm mt-1">Find professional addiction recovery programs near you.</p>
        </div>

        {/* City Filter */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Filter by City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Centers List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No centers found for the selected location.</p>
            </div>
          ) : (
            filtered.map((center) => (
              <div
                key={center.id}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-1">{center.name}</h3>
                  <p className="text-sm text-muted-foreground">{center.description}</p>
                </div>

                <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{center.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{center.phone}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`tel:${center.phone.replace(/\D/g, "")}`}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(center.name + " " + center.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    📍 Directions
                  </a>
                  <Link
                    href="/rehab-contact"
                    className="bg-accent text-accent-foreground px-4 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    📋 Request Support
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Contact Form Link */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <h2 className="font-bold text-foreground mb-3">Need Help Reaching Out?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Fill out a form to request support or connect with a rehabilitation center.
          </p>
          <Link
            href="/rehab-contact"
            className="block text-center bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:opacity-90"
          >
            Request Rehab Support →
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="bg-card rounded-lg p-4 border border-border text-xs text-muted-foreground space-y-2">
          <p>
            <strong>PLACEHOLDER DATA:</strong> The center information above includes placeholders. Before deployment,
            replace with verified current centers and phone numbers from Sierra Leone.
          </p>
          <p>Contact local health authorities or NGOs for the most current rehab center information.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}
