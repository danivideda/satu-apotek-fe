import { fetchHelper } from '#/lib/fetch'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import z from 'zod'
import { PharmacySchema } from '.'

export const Route = createFileRoute('/_owner/dashboard/pharmacies/$appID')({
  staticData: {
    breadcrumb: (match) => {
      return { label: match.loaderData.data.name, path: match.pathname }
    },
  },
  loader: async ({ context, params }) =>
    context.queryClient.fetchQuery(pharmacyDetailQueryOptions(params.appID)),
  component: RouteComponent,
})

function RouteComponent() {
  const responseJSON = Route.useLoaderData()
  const data = responseJSON.data

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

const pharmacyDetailQueryOptions = (appID: string) =>
  queryOptions({
    queryKey: ['pharmacies', appID],
    queryFn: async () => {
      console.log(`query fn from /pharmacies/${appID} loader`)
      const response = await fetchHelper(`/owner/pharmacies/${appID}`)
      if (!response.ok) {
        throw new Error(`Bad response, status: ${response.status}`)
      }
      const responseJSON = ResponseSchema.parse(await response.json())
      return responseJSON
    },
    staleTime: 5_000,
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
