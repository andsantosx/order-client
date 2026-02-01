"use client"

import { useEffect, useRef } from "react"

export function PromoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch((error) => console.log("Video autoplay failed:", error))
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.2 } // Play when 20% visible (better for mobile)
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">

        {/* Helper text/header (optional, kept empty as per original component logic if intended, or removed if strictly just video asked) */}
        <div className="text-center mb-12">
          {/* If user wants text here later, they can add it. Currently empty as per previous state, but adding margin for spacing if needed. */}
        </div>

        <div className="relative aspect-video w-full max-w-7xl mx-auto overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src="/home-animation.mp4"
            poster="/home.png"
            muted
            playsInline
            loop
          />
        </div>

      </div>
    </section>
  )
}
