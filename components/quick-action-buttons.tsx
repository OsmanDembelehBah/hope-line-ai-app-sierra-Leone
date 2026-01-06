"use client"

import Link from "next/link"

interface QuickActionButton {
  label: string
  icon: string
  href?: string
  onClick?: () => void
  variant?: "default" | "emergency" | "secondary"
}

export function QuickActionButtons({ buttons }: { buttons: QuickActionButton[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {buttons.map((btn, idx) => {
        const baseClass = "px-4 py-3 rounded-lg font-semibold transition-all text-center text-sm"
        const variantClass =
          btn.variant === "emergency"
            ? "bg-destructive text-destructive-foreground hover:opacity-90"
            : btn.variant === "secondary"
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              : "bg-primary text-primary-foreground hover:bg-primary/90"

        const content = (
          <>
            <div className="text-lg mb-1">{btn.icon}</div>
            <div>{btn.label}</div>
          </>
        )

        if (btn.href) {
          return (
            <Link key={idx} href={btn.href} className={`${baseClass} ${variantClass} block`}>
              {content}
            </Link>
          )
        }

        return (
          <button key={idx} onClick={btn.onClick} className={`${baseClass} ${variantClass}`}>
            {content}
          </button>
        )
      })}
    </div>
  )
}
