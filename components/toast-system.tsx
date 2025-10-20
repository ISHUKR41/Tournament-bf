'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'

export function setupToastSystem() {
  // This is called from layout to setup global toast styling
}

interface ToastOptions {
  title: string
  description?: string
  type?: 'success' | 'error' | 'info' | 'warning'
}

export const showToast = ({ title, description, type = 'info' }: ToastOptions) => {
  switch (type) {
    case 'success':
      toast.success(title, { description })
      break
    case 'error':
      toast.error(title, { description })
      break
    case 'warning':
      toast.warning(title, { description })
      break
    default:
      toast(title, { description })
  }
}
