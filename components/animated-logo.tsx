"use client"

import { motion } from "framer-motion"
import { Heart, Phone } from "lucide-react"

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl opacity-50" />
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/20">
          <div className="relative">
            <Phone className="w-16 h-16 sm:w-20 sm:h-20 text-white" strokeWidth={1.5} />
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-white absolute -bottom-1 -right-1" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">HopeLine AI</h1>
        <p className="text-blue-200 text-sm sm:text-base uppercase tracking-wider mt-2">
          Crisis Support • Sierra Leone
        </p>
      </motion.div>
    </motion.div>
  )
}
