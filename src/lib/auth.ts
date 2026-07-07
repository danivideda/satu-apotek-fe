import { QueryClient } from '@tanstack/react-query'
import { fetchHelper } from './fetch'

export const authOwnerCheck = async (queryClient: QueryClient) => {
  const response = await queryClient.fetchQuery({
    queryKey: ['auth', 'owner', 'check'],
    queryFn: async () => {
      console.log('query fn runs')
      const response = fetchHelper('/auth/owners/check')
      return response
    },
    staleTime: 60_000, // 1 minute
  })
  return response
}
