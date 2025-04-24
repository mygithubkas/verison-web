"use client" // Mark as client component for browser APIs

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * Animation stages enum
 * Defines the different stages of the text animation sequence
 */
enum Stage {
  Initial = 0,    // New initial stage for delay
  SubHeadline = 1, // Start with enterprise intelligence text
  Listens = 2,     // "AI That Listens"
  Learns = 3,      // "Learns"
  Acts = 4,        // "Acts"
  Tagline = 5,     // Final Verison tagline
  Clear = 6,       // Reset stage
}

/**
 * SequentialAnimation Component
 * Handles the text animation sequence with precise timing control
 */
export default function SequentialAnimation() {
  // Current animation stage
  const [stage, setStage] = useState<Stage>(Stage.Initial)
  // Animation cycle counter for unique keys
  const [cycle, setCycle] = useState(0)

  // Control the animation sequence timing
  useEffect(() => {
    if (stage === Stage.Initial) {
      // Start with 5 second delay
      const timer = setTimeout(() => {
        setStage(Stage.SubHeadline)
      }, 5000)
      return () => clearTimeout(timer)
    }

    if (stage === Stage.Clear) {
      const timer = setTimeout(() => {
        setCycle((prev) => prev + 1)
        setStage(Stage.Initial) // Reset to initial stage for next cycle
      }, 500)
      return () => clearTimeout(timer)
    }

    // Array to track all timers for cleanup
    const timers: NodeJS.Timeout[] = []

    // Set timers for each stage transition with precise timing
    if (stage === Stage.SubHeadline) {
      timers.push(setTimeout(() => setStage(Stage.Listens), 10000)) // Show subheadline for 10s
    } else if (stage === Stage.Listens) {
      timers.push(setTimeout(() => setStage(Stage.Learns), 2000))
    } else if (stage === Stage.Learns) {
      timers.push(setTimeout(() => setStage(Stage.Acts), 2000))
    } else if (stage === Stage.Acts) {
      timers.push(setTimeout(() => setStage(Stage.Tagline), 2000))
    } else if (stage === Stage.Tagline) {
      timers.push(setTimeout(() => setStage(Stage.Clear), 15000)) // Final tagline for 15s
    }

    // Clean up all timers on unmount or stage change
    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [stage]) // Re-run when stage changes

  // Smooth fade animation variants
  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(8px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.5,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(8px)",
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  }

  // Add a new variant for the staggered reveal
  const fadeInUpStaggered = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.6,
        ease: [0.04, 0.62, 0.23, 0.98],
      },
    },
  }

  return (
    <div className="relative h-full flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {/* Initial empty stage */}
        {stage === Stage.Initial && (
          <motion.div
            key={`initial-${cycle}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          />
        )}

        {/* Subheadline with gradual reveal */}
        {stage === Stage.SubHeadline && (
          <motion.div
            key={`subheadline-${cycle}`}
            className="text-base sm:text-lg md:text-xl text-slate-200 max-w-3xl absolute px-1 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 2,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              From autonomous agents to voice-first systems —{" "}
            </motion.span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 2,
                delay: 0.3,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              Verison
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 2,
                delay: 0.6,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
            >
              {" "}powers the next generation of enterprise intelligence.
            </motion.span>
          </motion.div>
        )}

        {/* AI That Listens */}
        {stage === Stage.Listens && (
          <motion.h1
            key={`listens-${cycle}`}
            className="text-4xl md:text-5xl lg:text-6xl font-medium absolute"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
              AI That Listens
            </span>
          </motion.h1>
        )}

        {/* Learns */}
        {stage === Stage.Learns && (
          <motion.h1
            key={`learns-${cycle}`}
            className="text-4xl md:text-5xl lg:text-6xl font-medium absolute"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
              Learns
            </span>
          </motion.h1>
        )}

        {/* Acts */}
        {stage === Stage.Acts && (
          <motion.h1
            key={`acts-${cycle}`}
            className="text-4xl md:text-5xl lg:text-6xl font-medium absolute"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-bold">
              Acts
            </span>
          </motion.h1>
        )}

        {/* Final Tagline with magical reveal */}
        {stage === Stage.Tagline && (
          <div className="absolute flex flex-col items-start">
            <motion.h2
              key={`tagline-title-${cycle}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.8,
                ease: [0.04, 0.62, 0.23, 0.98],
              }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3"
            >
              Verison
            </motion.h2>
            <motion.div
              key={`tagline-subtitle-${cycle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="relative"
            >
              <motion.p
                initial={{ 
                  opacity: 0,
                  scale: 0.95,
                  filter: "blur(8px)",
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: 1,
                  duration: 1.5,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
                className="text-xl md:text-2xl lg:text-3xl text-slate-200 relative z-10"
              >
                The Power of Knowing.
              </motion.p>
              <motion.div
                initial={{ 
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: 1.1,
                }}
                transition={{
                  delay: 1,
                  duration: 2,
                  ease: "easeOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}