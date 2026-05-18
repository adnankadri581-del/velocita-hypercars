"use client"

import { useEffect, useState, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { LoadingScreen } from "@/components/loading-screen"
import { CustomCursor } from "@/components/custom-cursor"
import { ParticleField } from "@/components/particle-field"
import { Navbar, HeroSection } from "@/components/hero-section"
import { LogoSlider } from "@/components/logo-slider"
import { StatsSection } from "@/components/stats-section"
import { HorizontalShowcase } from "@/components/horizontal-showcase"
import { FeaturesSection } from "@/components/features-section"
import { CinematicSection } from "@/components/cinematic-section"
import { GallerySection } from "@/components/gallery-section"
import { ParallaxSection } from "@/components/parallax-section"
import { Footer } from "@/components/footer"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [showContent])

  useEffect(() => {
    if (showContent) {
      // Refresh ScrollTrigger after content loads
      const timeout = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [showContent])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setShowContent(true), 100)
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      {showContent && <CustomCursor />}

      {/* Particle Field Background */}
      {showContent && <ParticleField />}

      {/* Main Content */}
      {showContent && (
        <main className="relative">
          {/* Global Background Effects */}
          <div className="fixed inset-0 pointer-events-none z-0">
            {/* Noise texture */}
            <div className="absolute inset-0 opacity-[0.012] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
            
            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.05_0_0_/_0.5)_100%)]" />
          </div>

          {/* Navigation */}
          <Navbar />

          {/* Page Sections */}
          <HeroSection />
          <LogoSlider />
          <StatsSection />
          <HorizontalShowcase />
          <FeaturesSection />
          <CinematicSection />
          <GallerySection />
          <ParallaxSection />
          <Footer />
        </main>
      )}
    </>
  )
}
