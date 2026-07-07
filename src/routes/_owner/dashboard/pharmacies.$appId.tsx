import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_owner/dashboard/pharmacies/$appId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { appId } = Route.useParams()
  const data = Route.useLoaderData()
  return <div>Hello {appId}</div>
}
