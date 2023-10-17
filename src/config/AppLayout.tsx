import { Outlet } from 'react-router'
import { queryClient } from './react-query'
import { QueryClientProvider } from '@tanstack/react-query'


export const AppLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      </QueryClientProvider>
  )
}
