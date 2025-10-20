import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  description?: string
  gradient: string
  iconColor: string
}

export function StatCard({
  icon: Icon,
  value,
  label,
  description,
  gradient,
  iconColor,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'bg-gradient-to-br backdrop-blur-sm border rounded-xl p-6 transition-all',
        gradient
      )}
    >
      <Icon className={cn('w-10 h-10 mb-3', iconColor)} />
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400">{label}</div>
      {description && (
        <div className={cn('text-sm mt-2', iconColor)}>{description}</div>
      )}
    </motion.div>
  )
}
