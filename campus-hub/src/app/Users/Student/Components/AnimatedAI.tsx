'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedAIProps {
  isMinimized: boolean
}

const AnimatedAI: React.FC<AnimatedAIProps> = ({ isMinimized }) => {
  const variants = {
    full: { width: '100%', height: '100%', opacity: 1 },
    minimized: { width: '100px', height: '100px', opacity: 0.7 }
  }

  return (
    <motion.div
      className="flex items-center justify-center bg-blue-100 rounded-lg"
      initial="full"
      animate={isMinimized ? "minimized" : "full"}
      variants={variants}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-32 h-32 border-t-4 border-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-24 h-24 border-t-4 border-blue-700 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-16 h-16 border-t-4 border-blue-900 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  )
}

export default AnimatedAI

