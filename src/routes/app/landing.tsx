import { authPharmacyCheck } from '#/lib/auth'
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/app/landing')({
  beforeLoad: async ({ context }) => {
    console.log('From beforeLoad landing.route')
    try {
      const response = await authPharmacyCheck(context.queryClient)
      if (!response.ok) {
        context.queryClient.removeQueries({
          predicate: (query) => {
            // Extract the primary key name
            const primaryKey = query.queryKey[0]

            // Return true to invalidate everything EXCEPT this key
            return primaryKey !== 'auth'
          },
        })
        throw redirect({ to: '/app/connect' })
      }
    } catch (error) {
      if (isRedirect(error)) {
        const _redirect = error
        throw _redirect
      } else {
        context.queryClient.removeQueries()
        console.log(error)
        throw redirect({ to: '/app/connect' })
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/landing"!</div>
}
