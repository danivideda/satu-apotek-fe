import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/master-produk')({
  component: RouteComponent,
  loader: () => {
    return { label: "Master Obat"}
  },
})

function RouteComponent() {
  return <Outlet />
}
