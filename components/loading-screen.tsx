"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<"loading" | "reveal" | "complete">("loading")
  const containerRef = useRef<HTMLDivElement>(null)
  const textRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const duration = 2800
    const startTime = Date.now()
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      if (newProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else {
        setPhase("reveal")
        
        // Dramatic reveal animation
        const tl = gsap.timeline({
          onComplete: () => {
            setPhase("complete")
            setTimeout(onComplete, 400)
          }
        })

        tl.to(textRefs.current, {
          y: -100,
          opacity: 0,
          stagger: 0.05,
          duration: 0.6,
          ease: "power3.in"
        })
        .to(".loading-bar-container", {
          scaleX: 0,
          duration: 0.4,
          ease: "power3.in"
        }, "-=0.4")
        .to(".loading-orb", {
          scale: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.in"
        }, "-=0.2")
      }
    }
    
    requestAnimationFrame(updateProgress)
  }, [onComplete])

  const brandName = "VELOCITÀ"

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 grid-distort opacity-30" />
          
          {/* Animated Orb */}
          <motion.div
            className="loading-orb absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-[500px] h-[500px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, oklch(0.72 0.22 42 / 0.3) 25%, transparent 50%, oklch(0.55 0.28 25 / 0.2) 75%, transparent 100%)",
                    filter: "blur(60px)"
                  }}
                />
              </motion.div>
              <div 
                className="absolute inset-[100px] rounded-full"
                style={{
                  background: "radial-gradient(circle, oklch(0.72 0.22 42 / 0.15) 0%, transparent 70%)"
                }}
              />
            </div>
          </motion.div>

          {/* Brand Name */}
          <div className="relative z-10 mb-20">
            <div className="flex overflow-hidden">
              {brandName.split("").map((char, i) => (
                <motion.span
                  key={i}
                  ref={el => { textRefs.current[i] = el }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3 + i * 0.08,
                    ease: [0.33, 1, 0.68, 1]
                  }}
                  className="text-5xl md:text-8xl font-black tracking-[0.2em] text-gradient inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center mt-4"
            >
              <span className="text-[10px] md:text-xs tracking-[0.5em] text-muted-foreground uppercase">
                Ultra Performance
              </span>
            </motion.div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="loading-bar-container relative w-80 md:w-[500px] origin-center"
          >
            {/* Track */}
            <div className="h-[1px] bg-muted/20 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                style={{ transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              />
            </div>

            {/* Progress Info */}
            <div className="flex justify-between mt-6">
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase font-mono">
                Initializing Experience
              </span>
              <span className="text-[10px] tracking-[0.2em] font-mono text-primary tabular-nums">
                {Math.round(progress).toString().padStart(3, "0")}%
              </span>
            </div>
          </motion.div>

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none scanlines opacity-50" />

          {/* HUD Corners */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-8 md:inset-12 pointer-events-none"
          >
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
          </motion.div>

          {/* Side Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-12 text-[9px] font-mono tracking-wider text-muted-foreground hidden md:block"
          >
            <div>SYS.BOOT</div>
            <div>VER.2026.05</div>
            <div>MILANO.IT</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 right-12 text-[9px] font-mono tracking-wider text-muted-foreground text-right hidden md:block"
          >
            <div>VELOCITÀ MOTORS</div>
            <div>EST.1963</div>
            <div>BEYOND LIMITS</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
