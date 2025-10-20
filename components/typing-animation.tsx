'use client'

import { TypeAnimation } from 'react-type-animation'

interface TypingAnimationProps {
  sequence?: (string | number)[]
  className?: string
}

export function TypingAnimation({ 
  sequence = [
    'Ultimate Gaming Tournament',
    2000,
    'Win Amazing Prizes 🏆',
    2000,
    'Show Your Gaming Skills',
    2000,
    'Join Epic Battles',
    2000,
  ],
  className = ''
}: TypingAnimationProps) {
  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={50}
      className={className}
      repeat={Infinity}
      cursor={true}
    />
  )
}
