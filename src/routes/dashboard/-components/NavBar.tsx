import { API_URL } from '#/constants'
import cn from '#/lib/cn'
import {
  Link,
  useNavigate,
  type ValidateLinkOptions,
} from '@tanstack/react-router'
import { parseCookie } from 'cookie'
import type React from 'react'

export function NavBar() {
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const csrfToken = parseCookie(document.cookie)['owner_csrf']
      if (csrfToken == undefined) {
        throw new Error('CSRF Token does not exist')
      }

      const response = await fetch(`${API_URL}/auth/owners/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken ?? '',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        throw new Error(`Error happened status: ${response.status}`)
      }
      navigate({ to: '/login' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="flex-1 bg-gray-50 border border-solid">
      <NavLink label="Profile" linkOptions={{ to: '/dashboard/profile' }} />
      <NavLink
        label="Pharmacies"
        linkOptions={{ to: '/dashboard/pharmacies' }}
      />
      <button className="cursor-pointer" onClick={handleLogout}>
        Logout
      </button>
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
          className={cn('bg-blue-100 p-2 w-full border-b border-solid', {
            'bg-red-100': isActive,
          })}
        >
          {label}
        </div>
      )}
    </Link>
  )
}
