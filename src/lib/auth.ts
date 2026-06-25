import { API_URL } from '#/constants'
import { QueryClient} from '@tanstack/react-query'

export const authOwnerCheck = async (queryClient: QueryClient) => {
  const response = await queryClient.fetchQuery({
    queryKey: ['auth', 'owner', 'check'],
    queryFn: async () => {
      console.log('query fn runs')
      const response = await fetch(`${API_URL}/auth/owners/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      return response
    },
    staleTime: 60_000, // 1 minute
  })
  return response
}
