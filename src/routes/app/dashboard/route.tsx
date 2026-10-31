import { BreadCrumbs } from '#/components/BreadCrumbs'
import { authUserCheck } from '#/lib/auth'
import cn from '#/lib/cn'
import { fetchHelperOpts } from '#/lib/fetch'
import {
  createFileRoute,
  isRedirect,
  Link,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import type { PropsWithChildren } from 'react'

export const Route = createFileRoute('/app/dashboard')({
  beforeLoad: async ({ context }) => {
    console.log(`From beforeLoad ${Route.fullPath}`)
    try {
      const response = await authUserCheck(context.queryClient)
      if (!response.ok) {
        context.queryClient.removeQueries({
          predicate: (query) => {
            // Extract the primary key name
            const primaryKey = query.queryKey[0]

            // Return true to invalidate everything EXCEPT this key
            return primaryKey !== 'auth'
          },
        })
        throw redirect({ to: '/app/landing' })
      }
    } catch (error) {
      if (isRedirect(error)) {
        const _redirect = error
        throw _redirect
      } else {
        context.queryClient.removeQueries()
        console.log(error)
        throw redirect({ to: '/app/landing' })
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const routeContext = Route.useRouteContext()
  const navigate = Route.useNavigate()
  async function handleLogout() {
    try {
      const response = await fetchHelperOpts({
        path: '/auth/users/logout',
        method: 'POST',
        csrf: 'user',
      })
      if (!response.ok) {
        const message = (await response.json()).error
        throw new Error(`Error happened status: ${response.status}, ${message}`)
      }

      routeContext.queryClient.removeQueries()
      navigate({ to: '/app/landing', replace: true, reloadDocument: false })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex h-dvh">
      <div className="flex-2 min-w-30 max-w-46 flex border-r border-solid border-gray-200 bg-white">
        <div className="w-full flex flex-col justify-between">
          <div className="h-20 shrink-0 p-2 border-b border-solid border-gray-200">
            <span className="text-lg font-bold">Apotek 6 Sepuluh</span>
          </div>
          <div className="flex-1 min-h-20 overflow-auto">
            <Link to="/app/dashboard/home">
              {({ isActive }) => <NavItem label="Home" isActive={isActive} />}
            </Link>
            <Link to="/app/dashboard/master-produk">
              {({ isActive }) => (
                <NavItem label="Master Produk" isActive={isActive} />
              )}
            </Link>
            <Link to="/app/dashboard/penjualan">
              {({ isActive }) => (
                <NavItem label="Penjualan" isActive={isActive} />
              )}
            </Link>
          </div>
          <div className="h-20 shrink-0 p-2 border-t border-solid border-gray-200">
            <div className="font-bold">daniihza</div>
            <button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="flex-9 p-3">
        <BreadCrumbs />
        <Outlet />
      </div>
    </div>
  )
}

function NavItem(
  props: PropsWithChildren<{ label: string; isActive?: boolean }>,
) {
  const baseClass = cn('p-2 bg-white hover:bg-gray-100 cursor-pointer')
  return (
    <div
      className={cn(baseClass, {
        'bg-green-100 text-green-600 font-medium': props.isActive,
      })}
    >
      {props.label}
    </div>
  )
}
