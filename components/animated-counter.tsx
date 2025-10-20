'use client'

import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className={className}>
      {inView && (
        <CountUp
          start={0}
          end={value}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      )}
    </div>
  )
}
