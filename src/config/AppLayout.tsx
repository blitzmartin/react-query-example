import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  QueryStateManager,
  Separator,
  Toaster
} from '@/shared'
import { QueryClientProvider } from '@tanstack/react-query'
import { Outlet } from 'react-router'
import { useUserDetails } from './loggedUser'
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

const Sidebar = () => {
  const userDetailsQuery = useUserDetails()
  return (
    <QueryStateManager
      query={userDetailsQuery}
      renderOnError={<p>Error</p>}
      renderOnLoading={<p>Loading</p>}
      renderOnSuccess={(userData) => (
        <div className="flex h-screen min-w-[240px] flex-col items-center justify-start gap-16 bg-primary px-6  pb-4 pt-8">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&q=80&w=1160&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <div className="flex h-full w-full flex-col items-start justify-start gap-6">
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <h2 className="font-display text-xl text-background">USERNAME</h2>
              <Separator className="h-0.5 bg-background" />
              <p className="text-sm">{userData[0].username}</p>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <h2 className="font-display text-xl text-background">
                FIRST & LAST NAME
              </h2>
              <Separator className="h-0.5 bg-background" />
              <p className="text-sm">{userData[0].name}</p>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <h2 className="font-display text-xl text-background">EMAIL</h2>
              <Separator className="h-0.5 bg-background" />
              <p className="text-sm">{userData[0].email}</p>
            </div>
            <div className="flex w-full flex-col items-start justify-start gap-1">
              <h2 className="font-display text-xl text-background">CITY</h2>
              <Separator className="h-0.5 bg-background" />
              <p className="text-sm">{userData[0].address.city}</p>
            </div>
          </div>
          <div className="flex w-full items-center justify-start">
            <Button variant="outline">Logout</Button>
          </div>
        </div>
      )}
    />
  )
}
