import { API_URL } from '#/constants'
import cn from '#/lib/cn'
import { createFileRoute } from '@tanstack/react-router'
import React, { useRef, useState } from 'react'

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
})

function FormComponent() {
  const navigate = Route.useNavigate()
  const context = Route.useRouteContext()

  const emailRef = useRef('')
  const passwordRef = useRef('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    emailRef.current = e.target.value
  }
  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    passwordRef.current = e.target.value
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/auth/owners/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailRef.current,
          password: passwordRef.current,
        }),
        credentials: 'include',
      })
      if (!response.ok) {
        setIsLoading(false)
        setIsError(true)
        const result = await response.json()
        console.log(result)
      } else {
        context.queryClient.invalidateQueries()
        console.log('runs navigate')
        navigate({ to: '/dashboard/pharmacies', reloadDocument: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      className="flex flex-col justify-between mt-3 h-full"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col justify-start gap-2">
        <label className="flex flex-col items-start">
          <span className="text-md text-gray-800 mb-2">Email</span>
          <input
            name="email"
            type="text"
            onChange={handleChangeEmail}
            className="w-full border border-solid border-gray-400 p-2 rounded-sm"
          />
        </label>
        <label className="flex flex-col items-start">
          <span className="text-md text-gray-800 mb-2">Password</span>
          <input
            name="password"
            type="password"
            onChange={handleChangePassword}
            className="w-full border border-solid border-gray-400 p-2 rounded-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        className={cn(
          'w-full h-14 mt-4 text-white bg-primary p-4 rounded-sm transition-colors ease-in-out',
          {
            'cursor-pointer hover:bg-green-400': !isLoading,
            'cursor-progress bg-secondary': isLoading,
          },
        )}
      >
        {isLoading ? (
          <div className="h-full mx-auto aspect-square animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        ) : (
          'Login'
        )}
      </button>
      <div className="text-red-400">
        {isError && 'Something went wrong. Please check again.'}
      </div>
    </form>
  )
}

function RouteComponent() {
  return (
    <div className="bg-gray-50 h-screen">
      <div className="container mx-auto h-full">
        <div className="flex flex-col justify-center h-full w-full">
          <div className="flex flex-col min-h-1/3 w-1/3 mx-auto border border-solid border-gray-300 bg-white rounded-md shadow-md p-4">
            <div className="text-2xl font-bold text-center">Login Owner</div>
            <FormComponent />
          </div>
        </div>
      </div>
    </div>
  )
}
