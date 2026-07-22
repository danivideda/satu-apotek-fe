import cn from '#/lib/cn'
import { fetchHelper } from '#/lib/fetch'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { z } from 'zod'

export const Route = createFileRoute('/_owner/dashboard/pharmacies/')({
  loader: ({ context }) =>
    // context.queryClient.ensureQueryData(pharmaciesQueryOptions),
    context.queryClient.fetchQuery(pharmaciesQueryOptions),
  component: RouteComponent,
  pendingComponent: () => <div>Loading pharmacies...</div>
})

function RouteComponent() {
  const { data, status } = useQuery(pharmaciesQueryOptions)
  if (status === 'error') return <div>Something went wrong...</div>
  if (status === 'pending') return <div>Pending data...</div>

  return (
    <>
      <div className="flex flex-row flex-1 gap-2">
        <section className="flex flex-col justify-center flex-1 p-4 text-right text-3xl">
          <span className="font-light">
            Pilih <span className="font-normal text-green-600">Apotek</span>{' '}
            yang anda kelola
          </span>
        </section>
        <section className="flex flex-col p-4 flex-1">
          <div>
            {data.map((pharmacy, index) => (
              <Link
                key={pharmacy.app_id}
                to="/dashboard/pharmacies/$appID"
                params={{ appID: pharmacy.app_id }}
                preload="intent"
              >
                <div
                  className={cn(
                    'flex flex-row gap-3 p-2 py-4',
                    'border-b border-gray-200 last:border-dashed',
                    'hover:bg-green-50 cursor-pointer transition-colors ease-in-out',
                  )}
                >
                  <div className="flex flex-col justify-center text-gray-800">
                    <div>{index + 1}</div>
                  </div>
                  <div>
                    <div className="text-black font-semibold">
                      {pharmacy.name}
                    </div>
                    <div className="text-gray-500 tracking-tight font-light">
                      {pharmacy.address}
                    </div>
                    <div className="text-sm text-gray-500 tracking-tight font-light">
                      {pharmacy.app_id}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-center h-14 border-b border-dashed border-gray-200 hover:bg-muted-primary cursor-pointer transition-colors ease-in-out">
            <span className="text-center text-green-600">Tambah apotek</span>
          </div>
        </section>
      </div>
    </>
  )
}

export const PharmacySchema = z.object({
  app_id: z.string(),
  name: z.string(),
  address: z.string(),
})
const ResponseSchema = z.object({
  data: z.array(PharmacySchema),
})

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const pharmaciesQueryOptions = queryOptions({
  queryKey: ['pharmacies'],
  queryFn: async () => {
    console.log('query fn from /pharmacies loader')
    const response = await fetchHelper('/owner/pharmacies')
    if (!response.ok) {
      throw new Error(`Bad response, status: ${response.status}`)
    }
    const { data } = ResponseSchema.parse(await response.json())
    return data
  },
  staleTime: 5000,
})
