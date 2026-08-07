import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/dashboard/')({
  beforeLoad: () => {
    throw redirect({ to: '/owner/dashboard/pharmacies' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
