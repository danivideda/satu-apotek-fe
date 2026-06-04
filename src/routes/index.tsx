import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Satu Apotek v0.1</h1>
      <p className="mt-4 text-lg">
        <Link to="/login" className="block">
          Login
        </Link>
        <Link to="/register" className="block">
          register
        </Link>
      </p>
    </div>
  )
}
