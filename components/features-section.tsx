"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    title: "Aerodynamics",
    subtitle: "Wind Sculpted",
    description: "Every curve engineered to slice through air with zero resistance. Active aero systems adapt in milliseconds.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    stat: "0.28",
    statLabel: "Cd",
  },
  {
    title: "Carbon Core",
    subtitle: "Lightweight Power",
    description: "Full carbon fiber monocoque chassis. Strength of steel at a fraction of the weight.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    stat: "1,250",
    statLabel: "kg",
  },
  {
    title: "Hybrid System",
    subtitle: "Electric Soul",
    description: "Dual electric motors augment the V10 powerplant. Instant torque, zero lag, infinite possibilities.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    stat: "200",
    statLabel: "kW",
  },
  {
    title: "Active Dynamics",
    subtitle: "Intelligent Control",
    description: "AI-driven suspension reads the road 1000x per second. Predictive systems anticipate every corner.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    stat: "1ms",
    statLabel: "Response",
  },
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / innerHeight - 0.5) * 20)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feature-card",
        { y: 80, opacity: 0, rotateY: -5 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" id="design">
      {/* Background */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
        >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.72 0.22 42 / 0.4) 0%, transparent 60%)", filter: "blur(100px)" }} />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs tracking-[0.4em] text-primary uppercase mb-4 block">Engineering Excellence</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-foreground">Precision</span>{" "}
            <span className="text-gradient">Crafted</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Every component designed with obsessive attention to detail.
          </p>
        </motion.div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 perspective-2000">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="feature-card group relative p-6 md:p-8 lg:p-10 rounded-2xl glass overflow-hidden cursor-default"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.72 0.22 42 / 0.08), transparent 40%)" }} />

              <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/30 rounded-tl group-hover:border-primary/60 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary/30 rounded-tr group-hover:border-primary/60 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary/30 rounded-bl group-hover:border-primary/60 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary/30 rounded-br group-hover:border-primary/60 group-hover:w-6 group-hover:h-6 transition-all duration-300" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    {feature.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground group-hover:text-gradient transition-all duration-500">
                      {feature.stat}
                    </span>
                    <span className="block text-[10px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase">
                      {feature.statLabel}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] md:text-xs tracking-[0.25em] text-primary uppercase mb-1 md:mb-2 block">
                  {feature.subtitle}
                </span>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-gradient transition-all duration-500">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
                  />
                </div>
              </div>

              <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[7px] md:text-[8px] font-mono tracking-[0.3em] text-muted-foreground/30">
                F.{String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
