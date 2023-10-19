import * as React from 'react'

import { cn } from '@/lib/utils'

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { hasErrors?: boolean }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasErrors, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          hasErrors
            ? 'border border-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500'
            : 'border-input focus-visible:outline-ring focus-visible:ring-ring',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
