import { authOwnerCheck } from '#/lib/auth'
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  beforeLoad: async ({ context }) => {
    console.log(`from beforeLoad public routes`)
    try {
      const response = await authOwnerCheck(context.queryClient)
      if (response.ok) {
        throw redirect({ to: '/dashboard', replace: true })
      }
      return { response }
    } catch (error) {
      if (isRedirect(error)) {
        const _redirect = error
        throw _redirect
      } else {
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
