import { Link, type ValidateLinkOptions } from '@tanstack/react-router'
import type React from 'react'

export function NavBar() {
  return (
    <nav className="flex-1 bg-gray-50 border border-solid">
      <NavLink label="Profile" linkOptions={{ to: '/dashboard/profile' }} />
      <NavLink
        label="Pharmacies"
        linkOptions={{ to: '/dashboard/pharmacies' }}
      />
    </nav>
  )
}

function NavLink({
  label,
  linkOptions,
}: {
  label: string
  linkOptions: ValidateLinkOptions
}): React.ReactNode {
  return (
    <Link {...linkOptions}>
      {({ isActive }) => (
        <div
          className={`${isActive ? 'bg-red-200' : 'bg-blue-100'} p-2 w-full border border-solid`}
        >
          {label}
        </div>
      )}
    </Link>
  )
}
