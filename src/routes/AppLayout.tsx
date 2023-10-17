import { Header } from '@/shared/header'
import { Outlet } from 'react-router'

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
