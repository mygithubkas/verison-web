"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"

export default function SectionOne() {
  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] pointer-events-none" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6 max-w-xl"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Welcome
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Verison's AI platforms bridge the gap between raw data and human-driven innovation. 
                We empower organizations in every sector to transform data into clear, actionable 
                strategies that streamline tasks, boost productivity, and inspire growth. With voice-first 
                technology and adaptive learning, Verison equips your team to solve problems and seize 
                opportunities like never before.
              </p>
              <div className="pt-2">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="rounded-full border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors"
                >
                  <span className="text-slate-800">Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4 text-slate-600" />
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] w-full lg:aspect-[3/3.5]"
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/Jack.png"
                  alt="Welcome"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 