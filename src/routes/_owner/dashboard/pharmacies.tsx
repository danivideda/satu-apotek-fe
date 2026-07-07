import { fetchHelper } from '#/lib/fetch'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const PharmacySchema = z.object({
  app_id: z.string(),
  name: z.string(),
  created_at: z.iso.datetime({ offset: true }),
  updated_at: z.iso.datetime({ offset: true }),
})
const ResponseSchema = z.object({
  data: z.array(PharmacySchema),
})

const pharmaciesQueryOptions = queryOptions({
  queryKey: ['pharmacies'],
  queryFn: async () => {
    console.log('query fn from /pharmacies loader')
    const response = await fetchHelper('/pharmacies')
    if (!response.ok) {
      throw new Error(`Bad response, status: ${response.status}`)
    }
    const { data } = ResponseSchema.parse(await response.json())
    return data
  },
  staleTime: 5_000,
})

export const Route = createFileRoute('/_owner/dashboard/pharmacies')({
  loader: async ({ context }) =>
    context.queryClient.fetchQuery(pharmaciesQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="flex flex-col">
      <div>Hello "/_owner/dashboard/pharmacies"!</div>
      {data.map((pharmacy, index) => (
        <div key={index} className="mt-3 p-2 rounded-lg border border-black">
          <div>App ID: {pharmacy.app_id}</div>
          <div>Nama Apotek: {pharmacy.name}</div>
        </div>
      ))}
    </div>
  )
}
