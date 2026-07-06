import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/')({
  beforeLoad: () => {
    throw redirect({ to: '/dashboard/pharmacies' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="p-4 w-full text-center h-200">Hello "/dashboard"!</div>
}
