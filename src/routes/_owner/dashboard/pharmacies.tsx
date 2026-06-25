import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/pharmacies')({
  loader: (options) => {
    // console.log(`from loader pharmacies: ${options.cause}, ${options.location.pathname}`)
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/pharmacies"!</div>
}
