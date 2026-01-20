"use client"

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { Sun, Moon, Type, Volume2, Globe } from "lucide-react"

export default function SettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [fontSize, setFontSize] = useState("base")
  const [language, setLanguage] = useState("english")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    // Load preferences
    const savedTheme = (localStorage.getItem("hopeline-theme") as "light" | "dark") || "dark"
    const savedFontSize = localStorage.getItem("hopeline-fontSize") || "base"
    const savedLanguage = localStorage.getItem("hopeline-language") || "english"
    const savedSound = localStorage.getItem("hopeline-sound") !== "false"
    const savedContrast = localStorage.getItem("hopeline-contrast") === "true"

    setTheme(savedTheme)
    setFontSize(savedFontSize)
    setLanguage(savedLanguage)
    setSoundEnabled(savedSound)
    setHighContrast(savedContrast)

    // Apply theme to document
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme)
    localStorage.setItem("hopeline-theme", newTheme)

    if (newTheme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }

  const handleFontSizeChange = (size: string) => {
    setFontSize(size)
    localStorage.setItem("hopeline-fontSize", size)
    document.documentElement.style.fontSize = size === "base" ? "16px" : size === "large" ? "18px" : "14px"
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("hopeline-language", lang)
  }

  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value)
    localStorage.setItem("hopeline-sound", String(value))
  }

  const handleContrastToggle = (value: boolean) => {
    setHighContrast(value)
    localStorage.setItem("hopeline-contrast", String(value))
  }

  const languages = [
    { id: "english", name: "English", flag: "🇬🇧" },
    { id: "krio", name: "Krio", flag: "🇸🇱" },
    { id: "mende", name: "Mende", flag: "🗣️" },
    { id: "temne", name: "Temne", flag: "🗣️" },
    { id: "limba", name: "Limba", flag: "🗣️" },
  ]

  return (
    <div className="min-h-screen bg-background md:ml-64 pb-20 md:pb-8">
      <NavBar />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Settings & Accessibility</h1>
          <p className="text-muted-foreground">Customize HopeLine AI to suit your preferences and needs.</p>
        </div>

        {/* Display Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Sun className="w-5 h-5 text-primary" />
            Display & Theme
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="mb-3">
                <p className="font-semibold text-foreground">Theme</p>
                <p className="text-xs text-muted-foreground">Choose your preferred color scheme</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    theme === "light"
                      ? "bg-white text-gray-900 border-2 border-purple-600 shadow-lg"
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  Light
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    theme === "dark"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  Dark
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-semibold text-foreground">High Contrast</p>
                <p className="text-xs text-muted-foreground">Better visibility for visually impaired users</p>
              </div>
              <button
                onClick={() => handleContrastToggle(!highContrast)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  highContrast ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {highContrast ? "On" : "Off"}
              </button>
            </div>

            {/* Font Size */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Type className="w-5 h-5 text-primary" />
                Font Size
              </p>
              <div className="flex gap-2">
                {[
                  { id: "small", label: "Small", size: "text-sm" },
                  { id: "base", label: "Medium", size: "text-base" },
                  { id: "large", label: "Large", size: "text-lg" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleFontSizeChange(option.id)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      fontSize === option.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-muted border border-border"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Language
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`p-3 rounded-lg font-semibold transition-all text-sm ${
                  language === lang.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80 border border-border"
                }`}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            Note: Full multi-language support is coming soon. Currently available in English.
          </p>
        </div>

        {/* Sound Settings */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-primary" />
            Sound & Notifications
          </h2>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="font-semibold text-foreground">Sound Effects & Voice</p>
              <p className="text-xs text-muted-foreground">Enable audio for voice chat and notifications</p>
            </div>
            <button
              onClick={() => handleSoundToggle(!soundEnabled)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                soundEnabled ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {soundEnabled ? "On" : "Off"}
            </button>
          </div>
        </div>

        {/* Privacy & Data */}
        <div className="bg-gradient-calm rounded-2xl p-6 border border-primary/30">
          <h2 className="text-lg font-bold text-foreground mb-4">Privacy & Data</h2>

          <div className="space-y-3 text-sm text-foreground">
            <div className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>Anonymous by Default:</strong> HopeLine AI doesn't require login or collect personal data
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>Local Storage:</strong> Your journal entries and challenge progress are stored locally on your
                device only
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>No Tracking:</strong> We don't track your activity or sell your data
              </span>
            </div>
            <div className="flex gap-3">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>Clear Data:</strong> You can clear all stored data in your browser settings anytime
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear()
              sessionStorage.clear()
              alert("All local data has been cleared.")
            }}
            className="mt-6 w-full bg-destructive/20 text-destructive px-4 py-2 rounded-lg font-semibold hover:bg-destructive/30 transition-colors"
          >
            Clear All Local Data
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
