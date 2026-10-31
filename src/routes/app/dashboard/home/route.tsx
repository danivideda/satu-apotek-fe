import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/home')({
  component: RouteComponent,
  loader: () => ({label: "Home"})
})

function RouteComponent() {
  return <Outlet />
}
