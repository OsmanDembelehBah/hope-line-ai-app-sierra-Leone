"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
      setIsLoaded(true)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!hasError ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasError(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            poster="/recovery-journey-hope-overcoming-addiction-support.jpg"
          >
            {/* Optimized video URL - shows: struggles with addiction → support & counseling → hope & healing */}
            <source src="/mission-video-addiction-recovery-survivor-support.mp4" type="video/mp4" />
          </video>

          {/* Fallback image layer while video loads */}
          {!isLoaded && (
            <div className="absolute inset-0">
              <Image
                src="/recovery-journey-hope-overcoming-addiction-support.jpg"
                alt="Mission - supporting recovery from addiction and trauma"
                fill
                className="object-cover opacity-25"
                priority
              />
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0">
          <Image
            src="/recovery-journey-hope-overcoming-addiction-support.jpg"
            alt="Recovery journey - from struggle to hope and healing"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/90 via-purple-950/85 to-indigo-950/90" />

      {/* Subtle animated overlay for emotional depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] animate-pulse-slow" />
    </div>
  )
}
