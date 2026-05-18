"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 780, unit: "HP", label: "Maximum Power" },
  { value: 2.8, unit: "SEC", label: "0-100 km/h" },
  { value: 350, unit: "KM/H", label: "Top Speed" },
  { value: 8500, unit: "RPM", label: "Redline" },
]

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inView = useInView(nodeRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!inView || !nodeRef.current) return
    const node = nodeRef.current
    const isDecimal = value % 1 !== 0

    gsap.fromTo(
      { val: 0 },
      { val: value },
      {
        duration,
        ease: "power2.out",
        onUpdate: function () {
          const current = this.targets()[0].val
          node.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()
        },
      }
    )
  }, [inView, value, duration])

  return <span ref={nodeRef}>0</span>
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-card",
        { y: 100, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" id="performance">
      {/* Background Effects */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, oklch(0.72 0.22 42 / 0.3) 0%, transparent 60%)", filter: "blur(100px)" }} />
      </motion.div>

      {/* Horizontal Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-xs tracking-[0.4em] text-primary uppercase mb-4 block">Performance Specs</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
            <span className="text-foreground">Raw</span>{" "}
            <span className="text-gradient">Power</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 perspective-2000">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card group relative p-6 md:p-10 rounded-2xl glass border-glow hover:glow-subtle transition-all duration-500 cursor-default"
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle at center, oklch(0.72 0.22 42 / 0.1) 0%, transparent 70%)" }} />
              
              {/* HUD Corners */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/40 rounded-tl" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/40 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/40 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/40 rounded-br" />

              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground group-hover:text-gradient transition-all duration-500">
                    <AnimatedCounter value={stat.value} duration={2 + i * 0.3} />
                  </span>
                  <span className="text-lg md:text-2xl font-bold text-primary">{stat.unit}</span>
                </div>
                <p className="text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">{stat.label}</p>
              </div>

              {/* Animated Line */}
              <div className="absolute bottom-0 left-6 right-6 h-[2px] overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className="h-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 origin-left"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
