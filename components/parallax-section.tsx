"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth - 0.5) * 30)
      mouseY.set((e.clientY / innerHeight - 0.5) * 30)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section ref={containerRef} className="relative py-32 md:py-48 lg:py-64 overflow-hidden" id="innovation">
      {/* Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: y1 }} className="absolute top-10 left-10 w-64 md:w-96 h-64 md:h-96 rounded-full opacity-20" >
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.72 0.22 42 / 0.5) 0%, transparent 70%)", filter: "blur(60px)" }} />
        </motion.div>

        <motion.div style={{ y: y3 }} className="absolute bottom-10 right-10 w-80 md:w-[500px] h-80 md:h-[500px] rounded-full opacity-15">
          <div className="w-full h-full rounded-full" style={{ background: "radial-gradient(circle, oklch(0.55 0.28 25 / 0.5) 0%, transparent 60%)", filter: "blur(80px)" }} />
        </motion.div>

        {/* Rotating Rings */}
        <motion.div style={{ y: y2, x: smoothX, rotateZ: rotate }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[400px] md:h-[700px]">
          <div className="w-full h-full rounded-full border border-border/10" />
          <div className="absolute inset-8 md:inset-12 rounded-full border border-border/15" />
          <div className="absolute inset-16 md:inset-24 rounded-full border border-border/20" />
          <div className="absolute inset-24 md:inset-36 rounded-full border border-primary/10" />
        </motion.div>
      </div>

      <motion.div style={{ scale }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.4em] text-primary uppercase mb-6 md:mb-8 block"
        >
          The Philosophy
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] mb-8 md:mb-12"
        >
          <span className="text-foreground block">{"We don't follow"}</span>
          <span className="text-gradient text-glow block my-2">{"the future."}</span>
          <span className="text-foreground block">{"We create it."}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12"
        >
          Born from a relentless pursuit of perfection, our vehicles represent the pinnacle of human engineering and artistic expression.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground text-xs md:text-sm uppercase tracking-[0.2em] font-bold rounded-full glow-subtle"
          >
            Experience Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 md:px-10 py-4 md:py-5 border border-border text-foreground text-xs md:text-sm uppercase tracking-[0.2em] font-bold rounded-full hover:border-primary transition-colors"
          >
            Our Heritage
          </motion.button>
        </motion.div>
      </motion.div>

      {/* HUD Elements */}
      <div className="absolute inset-6 md:inset-12 pointer-events-none hidden md:block">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />
      </div>
    </section>
  )
}
