import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './routes/react-router'

export const App = () => <RouterProvider router={router} />
