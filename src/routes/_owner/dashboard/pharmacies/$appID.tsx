import { fetchHelper } from '#/lib/fetch'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, redirect } from '@tanstack/react-router'
import z from 'zod'
import { PharmacySchema } from '.'
import { Edit2Icon } from 'lucide-react'
import cn from '#/lib/cn'

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
    <div className="flex flex-col gap-1.5">
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
  )
}

function SectionComponent({
  label,
  children,
}: React.PropsWithChildren<{ label: string }>) {
  return (
    <div>
      <div>{label}</div>
      <div className="flex flex-col justify-between container p-4">
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
  return (
    <div>
      <table className="w-5/6">
        <thead>
          <tr className="text-white bg-green-600">
            <th className="font-medium rounded-l-md p-1">Nama</th>
            <th className="font-medium rounded-r-md p-1">Password</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function UserItemComponent({ name }: { name: string }) {
  return (
    <tr className='even:bg-gray-100'>
      <td className='p-2'>{name}</td>
      <td className='p-2'>******</td>
    </tr>
  )
}

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
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
