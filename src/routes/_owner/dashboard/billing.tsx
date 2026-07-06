import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/billing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_owner/dashboard/billing"!</div>
}
