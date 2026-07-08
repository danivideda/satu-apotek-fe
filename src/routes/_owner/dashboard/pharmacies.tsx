import { fetchHelper } from '#/lib/fetch'
import { queryOptions } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_owner/dashboard/pharmacies')({
  loader: async ({ context }) =>
    context.queryClient.fetchQuery(pharmaciesQueryOptions),
  component: RouteComponent,
})

function RouteComponent() {
  const data = Route.useLoaderData()

  return (
    <div className="flex flex-col px-4">
      <h1 className="mt-4 text-4xl text-black">Apotek</h1>
      <div className="flex flex-row flex-1 gap-2 mt-4">
        <section className="flex flex-col justify-center flex-1 p-4 text-right text-3xl">
          <span className='font-light'>Pilih Apotek yang anda kelola</span>
        </section>
        <section className="flex flex-col p-4 flex-1">
          {data.map((pharmacy, index) => (
            <div
              key={pharmacy.app_id}
              className="flex flex-row gap-3 p-2 py-4 border-b border-gray-200"
            >
              <div className='flex flex-col justify-center text-gray-800'><div>{index + 1}</div></div>
              <div>
                <div className='text-green-600 font-semibold'>{pharmacy.name}</div>
                <div className='text-gray-500 tracking-tight font-light'>{pharmacy.address}</div>
                <div className='text-sm text-gray-500 tracking-tight font-light'>{pharmacy.app_id}</div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

const PharmacySchema = z.object({
  app_id: z.string(),
  name: z.string(),
  address: z.string(),
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
