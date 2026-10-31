import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/dashboard/home' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Redirecting..</div>
}
