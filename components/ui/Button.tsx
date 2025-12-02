import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-ocean-blue-500 text-white hover:bg-ocean-blue-600 focus:ring-ocean-blue-500 shadow-md hover:shadow-lg',
      secondary: 'bg-sunset-amber-500 text-white hover:bg-sunset-amber-600 focus:ring-sunset-amber-500 shadow-md hover:shadow-lg',
      outline: 'border-2 border-ocean-blue-500 text-ocean-blue-500 hover:bg-ocean-blue-50 focus:ring-ocean-blue-500',
      ghost: 'text-ocean-blue-500 hover:bg-ocean-blue-50 focus:ring-ocean-blue-500',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
