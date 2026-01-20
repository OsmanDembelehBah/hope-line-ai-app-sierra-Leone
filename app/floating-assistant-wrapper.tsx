"use client"

import dynamic from "next/dynamic"

const FloatingAIAssistant = dynamic(() => import("@/components/floating-ai-assistant"), {
  ssr: false,
  loading: () => null,
})

export function FloatingAssistantWrapper() {
  return <FloatingAIAssistant />
}
