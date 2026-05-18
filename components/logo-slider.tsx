"use client"

import { motion } from "framer-motion"

const partners = [
  "PIRELLI", "BREMBO", "ALCANTARA", "SPARCO", "RECARO", "ÖHLINS", "AKRAPOVIČ", "MICHELIN"
]

export function LogoSlider() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden border-y border-border/30">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-12 relative z-20"
      >
        <span className="text-[10px] md:text-xs tracking-[0.4em] text-muted-foreground uppercase">
          Trusted Partners
        </span>
      </motion.div>

      <div className="relative">
        <div className="flex animate-slide-infinite" style={{ width: "fit-content" }}>
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className="flex-shrink-0 px-8 md:px-16">
              <span className="text-2xl md:text-4xl font-black tracking-[0.2em] text-muted-foreground/20 hover:text-primary/50 transition-colors duration-500 cursor-default whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  )
}
