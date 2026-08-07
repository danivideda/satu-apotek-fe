import { fetchHelperOpts } from '#/lib/fetch'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard/')({
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
    <div>
      Hello "/app/dashboard/"!
      <div>
        <button className="cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
