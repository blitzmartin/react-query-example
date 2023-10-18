import { Outlet } from 'react-router'
import { queryClient } from './react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/shared'


export const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  )
}
