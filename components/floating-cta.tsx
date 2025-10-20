'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

interface FloatingCTAProps {
  href: string
  text: string
  icon?: React.ReactNode
}

export function FloatingCTA({ href, text, icon }: FloatingCTAProps) {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
    >
      <Link href={href}>
        <motion.button
          className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl flex items-center gap-3 group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 20px rgba(249, 115, 22, 0.5)',
              '0 0 40px rgba(249, 115, 22, 0.8)',
              '0 0 20px rgba(249, 115, 22, 0.5)',
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          
          {/* Content */}
          <span className="relative z-10 flex items-center gap-2">
            {icon || <Sparkles className="w-5 h-5" />}
            {text}
          </span>

          {/* Sparkle Effect */}
          <motion.div
            className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full"
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              x: [0, -40],
              y: [0, 40],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.button>
      </Link>
    </motion.div>
  )
}
