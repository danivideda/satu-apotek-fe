import { authUserCheck } from '#/lib/auth'
import { createFileRoute, isRedirect, Outlet, redirect } from '@tanstack/react-router'

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
  return <Outlet />
}
