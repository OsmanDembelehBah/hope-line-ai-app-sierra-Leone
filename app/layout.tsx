import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import FloatingAIAssistant from "@/components/floating-ai-assistant"

export const metadata: Metadata = {
  title: "HopeLine AI — Sierra Leone | Crisis Support & Recovery",
  description:
    "Anonymous emotional support for Kush addiction, rape survivors, and crisis help in Sierra Leone. 24/7 confidential support without judgment.",
  keywords: "crisis support, mental health, addiction recovery, rape survivors, Sierra Leone, emotional support",
  openGraph: {
    title: "HopeLine AI — Sierra Leone",
    description: "Anonymous emotional support and crisis help",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#667eea" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        {children}
        <FloatingAIAssistant />
      </body>
    </html>
  )
}
