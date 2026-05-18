"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Models", "Performance", "Design", "Experience", "Configure"]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.8, ease: [0.76, 0, 0.24, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled ? "glass-heavy py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.a
            href="#"
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xl md:text-2xl font-black tracking-[0.25em] text-gradient">
              VELOCITÀ
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
          </motion.a>

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 3 + i * 0.1 }}
                className="relative text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-300 group uppercase"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 3.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-[0.15em] uppercase rounded-full glow-subtle"
          >
            <span>Reserve Now</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <motion.span animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }} className="w-6 h-0.5 bg-foreground origin-center" />
            <motion.span animate={{ opacity: isMobileMenuOpen ? 0 : 1 }} className="w-6 h-0.5 bg-foreground" />
            <motion.span animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }} className="w-6 h-0.5 bg-foreground origin-center" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold tracking-[0.15em] text-foreground hover:text-primary transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85])
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5) * 40)
      mouseY.set((e.clientY / innerHeight - 0.5) * 40)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (!textRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 })

      tl.fromTo(".hero-line-1 .char", 
        { y: 120, opacity: 0, rotateX: -80 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.04, ease: "power4.out" }
      )
      .fromTo(".hero-line-2 .char",
        { y: 120, opacity: 0, rotateX: -80 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.04, ease: "power4.out" },
        "-=0.8"
      )
      .fromTo(".hero-subtitle",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".hero-cta",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".hero-stats > div",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      )
    }, textRef)

    return () => ctx.revert()
  }, [])

  const line1 = "BEYOND"
  const line2 = "LIMITS"

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      <motion.div
        style={{ y, scale }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background z-10" />
          <motion.div style={{ filter: `blur(${blur}px)` }} className="w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-40"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-in-the-rain-at-night-49738-large.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Dynamic Spotlight */}
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute inset-0 pointer-events-none z-[1]"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
            <div 
              className="w-full h-full rounded-full opacity-50"
              style={{
                background: "radial-gradient(circle, oklch(0.72 0.22 42 / 0.3) 0%, transparent 50%)",
                filter: "blur(80px)",
              }}
            />
          </div>
        </motion.div>

        {/* Animated Gradient Orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -left-1/4 w-[900px] h-[900px] z-[1]"
        >
          <div className="w-full h-full rounded-full" style={{ background: "conic-gradient(from 0deg, transparent, oklch(0.55 0.28 25 / 0.3), transparent)", filter: "blur(100px)" }} />
        </motion.div>

        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -right-1/4 w-[1000px] h-[1000px] z-[1]"
        >
          <div className="w-full h-full rounded-full" style={{ background: "conic-gradient(from 180deg, transparent, oklch(0.72 0.22 42 / 0.4), transparent)", filter: "blur(120px)" }} />
        </motion.div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 z-[2] opacity-20">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 z-[2] opacity-[0.015] pointer-events-none scanlines" />

        {/* Main Content */}
        <motion.div ref={textRef} style={{ opacity }} className="relative z-10 text-center px-6 pt-30 md:pt-20 max-w-7xl mx-auto">
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-10 flex items-center justify-center gap-6"
          >
            <motion.span 
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-primary origin-left" 
            />
            <span className="text-[10px] md:text-xs tracking-[0.5em] text-primary font-medium uppercase">
              Ultra Performance Supercars
            </span>
            <motion.span 
              animate={{ scaleX: [0, 1] }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-primary origin-right" 
            />
          </motion.div>

          {/* Main Title */}
          <h1 className="perspective-2000 mb-6">
            <div className="hero-line-1 flex justify-center overflow-hidden mb-2">
              {line1.split("").map((char, i) => (
                <span key={i} className="char inline-block text-[14vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tight text-foreground" style={{ textShadow: "0 0 100px oklch(0.72 0.22 42 / 0.2)" }}>
                  {char}
                </span>
              ))}
            </div>
            <div className="hero-line-2 flex justify-center overflow-hidden">
              {line2.split("").map((char, i) => (
                <span key={i} className="char inline-block text-[14vw] md:text-[12vw] lg:text-[10vw] font-black leading-[0.85] tracking-tight text-gradient text-glow">
                  {char}
                </span>
              ))}
            </div>
          </h1>

          {/* Animated Line */}
          <div className="relative h-[2px] w-32 md:w-64 mx-auto mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-muted/20" />
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle text-base md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Where revolutionary engineering meets
            <span className="text-gradient font-semibold"> breathtaking design.</span>
            <br className="hidden md:block" />
            Experience the pinnacle of automotive excellence.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <MagneticButton primary>
              <span className="relative z-10 flex items-center gap-3">
                Explore Models
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </MagneticButton>
            <MagneticButton>
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Film
              </span>
            </MagneticButton>
          </div>

          {/* Stats */}
          <div className="hero-stats flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { value: "780", unit: "HP", label: "Power Output" },
              { value: "2.8", unit: "s", label: "0-100 km/h" },
              { value: "350", unit: "km/h", label: "Top Speed" },
              { value: "V10", unit: "", label: "Engine" },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-5xl font-black text-foreground group-hover:text-gradient transition-all duration-500">
                    {stat.value}
                  </span>
                  <span className="text-sm md:text-lg font-bold text-primary">{stat.unit}</span>
                </div>
                <span className="text-[10px] md:text-xs tracking-[0.25em] text-muted-foreground uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-9 rounded-full border border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div
              animate={{ height: [6, 14, 6], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-0.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>

        {/* HUD Elements */}
        <div className="absolute inset-6 md:inset-10 pointer-events-none z-10 hidden md:block">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />
          
          {/* Side HUD Info */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.2em] text-muted-foreground/40 font-mono space-y-1">
            <div>LAT 45.4642</div>
            <div>LON 9.1900</div>
            <div>ALT 120M</div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] tracking-[0.2em] text-muted-foreground/40 font-mono text-right space-y-1">
            <div>SYS.ACTIVE</div>
            <div>V.2026.05</div>
            <div>MILANO</div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function MagneticButton({ children, primary = false }: { children: React.ReactNode; primary?: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { damping: 15, stiffness: 300 })
  const springY = useSpring(y, { damping: 15, stiffness: 300 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.4)
    y.set((e.clientY - centerY) * 0.4)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm font-bold tracking-[0.15em] uppercase rounded-full overflow-hidden group ${
        primary
          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground glow-intense"
          : "border border-border text-foreground hover:border-primary"
      }`}
    >
      {primary && (
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.4 }}
        />
      )}
      {children}
    </motion.button>
  )
}
