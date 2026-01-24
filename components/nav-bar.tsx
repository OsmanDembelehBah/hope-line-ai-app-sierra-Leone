"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Logo } from "@/components/logo"
import {
  MessageCircle,
  Wind,
  AlertCircle,
  Home,
  Music,
  BookOpen,
  Users,
  Settings,
  MoreVertical,
  Heart,
  Phone,
  Activity,
  Video,
} from "lucide-react"

const PRIMARY_NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/therapy", label: "Therapy", icon: Video },
  { href: "/angle", label: "Angle", icon: Activity },
  { href: "/breathing", label: "Breathe", icon: Wind },
  { href: "/crisis", label: "Crisis", icon: AlertCircle },
]

const SECONDARY_NAV_ITEMS = [
  { href: "/music", label: "Music", icon: Music },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/relax", label: "Relax", icon: Heart },
  { href: "/challenges", label: "Challenges", icon: Users },
  { href: "/community", label: "Stories", icon: Users },
  { href: "/news", label: "News", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Phone },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function NavBar() {
  const pathname = usePathname()
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  return (
    <>
      {/* Mobile Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
        <div className="flex justify-around items-center h-16 overflow-x-auto">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors flex-shrink-0 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}

          {/* More Menu Button */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                showMoreMenu ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="More options"
            >
              <MoreVertical className="w-5 h-5" />
              <span className="text-xs font-medium">More</span>
            </button>

            {/* Dropdown Menu */}
            {showMoreMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg p-2 w-48">
                {SECONDARY_NAV_ITEMS.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMoreMenu(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 gap-8 pt-8 overflow-y-auto">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Primary Navigation */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted-foreground px-4 mb-2">MAIN FEATURES</p>
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="flex flex-col gap-2 border-t border-border pt-4">
          <p className="text-xs font-semibold text-muted-foreground px-4 mb-2">MORE TOOLS</p>
          {SECONDARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>

        {/* Emergency Section */}
        <div className="mt-auto pt-6 border-t border-border space-y-3">
          <p className="text-xs font-semibold text-muted-foreground">EMERGENCY HELP</p>
          <a
            href="tel:019"
            className="block w-full bg-destructive text-destructive-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm text-center"
          >
            📞 Call Police (019)
          </a>
          <a
            href="tel:+232 722 47800"
            className="block w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm text-center"
          >
            💙 Rainbo Initiative
          </a>
        </div>
      </nav>
    </>
  )
}
