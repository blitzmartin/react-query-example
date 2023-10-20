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
        'bg-background flex h-screen overflow-auto w-full min-h-screen py-6 px-8',
        className
      )}
    >
      <div className="flex flex-col gap-12">{children}</div>
    </div>
  )
}
