import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BreadCrumbs } from '../-components/BreadCrumbs'

export const Route = createFileRoute('/_owner/dashboard/pharmacies')({
  staticData: { breadcrumb: (match) => ({label: 'Pengaturan Apotek', path: match.pathname}) },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col px-4">
      <h1 className="mt-4 p-4 text-2xl border-b border-gray-200 text-gray-500 font-light">
        <BreadCrumbs />
      </h1>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}
