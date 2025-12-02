import React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info'
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700',
    success: 'bg-trust-green-100 text-trust-green-800',
    warning: 'bg-sunset-amber-100 text-sunset-amber-800',
    info: 'bg-ocean-blue-100 text-ocean-blue-800',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
