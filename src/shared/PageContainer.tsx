import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Separator } from '.'

export const PageContainer = ({
  children,
  className,
  title,
  action
}: {
  children: ReactNode
  className?: string
  title: string
  action?: ReactNode
}) => {
  return (
    <div
      className={cn(
        'bg-background flex h-screen overflow-auto w-full min-h-screen py-6 px-8',
        className
      )}
    >
      <div className="flex flex-col gap-12">
        <div className="flex w-full items-start justify-between p-0">
          <h1 className="font-display text-4xl font-bold">{title}</h1>
          <div>{action}</div>
        </div>
        <Separator className="h-0.5" />
        <div>{children}</div>
      </div>
    </div>
  )
}
