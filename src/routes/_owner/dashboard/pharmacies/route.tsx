import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/pharmacies')({
  loader: () => ({
    label: 'Pengaturan Apotek',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col px-4">
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
