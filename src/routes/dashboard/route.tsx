import { API_URL } from '#/constants'
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'
import { NavBar } from './-components/NavBar'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    console.log('from dashboard')
    try {
      const response = await fetch(`${API_URL}/auth/owners/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      if (!response.ok) {
        throw redirect({ to: '/login' })
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
  loader: () => {console.log("from loader dashboard")},
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex min-h-screen">
      <NavBar />
      <div className="flex-8">
        <Outlet />
      </div>
    </div>
  )
}
