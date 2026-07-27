import { QueryClient } from '@tanstack/react-query'
import { fetchHelper } from './fetch'

export const authOwnerCheck = async (queryClient: QueryClient) => {
  const response = await queryClient.fetchQuery({
    queryKey: ['auth', 'owner', 'check'],
    queryFn: async () => {
      const response = await fetchHelper('/auth/owners/check')
      console.log('check auth response.ok: ', response.ok)
      return response
    },
  })
  return response
}
