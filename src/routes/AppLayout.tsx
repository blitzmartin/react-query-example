import { ColorPreferenceProvider } from '@/providers/ColorPreferenceProvider'
import { Footer } from '@/shared/footer'
import { Header } from '@/shared/header'
import { Outlet } from 'react-router'

export const AppLayout = () => {
  return (
    <ColorPreferenceProvider>
      <Header />
      <Outlet />
      <Footer />
    </ColorPreferenceProvider>
  )
}
