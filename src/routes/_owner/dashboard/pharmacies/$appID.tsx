import { fetchHelper } from '#/lib/fetch'
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { PharmacySchema } from '.'
import { Edit2Icon } from 'lucide-react'
import cn from '#/lib/cn'
import Countdown from 'react-countdown'
import { delay } from '#/lib/utils'

export const Route = createFileRoute('/_owner/dashboard/pharmacies/$appID')({
  loader: async ({ context, params }) => {
    try {
      const { data } = await context.queryClient.fetchQuery(
        pharmacyDetailQueryOptions(params.appID),
      )

      await context.queryClient.prefetchQuery(
        pharmacyCodeQueryOptions(params.appID),
      )

      return {
        label: data.name,
      }
    } catch (error) {
      console.log(error)
      context.queryClient.removeQueries()
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
    <div className="flex flex-row gap-1.5 justify-center">
      <div className="flex-1 flex flex-col gap-1.5">
        <SectionComponent label="Deskripsi Apotek">
          <DeskripsiItemComponent label="Nama" desc={data.name} />
          <DeskripsiItemComponent label="Alamat" desc={data.address} />
          <DeskripsiItemComponent
            label="AppID"
            desc={data.app_id}
            editable={false}
          />
        </SectionComponent>
        <SectionComponent label="Pengaturan User">
          <UserTableComponent>
            {data.users.map((item, index) => (
              <UserItemComponent key={item.id + index} name={item.username} />
            ))}
          </UserTableComponent>
        </SectionComponent>
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <SectionComponent label="Kode Apotek">
          <KodeApotekComponent />
        </SectionComponent>
      </div>
    </div>
  )
}

function SectionComponent({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <div>
      <div>{label}</div>
      <div className="flex flex-col justify-between gap-1.5 container p-4">
        {children}
      </div>
    </div>
  )
}

function DeskripsiItemComponent({
  label,
  desc,
  editable = true,
}: {
  label: string
  desc: string
  editable?: boolean
}) {
  return (
    <div className="flex flex-row justify-between items-center p-3 border-b border-gray-100">
      <div className="flex flex-col">
        <div className="text-green-600 text-sm font-semibold">{label}</div>
        <div className="">{desc}</div>
      </div>
      <Edit2Icon size={13} className={cn({ hidden: !editable })} />
    </div>
  )
}

function UserTableComponent({ children }: React.PropsWithChildren) {
  const thCls = cn('font-medium text-green-600 rounded-l-md p-1')

  return (
    <div>
      <table className="w-5/6">
        <thead>
          <tr className="text-black bg-white border-b border-gray-200 text-left">
            <th className={thCls}>Nama</th>
            <th className={thCls}>Password</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function UserItemComponent({ name }: { name: string }) {
  return (
    <tr className="even:bg-gray-100">
      <td className="p-2">{name}</td>
      <td className="p-2">******</td>
    </tr>
  )
}

function KodeApotekComponent() {
  const { appID } = Route.useParams()
  const mutation = useMutation({
    mutationFn: async () => {
      await delay(200)
      const response = await fetchHelper(
        `/owner/pharmacies/${appID}/code/create`,
        'POST',
      )
      if (!response.ok)
        throw new Error(`Bad response, status: ${response.status}`)

      const data = PharmacyCodeResponseSchema.parse(await response.json())
      return data
    },
    onSuccess(data, _variables, _onMutateResult, context) {
      context.client.setQueryData(pharmacyCodeQueryKey(appID), data)
    },
    onSettled(_data, _error, _variables, _onMutateResult, context) {
      context.client.invalidateQueries({
        queryKey: pharmacyCodeQueryKey(appID),
      })
    },
  })

  const { status, data: response } = useQuery(pharmacyCodeQueryOptions(appID))

  if (status === 'pending') {
    return <div>Loading status: pending...</div>
  }
  if (status === 'error') {
    return <div>Something went wrong...</div>
  }

  console.log('rendered success')
  return (
    <>
      <div>untuk install aplikasi Satu Apotek</div>
      <button
        type="button"
        className={cn('p-2 text-white rounded-lg h-10', {
          'bg-green-600 cursor-pointer': !mutation.isPending,
          'bg-green-200 cursor-progress': mutation.isPending,
        })}
        onClick={() => {
          mutation.mutate()
        }}
      >
        {mutation.isPending ? (
          <div className="h-full mx-auto aspect-square animate-spin rounded-full border-4 border-green-600 border-t-transparent" />
        ) : (
          'Get Code'
        )}
      </button>
      {response.error && (
        <div className="p-4 text-center border-b border-dashed text-gray-300">
          kode apotek
        </div>
      )}
      {response.data && (
        <>
          <div className="p-4 text-center border-b border-dashed text-black text-lg font-mono">
            {response.data?.code}
          </div>
          <Countdown
            date={response.data?.expires_at}
            renderer={({ formatted, completed, api }) => {
              if (api.isStopped() && !completed) api.start()

              return (
                <div className="text-center text-gray-500">
                  {completed
                    ? `Kode expired`
                    : `${formatted.hours}:${formatted.minutes}:${formatted.seconds}`}
                </div>
              )
            }}
          />
        </>
      )}
    </>
  )
}

const pharmacyCodeQueryKey = (appID: string) => ['kode_apotek', appID, 'get']
const pharmacyCodeQueryOptions = (appID: string) =>
  queryOptions({
    queryKey: pharmacyCodeQueryKey(appID),
    queryFn: async () => {
      console.log('query fn from Get Kode Apotek')
      const response = await fetchHelper(
        `/owner/pharmacies/${appID}/code`,
        'GET',
      )
      if (!response.ok && response.status !== 404) {
        throw new Error(`Bad response, status: ${response.status}`)
      }
      const data = PharmacyCodeResponseSchema.parse(await response.json())
      return data
    },
  })

const PharmacyCodeResponseSchema = z.object({
  data: z.optional(
    z.object({
      code: z.string(),
      expires_at: z.iso.datetime({ offset: true }),
    }),
  ),
  error: z.optional(z.string()),
})

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
      const data = PharmacyDetailResponseSchema.parse(await response.json())
      return data
    },
  })

const PharmacyDetailResponseSchema = z.object({
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
