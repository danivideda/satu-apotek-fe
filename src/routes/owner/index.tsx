import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/')({
  beforeLoad: () => {
    throw redirect({ to: '/login' })
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <></>
}
