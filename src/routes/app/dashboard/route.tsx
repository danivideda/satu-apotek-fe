import { authUserCheck } from '#/lib/auth'
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router'

export const Route = createFileRoute('/app/dashboard')({
  beforeLoad: async ({ context }) => {
    console.log(`From beforeLoad ${Route.fullPath}`)
    try {
      const response = await authUserCheck(context.queryClient)
      if (!response.ok) {
        context.queryClient.removeQueries({
          predicate: (query) => {
            // Extract the primary key name
            const primaryKey = query.queryKey[0]

            // Return true to invalidate everything EXCEPT this key
            return primaryKey !== 'auth'
          },
        })
        throw redirect({ to: '/app/landing' })
      }
    } catch (error) {
      if (isRedirect(error)) {
        const _redirect = error
        throw _redirect
      } else {
        context.queryClient.removeQueries()
        console.log(error)
        throw redirect({ to: '/app/landing' })
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-dvh">
      <div className="flex-2 min-w-30 max-w-46 flex border-r border-solid border-gray-200 bg-gray-100">
        <div className="w-full flex flex-col justify-between">
          <div className="shrink-0 h-20 border border-solid border-red-400">
            top
          </div>
          <div className="flex-1 min-h-20 overflow-auto border border-solid border-yellow-400">
            <div>Home</div>
            <div>POS</div>
            <div>Master Obat</div>
            <div>Inventory</div>
          </div>
          <div className="shrink-0 h-20 border border-solid border-blue-400">
            bottom
          </div>
        </div>
      </div>
      <div className="flex-9 p-3">
        <Outlet />
      </div>
    </div>
  )
}
