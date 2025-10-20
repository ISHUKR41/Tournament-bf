import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export function generateId(prefix: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 11)
  return `${prefix}-${timestamp}-${random}`
}

export function calculateRevenue(teams: number, entryFee: number = 80): number {
  return teams * entryFee
}

export function getSlotsRemaining(total: number, filled: number): number {
  return Math.max(0, total - filled)
}

export function isSlotsAvailable(total: number, filled: number): boolean {
  return filled < total
}

export function getRegistrationProgress(total: number, filled: number): number {
  return Math.min(100, (filled / total) * 100)
}
