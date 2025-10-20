import { cn } from '@/lib/utils'
import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white',
      secondary: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
      danger: 'bg-red-500 hover:bg-red-600 text-white',
      ghost: 'hover:bg-white/10 text-white',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'rounded-xl font-semibold transition-all duration-200',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'flex items-center justify-center gap-2',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
