import { authPharmacyCheck } from '#/lib/auth'
import cn from '#/lib/cn'
import { fetchHelper } from '#/lib/fetch'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { createFileRoute, isRedirect, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
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

  const [activeItemKey, setActiveItemKey] = useState('NoneSelected')
  const isNoneSelected = activeItemKey === 'NoneSelected'
  const [password, setPassword] = useState('')

  useEffect(() => {
    // reset password field when selecting different user
    // runs when activeItemKey is changed AND an item is selected
    if (!isNoneSelected) setPassword('')
  }, [activeItemKey])

  const data = response.data
  return (
    <div className="flex flex-row h-lvh">
      <div className='flex-1 h-full bg-green-100 opacity-45 bg-[url("/endless-clouds.svg")]'></div>
      <div className="flex-1 h-full bg-white container mx-auto p-4 overflow-auto">
        <div className="flex flex-col h-full justify-center">
          <div className="">
            <div className="text-lg">Selamat datang di</div>
            <div className="text-4xl">{data.name}</div>
          </div>
          <div className="mt-4 flex flex-col gap-1.5">
            <div>
              <h1>Masuk sebagai</h1>
              <div className="w-full flex flex-col gap-1.5">
                {data.users.map((user, index) => {
                  const itemKey = `${user.username}+${index}`
                  const isActive = itemKey === activeItemKey
                  const onClickCallback = () =>
                    setActiveItemKey((prev) => {
                      if (itemKey === prev) {
                        return 'NoneSelected'
                      }
                      return itemKey
                    })

                  return (
                    <UserLoginItemComponent
                      key={itemKey}
                      user={user}
                      isActive={isActive}
                      isNoneSelected={isNoneSelected}
                      onClickCallback={onClickCallback}
                    />
                  )
                })}
              </div>
            </div>
            <div
              className={cn(
                'flex flex-col gap-1.5 transition-all ease-in-out',
                {
                  'invisible opacity-0': isNoneSelected,
                },
              )}
            >
              <div>
                <div>Password:</div>
                <input
                  name="password"
                  type="password"
                  placeholder="type password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  className="w-full p-2"
                />
              </div>
              <button className="p-2 border border-green-600 bg-green-100 cursor-pointer rounded-lg">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const UserLoginItemComponent = ({
  user,
  isActive,
  isNoneSelected,
  onClickCallback,
}: {
  user: { id: number; username: string }
  isNoneSelected: boolean
  isActive: boolean
  onClickCallback: any
}) => {
  return (
    <div
      className={cn(
        'border border-black p-4 rounded-2xl transition-all ease-in-out cursor-pointer',
        {
          'bg-gray-100 text-gray-500': !isNoneSelected,
          'bg-green-300 text-black': isActive,
          'hover:bg-green-50': !isActive,
        },
      )}
      onClick={onClickCallback}
    >
      {user.username}
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
    users: z.array(z.object({ id: z.number(), username: z.string() })),
  }),
})
