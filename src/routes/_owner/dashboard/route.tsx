import { createFileRoute, Outlet } from '@tanstack/react-router'
import { NavBar } from './-components/NavBar'
import { BreadCrumbs } from './-components/BreadCrumbs'

export const Route = createFileRoute('/_owner/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavBar />
      <div className="flex-1 container mx-auto">
        <h1 className="mt-4 p-4 text-2xl border-b border-gray-200 text-gray-500 font-light">
          <BreadCrumbs />
        </h1>
        <Outlet />
      </div>
    </div>
  )
}
