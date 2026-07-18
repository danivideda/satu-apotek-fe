import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, type AnyRouteMatch } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import type { BreadCrumbValue } from './routes/_owner/dashboard/-components/BreadCrumbs'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  defaultPreload: false,
  scrollRestoration: true,
  context: {
    queryClient: queryClient
  }
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }

  interface StaticDataRouteOption {
    breadcrumb?: (match: AnyRouteMatch) => BreadCrumbValue
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
