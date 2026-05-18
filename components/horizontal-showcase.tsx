"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cars = [
  {
    name: "TEMPESTA",
    tagline: "The Storm Unleashed",
    specs: { power: "780 HP", speed: "350 km/h", acceleration: "2.8s" },
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    name: "FULMINE",
    tagline: "Lightning in Motion",
    specs: { power: "820 HP", speed: "365 km/h", acceleration: "2.6s" },
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "INFERNO",
    tagline: "Born from Fire",
    specs: { power: "850 HP", speed: "380 km/h", acceleration: "2.5s" },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "OMBRA",
    tagline: "Silent Predator",
    specs: { power: "760 HP", speed: "340 km/h", acceleration: "2.9s" },
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    color: "from-violet-500/20 to-purple-500/20",
  },
]

export function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".car-image-inner").forEach((img) => {
        gsap.to(img, {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative h-[400vh]" id="models">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Background Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Header */}
        <div className="absolute top-6 md:top-10 left-6 md:left-12 z-20">
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs tracking-[0.4em] text-primary uppercase block mb-2"
          >
            Model Lineup
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight"
          >
            <span className="text-gradient">Collection</span>
          </motion.h2>
        </div>

        {/* Progress */}
        <div className="absolute top-6 md:top-10 right-6 md:right-12 z-20 flex items-center gap-4">
          <div className="w-20 md:w-32 h-[2px] bg-muted/20 overflow-hidden rounded-full">
            <motion.div style={{ width: progressWidth }} className="h-full bg-primary" />
          </div>
          <span className="text-[10px] md:text-xs font-mono text-muted-foreground w-8">
            <motion.span>
              {useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)}
            </motion.span>
          </span>
        </div>

        {/* Cards */}
        <motion.div style={{ x }} className="flex gap-6 md:gap-12 pl-6 md:pl-12 pr-[30vw]">
          {cars.map((car, i) => (
            <motion.div
              key={car.name}
              className="relative flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[55vw] h-[75vh] md:h-[80vh] group"
            >
              <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden glass">
                {/* Gradient BG */}
                <div className={`absolute inset-0 bg-gradient-to-br ${car.color} opacity-60`} />

                {/* Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="car-image-inner w-[120%] h-full">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                      crossOrigin="anonymous"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
                </div>

                {/* Model Number */}
                <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[80px] md:text-[120px] lg:text-[150px] font-black text-white/[0.03] leading-none select-none">
                  0{i + 1}
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-[10px] md:text-xs tracking-[0.3em] text-primary uppercase mb-2 md:mb-3 block">
                      {car.tagline}
                    </span>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-4 md:mb-6 group-hover:text-gradient transition-all duration-500">
                      {car.name}
                    </h3>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-4 md:gap-8 mb-6 md:mb-8">
                      {Object.entries(car.specs).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">{value}</span>
                          <span className="block text-[9px] md:text-xs tracking-[0.2em] text-muted-foreground uppercase mt-1">
                            {key}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-3 text-xs md:text-sm font-bold tracking-[0.15em] text-primary uppercase group/btn"
                    >
                      <span>Explore</span>
                      <span className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-primary/50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-primary-foreground transition-all duration-300">
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* HUD */}
                <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-1 text-[8px] md:text-[9px] font-mono text-muted-foreground/40 tracking-wider">
                  <span>MDL.{String(i + 1).padStart(3, "0")}</span>
                  <span>SRS.VELOCITÀ</span>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/30" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/30" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/30" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Nav Dots */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {cars.map((_, i) => {
            const start = i / cars.length
            const end = (i + 1) / cars.length
            return (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: useTransform(scrollYProgress, (v) =>
                    v >= start && v < end ? "oklch(0.72 0.22 42)" : "oklch(0.3 0 0)"
                  ),
                  scale: useTransform(scrollYProgress, (v) =>
                    v >= start && v < end ? 1.5 : 1
                  ),
                }}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
