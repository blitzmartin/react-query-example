import { Sidebar, Toaster } from '@/shared'
import { QueryClientProvider } from '@tanstack/react-query'

import { Outlet } from 'react-router'
import { queryClient } from './react-query'

export const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-start gap-0">
        <Sidebar />
        <Outlet />
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}
