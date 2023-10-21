import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="font-display text-8xl font-extrabold">404</div>
      <div>PAGE NOT FOUND</div>
      <Link to="/" className="text-sm hover:text-primary">
        Back to homepage
      </Link>
    </div>
  )
}
