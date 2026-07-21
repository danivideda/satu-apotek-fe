import { fetchHelper } from '#/lib/fetch'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { PharmacySchema } from '.'

export const Route = createFileRoute('/_owner/dashboard/pharmacies/$appID')({
  loader: async ({ context, params }) => {
    try {
      const { data } = await context.queryClient.fetchQuery(
        pharmacyDetailQueryOptions(params.appID),
      )
      return {
        label: data.name,
      }
    } catch (error) {
      console.log(error)
      throw redirect({ to: '/dashboard/pharmacies' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useParams()
  const { status, data: response } = useQuery(
    pharmacyDetailQueryOptions(params.appID),
  )
  if (status === 'pending') return <div>Loading status: pending...</div>
  if (status === 'error') return <div>Something went wrong...</div>

  const data = response.data

  return (
    <div>
      <div>AppID: {data.app_id}</div>
      <div>Name: {data.name}</div>
      <div>
        Users:{' '}
        {data.users.map((item, index) => (
          <div key={item.id}>
            {index + 1}. id: {item.id}, username: {item.username}
          </div>
        ))}
      </div>
    </div>
  )
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const pharmacyDetailQueryOptions = (appID: string) =>
  queryOptions({
    queryKey: ['pharmacies', appID],
    queryFn: async () => {
      console.log(`query fn from /pharmacies/${appID} loader`)
      // await delay(5000)
      const response = await fetchHelper(`/owner/pharmacies/${appID}`)
      if (!response.ok) {
        throw new Error(`Bad response, status: ${response.status}`)
      }
      const responseJSON = ResponseSchema.parse(await response.json())
      return responseJSON
    },
    staleTime: 5000,
  })

const ResponseSchema = z.object({
  data: PharmacySchema.extend({
    created_at: z.iso.datetime({ offset: true }),
    updated_at: z.iso.datetime({ offset: true }),
    users: z.array(
      z.object({
        id: z.number(),
        username: z.string(),
      }),
    ),
  }),
})
