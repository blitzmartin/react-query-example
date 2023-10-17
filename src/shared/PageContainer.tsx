import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const PageContainer = ({
  children,
  className,
  title
}: {
  children: ReactNode
  className?: string
  title?: ReactNode
}) => {
  return (
    <div
      className={cn(
        'flex gap-4 h-full w-full flex-col px-20 py-8  items-center min-h-screen',
        className
      )}
    >
      {title && <PageTitle title={title} />}
      <div className="flex-initial"> {children}</div>
    </div>
  )
}

export const PageTitle = ({ title }: { title: ReactNode }) => {
  return <h1 className="text-2xl font-extrabold">{title}</h1>
}
