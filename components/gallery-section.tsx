"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const images = [
  { src: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800&q=80", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80", aspect: "aspect-square" },
]

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-20 px-6"
      >
        <span className="text-xs tracking-[0.4em] text-primary uppercase mb-4 block">Gallery</span>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight">
          Visual <span className="text-gradient">Mastery</span>
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          <motion.div style={{ y: y1 }} className="space-y-3 md:space-y-6">
            <GalleryCard image={images[0].src} aspect={images[0].aspect} index={0} />
            <GalleryCard image={images[1].src} aspect={images[1].aspect} index={1} />
          </motion.div>
          <motion.div style={{ y: y2 }} className="space-y-3 md:space-y-6 pt-8 md:pt-16">
            <GalleryCard image={images[2].src} aspect={images[2].aspect} index={2} />
            <GalleryCard image={images[3].src} aspect={images[3].aspect} index={3} />
          </motion.div>
          <motion.div style={{ y: y3 }} className="hidden md:block space-y-6">
            <GalleryCard image={images[4].src} aspect={images[4].aspect} index={4} />
            <GalleryCard image={images[5].src} aspect={images[5].aspect} index={5} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function GalleryCard({ image, aspect, index }: { image: string; aspect: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className={`relative ${aspect} rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer`}
    >
      <img src={image} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" crossOrigin="anonymous" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary">View</span>
      </motion.div>

      <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-transparent group-hover:border-primary transition-colors duration-500" />
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-transparent group-hover:border-primary transition-colors duration-500" />
    </motion.div>
  )
}
