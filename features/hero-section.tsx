"use client" // Mark as client component

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight } from 'lucide-react' // Import icon from Lucide
import { Button } from "../ui/button" // Import from shadcn/ui
import ThreeScene from "./three-scene" // Import 3D background
import { cn } from "../lib/utils" // Import utility function
import SequentialAnimation from "../animations/sequential-animation" // Import animation component

/**
 * HeroSection Component
 * Main hero section with 3D background, animated text, and CTAs
 */
export default function HeroSection() {
  // Animation controls for staggered animations
  const controls = useAnimation()
  // Reference for intersection observer
  const ref = useRef(null)
  // Check if section is in view
  const inView = useInView(ref)
  // Track if content is loaded
  const [isLoaded, setIsLoaded] = useState(false)

  // Start animations when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }

    // Simulate loading completion after 500ms
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [controls, inView])

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger child animations
        delayChildren: 0.3, // Delay before starting children
      },
    },
  }

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0.0, 0.2, 1] },
    },
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Initial loading overlay */}
      <motion.div
        className="fixed inset-0 z-50 bg-slate-950 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, display: "none" }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-white"
        >
          Verison
        </motion.div>
      </motion.div>

      {/* 3D Animation Background */}
      <div className="absolute inset-0 z-0">
        <ThreeScene />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={controls} className="max-w-4xl">
          {/* Main sequential animation */}
          <div className="h-40 md:h-32 mb-8">
            <SequentialAnimation />
          </div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {/* Primary Button */}
            <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white border-0 rounded-md px-8 group">
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            {/* Secondary Button */}
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-white hover:bg-slate-800/50 rounded-md px-8"
            >
              Book a Demo
            </Button>
          </motion.div>

          {/* Client Logos */}
          <motion.div
            variants={itemVariants}
            className={cn(
              "grid grid-cols-2 sm:grid-cols-4 gap-6 transition-opacity duration-1000 mb-8",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
          >
            {/* Company names */}
            {["Accenture", "Credit Suisse", "Deutsche Bank", "Hugo Boss"].map((company) => (
              <div key={company} className="text-slate-500 font-medium text-sm md:text-base">
                {company}
              </div>
            ))}
          </motion.div>

          {/* AI-Powered Solutions Badge - Moved to bottom */}
          <motion.div variants={itemVariants} className="mt-4">
            <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 text-slate-300 text-sm font-medium">
              AI-Powered Solutions
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient orbs */}
      {/* Top-right blue orb */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      {/* Bottom-left purple orb with delay */}
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  )
}