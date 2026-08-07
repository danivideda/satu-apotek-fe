import { parseCookie } from 'cookie'
import { env } from './env'

export const fetchHelper = async (
  path: string,
  method: 'GET' | 'POST' = 'GET',
  payload?: any,
  csrf: 'owner' | 'user' = 'owner',
): Promise<Response> => {
  var csrfToken = ''
  if (method == 'POST') {
    const csrfName = csrf === 'owner' ? 'owner_csrf' : 'user_csrf'
    csrfToken = parseCookie(document.cookie)[csrfName] ?? ''
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(method === 'POST' && { 'X-CSRF-Token': csrfToken }),
  }
  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    method,
    headers,
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  return response
}

type fetchOpts = {
  path: string
  method?: 'GET' | 'POST'
  payload?: any
  csrf?: 'owner' | 'user'
}

export const fetchHelperOpts = (opts: fetchOpts) =>
  fetchHelper(opts.path, opts.method, opts.payload, opts.csrf)
