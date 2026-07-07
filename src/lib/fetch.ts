import { parseCookie } from 'cookie'
import { env } from './env'

export const fetchHelper = async (
  path: string,
  method: 'GET' | 'POST' = 'GET',
  payload?: any,
): Promise<Response> => {
  var csrfToken = ''
  if (method == 'POST') {
    csrfToken = parseCookie(document.cookie)['owner_csrf'] ?? ''
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(method === 'POST' && { 'X-CSRF-Token': csrfToken }),
  }
  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    method,
    headers,
    body: payload,
    credentials: 'include',
  })
  return response
}
