import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/owner/dashboard/billing')({
  loader: () => ({
    label: 'Pengaturan Billing',
  }),
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_owner/dashboard/billing"!</div>
}
