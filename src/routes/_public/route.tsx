import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/_public')({
  beforeLoad: async () => {
    const apiUrl = import.meta.env.VITE_API_URL
    try {
      const response = await fetch(`${apiUrl}/auth/owners/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (response.ok) {
        throw redirect({ to: '/dashboard', replace: true })
      }
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
