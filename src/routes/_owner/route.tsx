import { authOwnerCheck } from '#/lib/auth'
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_owner')({
  beforeLoad: async ({ context }) => {
    try {
      const response = await authOwnerCheck(context.queryClient)
      if (!response.ok) {
        context.queryClient.invalidateQueries()
        throw redirect({ to: '/login', search: { redirect: location.href } })
      }
      return {
        authOwner: "Nama Owner Pengguna"
      }
    } catch (error) {
      if (isRedirect(error)) {
        const _redirect = error
        throw _redirect
      } else {
        context.queryClient.invalidateQueries()
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
