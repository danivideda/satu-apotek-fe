import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/master-produk/add')({
  component: RouteComponent,
  loader: () => {
    return { label: 'Tambah Obat' }
  },
})

function RouteComponent() {
  return <div>Hello "/app/dashboard/master-products/add"!</div>
}
