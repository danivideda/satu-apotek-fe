import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/pharmacies')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_owner/dashboard/pharmacies"!</div>
}
