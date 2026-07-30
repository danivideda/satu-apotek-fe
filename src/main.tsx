import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10_000 /* 10 seconds */,
      refetchOnWindowFocus: false, /* disable auto-refetch when refocus to save bandwidth */
    },
  },
})

const router = createRouter({
  routeTree,
  defaultPreload: false,
  scrollRestoration: true,
  defaultStaleTime: 0,
  defaultPreloadStaleTime: 0,
  defaultStaleReloadMode: 'background',
  context: {
    queryClient: queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<RouterProvider router={router} />)
}
