import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/master-produk/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <div>Selamat datang di Master Obat</div>
      <Link to="/app/dashboard/master-produk/add">Tambah obat</Link>
    </>
  )
}
