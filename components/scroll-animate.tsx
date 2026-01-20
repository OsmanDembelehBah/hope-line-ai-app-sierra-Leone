"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollAnimateProps {
  children: ReactNode
  className?: string
  animation?: "up" | "left" | "right" | "scale"
  delay?: number
}

export function ScrollAnimate({ 
  children, 
  className = "", 
  animation = "up",
  delay = 0 
}: ScrollAnimateProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible")
            }, delay * 50) // Fast stagger: 50ms per delay unit
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  const animationClass = {
    up: "scroll-animate",
    left: "scroll-animate-left",
    right: "scroll-animate-right",
    scale: "scroll-animate-scale",
  }[animation]

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  )
}
