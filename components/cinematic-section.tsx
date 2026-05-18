"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        ".cinematic-text .word",
        { y: 100, opacity: 0, rotateX: -60 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cinematic-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section ref={containerRef} className="relative py-20 md:py-32 overflow-hidden" id="experience">
      {/* Background Gradient */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-30" style={{ background: "radial-gradient(ellipse at center, oklch(0.72 0.22 42 / 0.3) 0%, transparent 60%)", filter: "blur(100px)" }} />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs tracking-[0.4em] text-primary uppercase mb-4 block">The Experience</span>
          <div className="cinematic-text perspective-2000">
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight overflow-hidden">
              {"Feel The".split(" ").map((word, i) => (
                <span key={i} className="word inline-block mr-4 text-foreground">{word}</span>
              ))}
              {"Power".split(" ").map((word, i) => (
                <span key={i} className="word inline-block text-gradient text-glow">{word}</span>
              ))}
            </h2>
          </div>
        </motion.div>

        {/* Video Container */}
        <motion.div
          style={{ scale, opacity }}
          className="relative aspect-video max-w-6xl mx-auto rounded-2xl md:rounded-3xl overflow-hidden group"
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-red-sports-car-driving-through-the-city-at-night-34561-large.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className={`absolute inset-0 bg-background/40 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`} />

          {/* Play Button */}
          <motion.button
            onClick={handlePlayClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 rounded-full glass flex items-center justify-center transition-all duration-500 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          >
            <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{ background: "radial-gradient(circle, oklch(0.72 0.22 42 / 0.3) 0%, transparent 70%)" }} />
            <svg className="w-8 h-8 md:w-12 md:h-12 text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.button>

          {/* HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Corners */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-primary/50" />
            <div className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 border-t-2 border-r-2 border-primary/50" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 w-8 h-8 md:w-12 md:h-12 border-b-2 border-l-2 border-primary/50" />
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-primary/50" />

            {/* Side Info */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 text-[8px] md:text-[10px] font-mono tracking-wider text-white/50 hidden md:block">
              <div>REC 00:00:00</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-[8px] md:text-[10px] font-mono tracking-wider text-white/50 text-right hidden md:block">
              <div>4K HDR</div>
              <div>60FPS</div>
            </div>
          </div>

          {/* Scanlines */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none scanlines" />
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground italic max-w-3xl mx-auto">
            {'"'}The sound of pure power. The feeling of absolute control.{'"'}
          </p>
          <p className="text-sm text-primary mt-4 tracking-[0.2em] uppercase">
            — Velocità Design Philosophy
          </p>
        </motion.div>
      </div>
    </section>
  )
}
