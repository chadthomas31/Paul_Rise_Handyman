import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}) => {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2
        className={cn(
          'text-3xl md:text-4xl font-extrabold tracking-tight mb-4',
          light ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg md:text-xl max-w-3xl leading-relaxed',
            centered && 'mx-auto',
            light ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
