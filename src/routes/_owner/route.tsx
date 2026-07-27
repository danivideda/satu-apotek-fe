import { authOwnerCheck } from '#/lib/auth'
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_owner')({
  beforeLoad: async ({ context }) => {
    console.log('From beforeLoad _owner')
    try {
      const response = await authOwnerCheck(context.queryClient)
      if (!response.ok) {
        context.queryClient.removeQueries({
          predicate: (query) => {
            // Extract the primary key name
            const primaryKey = query.queryKey[0]

            // Return true to invalidate everything EXCEPT this key
            return primaryKey !== 'auth'
          },
        })
        throw redirect({ to: '/login' })
      }
      return {
        authOwner: 'Nama Owner Pengguna',
      }
    } catch (error) {
      if (isRedirect(error)) {
        const _redirect = error
        throw _redirect
      } else {
        context.queryClient.removeQueries()
        console.log(error)
        throw redirect({ to: '/' })
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <Outlet />
}
