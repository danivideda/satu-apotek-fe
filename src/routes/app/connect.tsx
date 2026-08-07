import { authPharmacyCheck } from '#/lib/auth'
import { fetchHelper } from '#/lib/fetch'
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'
import { useRef } from 'react'

export const Route = createFileRoute('/app/connect')({
  beforeLoad: async ({ context }) => {
    // Check if Pharmacy is already connected
    try {
      const response = await authPharmacyCheck(context.queryClient)
      if (response.ok) {
        throw redirect({ to: '/app/landing' })
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
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = Route.useNavigate()
  const context = Route.useRouteContext()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputVal = inputRef.current?.value
    const response = await fetchHelper('/auth/pharmacies/connect', 'POST', {
      code: inputVal,
    })

    if (!response.ok) {
      console.log(`Bad request, status: ${response.status}`)
    } else {
      context.queryClient.removeQueries()
      console.log('runs login navigate')
      navigate({ to: '/app/landing' })
    }
  }

  return (
    <div className="container mx-auto">
      <div>Connect Apotek with code:</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
        <div className="flex flex-row gap-1.5">
          <input
            ref={inputRef}
            className="flex-5 border border-black rounded-lg p-4"
            name="code"
            placeholder="input your apotek code"
          />
          <button
            className="flex-1 p-2 cursor-pointer bg-white text-black hover:bg-black hover:text-white border border-black rounded-lg"
            type="submit"
          >
            Connect
          </button>
        </div>
      </form>
    </div>
  )
}
