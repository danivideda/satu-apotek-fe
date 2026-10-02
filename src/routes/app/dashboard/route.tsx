import { authUserCheck } from '#/lib/auth'
import { fetchHelperOpts } from '#/lib/fetch'
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { DashboardShell } from './-components/DashboardShell'

export const Route = createFileRoute('/app/dashboard')({
  beforeLoad: async ({ context }) => {
    console.log(`From beforeLoad ${Route.fullPath}`)
    try {
      const response = await authUserCheck(context.queryClient)
      if (!response.ok) {
        context.queryClient.removeQueries({
          predicate: (query) => {
            const primaryKey = query.queryKey[0]
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
    <DashboardShell onLogout={handleLogout}>
      <Outlet />
    </DashboardShell>
  )
}
