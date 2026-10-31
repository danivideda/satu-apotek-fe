import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/penjualan/')({
  component: RouteComponent,
  loader: () => {
    return { label: 'Penjualan' }
  },
})

function RouteComponent() {
  return <div>Hello "/app/dashboard/penjualan/"!</div>
}
