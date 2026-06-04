import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen">
      <nav className="flex-1 bg-gray-50 border border-solid">
        <div>Homepage</div>
        <div>Profile</div>
      </nav>
      <div className="flex-8">
        <Outlet />
      </div>
    </div>
  )
}
