import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavBar2 } from './-components/NavBar2'

export const Route = createFileRoute('/_owner/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <NavBar /> */}
      <NavBar2 />
      <div className="flex-8">
        <Outlet />
      </div>
    </div>
  )
}
