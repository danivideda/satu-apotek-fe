import {
  Link,
  type RegisteredRouter,
  type ValidateLinkOptions,
} from '@tanstack/react-router'
import type React from 'react'

export function NavBar() {
  return (
    <nav className="flex-1 bg-gray-50 border border-solid">
      <NavLink title="Profile" linkOptions={{ to: '/dashboard/profile' }} />
      <NavLink
        title="Pharmacies"
        linkOptions={{ to: '/dashboard/pharmacies' }}
      />
    </nav>
  )
}

interface NavLinkProps<
  TRouter extends RegisteredRouter = RegisteredRouter,
  TOptions = unknown,
> {
  title: string
  linkOptions: ValidateLinkOptions<TRouter, TOptions>
}

function NavLink(props: NavLinkProps): React.ReactNode {
  return (
    <Link {...props.linkOptions}>
      {({ isActive }) => (
        <div
          className={`${isActive ? 'bg-red-200' : 'bg-blue-100'} p-2 w-full border border-solid`}
        >
          {props.title}
        </div>
      )}
    </Link>
  )
}
