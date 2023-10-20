import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const PageContainer = ({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'bg-background flex gap-4 h-screen overflow-auto w-full flex-col px-20 py-8 items-center min-h-screen',
        className
      )}
    >
      <div className="flex-initial">{children}</div>
    </div>
  )
}
