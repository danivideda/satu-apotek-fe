import cn from '#/lib/cn'
import { LogOutIcon } from 'lucide-react'
import { useState, type ReactNode } from 'react'

const navItems = [
  { href: '#ringkasan', label: 'Ringkasan' },
  { href: '#daftar-obat', label: 'Daftar obat' },
  { href: '#penjualan', label: 'Penjualan' },
  { href: '#stok', label: 'Stok menipis' },
]

export function DashboardShell({
  onLogout,
  children,
}: {
  onLogout: () => void
  children: ReactNode
}) {
  const [active, setActive] = useState('#ringkasan')

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-sm">
        <div>
          <div className="text-xl">Satu Apotek</div>
          <div className="text-sm font-light text-gray-500">
            Dashboard kasir
          </div>
        </div>
        <button
          type="button"
          className="cursor-pointer text-sm text-gray-500 hover:text-black"
          onClick={onLogout}
        >
          Logout <LogOutIcon className="inline" size={18} />
        </button>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <nav className="flex gap-1 overflow-x-auto border-b border-gray-100 px-3 py-2 md:w-52 md:shrink-0 md:flex-col md:border-r md:border-b-0 md:px-3 md:py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActive(item.href)}
              className={cn(
                'rounded-full px-3 py-2 text-sm whitespace-nowrap text-gray-500 hover:bg-muted-primary hover:text-black',
                {
                  'bg-primary text-white hover:bg-primary hover:text-white':
                    active === item.href,
                },
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <main className="min-w-0 flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
