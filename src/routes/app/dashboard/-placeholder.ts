export type ObatPlaceholder = {
  kode: string
  nama: string
  satuan: string
  stok: number
  harga: number
}

export type PenjualanPlaceholder = {
  nomor: string
  waktu: string
  kasir: string
  item: number
  total: number
  status: 'Lunas' | 'Pending'
}

export const STOK_MENIPIS_BATAS = 20

export const obatPlaceholder: ObatPlaceholder[] = [
  {
    kode: 'OB-001',
    nama: 'Paracetamol 500 mg',
    satuan: 'Tablet',
    stok: 240,
    harga: 1_500,
  },
  {
    kode: 'OB-014',
    nama: 'Amoxicillin 500 mg',
    satuan: 'Kapsul',
    stok: 18,
    harga: 3_200,
  },
  {
    kode: 'OB-022',
    nama: 'OBH Combi',
    satuan: 'Botol',
    stok: 42,
    harga: 18_500,
  },
  {
    kode: 'OB-031',
    nama: 'Vitamin C 1000 mg',
    satuan: 'Tablet',
    stok: 9,
    harga: 2_000,
  },
  {
    kode: 'OB-048',
    nama: 'Antasida Doen',
    satuan: 'Tablet',
    stok: 86,
    harga: 1_200,
  },
  {
    kode: 'OB-055',
    nama: 'Oralit',
    satuan: 'Sachet',
    stok: 12,
    harga: 1_000,
  },
]

export const penjualanPlaceholder: PenjualanPlaceholder[] = [
  {
    nomor: 'PJ-1042',
    waktu: '09:14',
    kasir: 'Sari',
    item: 3,
    total: 45_000,
    status: 'Lunas',
  },
  {
    nomor: 'PJ-1041',
    waktu: '08:52',
    kasir: 'Budi',
    item: 1,
    total: 18_500,
    status: 'Lunas',
  },
  {
    nomor: 'PJ-1040',
    waktu: '08:31',
    kasir: 'Sari',
    item: 5,
    total: 72_000,
    status: 'Pending',
  },
  {
    nomor: 'PJ-1039',
    waktu: '08:05',
    kasir: 'Budi',
    item: 2,
    total: 12_500,
    status: 'Lunas',
  },
]

export const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export const ringkasanPlaceholder = {
  penjualanHariIni: penjualanPlaceholder.reduce(
    (sum, row) => sum + row.total,
    0,
  ),
  transaksi: penjualanPlaceholder.length,
  obatAktif: obatPlaceholder.length,
  stokMenipis: obatPlaceholder.filter((row) => row.stok <= STOK_MENIPIS_BATAS)
    .length,
}
