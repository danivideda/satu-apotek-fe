import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/pharmacies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/pharmacies"!</div>
}
