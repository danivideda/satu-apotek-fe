import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/profile')({
  loader: (options) => {
    // console.log(`from loader profile: ${options.cause}, ${options.location.pathname}`)
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/profile"!</div>
}
