import cn from '#/lib/cn'
import { createFileRoute } from '@tanstack/react-router'
import {
  obatPlaceholder,
  penjualanPlaceholder,
  ringkasanPlaceholder,
  rupiah,
  STOK_MENIPIS_BATAS,
} from './-placeholder'

export const Route = createFileRoute('/app/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const stokMenipis = obatPlaceholder.filter(
    (obat) => obat.stok <= STOK_MENIPIS_BATAS,
  )

  const stats = [
    {
      label: 'Penjualan hari ini',
      value: rupiah.format(ringkasanPlaceholder.penjualanHariIni),
      hint: 'Termasuk transaksi pending',
    },
    {
      label: 'Transaksi',
      value: String(ringkasanPlaceholder.transaksi),
      hint: 'Contoh hari ini',
    },
    {
      label: 'Obat aktif',
      value: String(ringkasanPlaceholder.obatAktif),
      hint: 'Di daftar contoh',
    },
    {
      label: 'Stok menipis',
      value: String(ringkasanPlaceholder.stokMenipis),
      hint: `Stok ≤ ${STOK_MENIPIS_BATAS}`,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-light text-gray-500">
          Ringkasan <span className="font-normal text-green-600">hari ini</span>
        </h1>
        <p className="mt-1 text-sm font-light text-gray-400">
          Data contoh. Belum terhubung ke API.
        </p>
      </div>

      <section id="ringkasan" className="scroll-mt-20">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <div className="text-sm font-light text-gray-500">
                {stat.label}
              </div>
              <div className="mt-1 text-2xl">{stat.value}</div>
              <div className="mt-1 text-xs font-light text-gray-400">
                {stat.hint}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="daftar-obat" className="scroll-mt-20">
        <h2 className="mb-3 text-2xl font-light text-gray-500">
          Daftar <span className="font-normal text-green-600">obat</span>
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-normal">Kode</th>
                <th className="px-4 py-3 font-normal">Nama</th>
                <th className="px-4 py-3 font-normal">Satuan</th>
                <th className="px-4 py-3 font-normal">Stok</th>
                <th className="px-4 py-3 font-normal">Harga</th>
              </tr>
            </thead>
            <tbody>
              {obatPlaceholder.map((obat) => {
                const menipis = obat.stok <= STOK_MENIPIS_BATAS
                return (
                  <tr
                    key={obat.kode}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3 font-light text-gray-500">
                      {obat.kode}
                    </td>
                    <td className="px-4 py-3">{obat.nama}</td>
                    <td className="px-4 py-3 font-light text-gray-500">
                      {obat.satuan}
                    </td>
                    <td
                      className={cn('px-4 py-3', {
                        'text-amber-700': menipis,
                      })}
                    >
                      {obat.stok}
                    </td>
                    <td className="px-4 py-3">{rupiah.format(obat.harga)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="penjualan" className="scroll-mt-20">
        <h2 className="mb-3 text-2xl font-light text-gray-500">
          <span className="font-normal text-green-600">Penjualan</span> terbaru
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-gray-200 text-gray-500">
              <tr>
                <th className="px-4 py-3 font-normal">No</th>
                <th className="px-4 py-3 font-normal">Waktu</th>
                <th className="px-4 py-3 font-normal">Kasir</th>
                <th className="px-4 py-3 font-normal">Item</th>
                <th className="px-4 py-3 font-normal">Total</th>
                <th className="px-4 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {penjualanPlaceholder.map((row) => (
                <tr
                  key={row.nomor}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-4 py-3 font-light text-gray-500">
                    {row.nomor}
                  </td>
                  <td className="px-4 py-3">{row.waktu}</td>
                  <td className="px-4 py-3">{row.kasir}</td>
                  <td className="px-4 py-3">{row.item}</td>
                  <td className="px-4 py-3">{rupiah.format(row.total)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn('rounded-full px-2 py-0.5 text-xs', {
                        'bg-muted-primary text-green-700':
                          row.status === 'Lunas',
                        'bg-gray-100 text-gray-500': row.status === 'Pending',
                      })}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="stok" className="scroll-mt-20">
        <h2 className="mb-3 text-2xl font-light text-gray-500">
          Stok <span className="font-normal text-green-600">menipis</span>
        </h2>
        <div className="flex flex-col">
          {stokMenipis.map((obat) => (
            <div
              key={obat.kode}
              className="flex items-center justify-between border-b border-gray-200 py-3 last:border-dashed"
            >
              <div>
                <div>{obat.nama}</div>
                <div className="text-sm font-light text-gray-500">
                  {obat.kode}
                </div>
              </div>
              <div className="text-amber-700">{obat.stok} tersisa</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
