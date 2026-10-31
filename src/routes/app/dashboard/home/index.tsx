import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/home/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/dashboard/home/"!</div>
}
