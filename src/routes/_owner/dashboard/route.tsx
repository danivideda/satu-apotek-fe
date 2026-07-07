import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from './-components/NavBar'

export const Route = createFileRoute('/_owner/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <div className="flex-1 container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}
