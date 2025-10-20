'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FormSectionProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  delay?: number
}

export function FormSection({ title, icon, children, delay = 0 }: FormSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {icon}
          </motion.div>
        )}
        <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
          {title}
        </h3>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  )
}
