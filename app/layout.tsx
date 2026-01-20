import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { FloatingAssistantWrapper } from "./floating-assistant-wrapper"

export const metadata: Metadata = {
  metadataBase: new URL("https://hopeline-ai.vercel.app"),
  title: {
    default: "HopeLine AI — Sierra Leone | Mental Health Crisis Support & Recovery",
    template: "%s | HopeLine AI Sierra Leone",
  },
  description:
    "Free 24/7 anonymous mental health support for Kush addiction, trauma survivors, and crisis help in Sierra Leone. AI-powered emotional support without judgment. Get help now.",
  keywords: [
    "HopeLine",
    "HopeLine AI",
    "mental health Sierra Leone",
    "crisis support",
    "Kush addiction help",
    "addiction recovery Sierra Leone",
    "trauma support",
    "emotional support",
    "free mental health",
    "anonymous counseling",
    "24/7 crisis helpline",
    "Sierra Leone mental health",
  ],
  authors: [{ name: "HopeLine AI Sierra Leone" }],
  creator: "HopeLine AI",
  publisher: "HopeLine AI Sierra Leone",
  openGraph: {
    title: "HopeLine AI — Free Mental Health Support in Sierra Leone",
    description: "24/7 anonymous AI-powered emotional support for addiction, trauma, and mental health crises. Free and confidential.",
    url: "https://hopeline-ai.vercel.app",
    siteName: "HopeLine AI Sierra Leone",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HopeLine AI — Mental Health Support Sierra Leone",
    description: "Free 24/7 anonymous mental health support. AI-powered crisis help for addiction and trauma survivors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "pXs0Th6s_5E5JJGXniQa4GxWKucH1FG_vV",
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
        <FloatingAssistantWrapper />
      </body>
    </html>
  )
}
