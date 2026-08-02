import { authPharmacyCheck } from '#/lib/auth'
import { fetchHelper } from '#/lib/fetch'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'
import z from 'zod'

export const Route = createFileRoute('/app/landing')({
  beforeLoad: async ({ context }) => {
    console.log('From beforeLoad app/landing')
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
  loader: async ({ context }) => {
    context.queryClient.fetchQuery(pharmacyLandingQueryOptions)
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { data: response, status } = useQuery(pharmacyLandingQueryOptions)
  if (status === 'pending') return <div>Pending...</div>
  if (status === 'error') return <div>Something went wrong...</div>

  const data = response.data
  return (
    <div className='container mx-auto'>
      <div className="flex flex-col">
        <div>Selamat datang di {data.name}</div>
        <div>
          <h1>Masuk sebagai</h1>
          {data.users.map((user, index) => (
            <div key={`${user.username}+${index}`}>
              Username: {user.username}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const pharmacyLandingQueryOptions = queryOptions({
  queryKey: ['pharmacy', 'landing'],
  queryFn: async () => {
    const response = await fetchHelper('/pharmacy/landing')
    if (!response.ok)
      throw new Error(`Bad response, status: ${response.status}`)

    const data = PharmacyLandingResponseSchema.parse(await response.json())
    return data
  },
})

const PharmacyLandingResponseSchema = z.object({
  data: z.object({
    name: z.string(),
    users: z.array(z.object({ username: z.string() })),
  }),
})
