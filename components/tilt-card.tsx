'use client'

import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  scale?: number
  transitionSpeed?: number
}

export function TiltCard({
  children,
  className = '',
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  scale = 1.05,
  transitionSpeed = 2000,
}: TiltCardProps) {
  return (
    <Tilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      scale={scale}
      transitionSpeed={transitionSpeed}
      className={className}
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </Tilt>
  )
}
