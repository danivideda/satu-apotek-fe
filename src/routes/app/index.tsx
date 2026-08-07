import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app/')({
  beforeLoad: () => {
    throw redirect({ to: '/app/landing' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
