import {
  createFileRoute,
  isRedirect,
  redirect,
  useNavigate,
} from '@tanstack/react-router'
import React, { useState } from 'react'

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
})

function FormComponent() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value)
  }
  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    try {
      const response = await fetch(
        'http://localhost:8080/v1/auth/owners/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          credentials: 'include',
        },
      )
      if (!response.ok) {
        const result = await response.json()
        console.log(result)
      } else {
        navigate({ to: '/dashboard' })
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
          <span className="text-md text-gray-800 mb-2">Username</span>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleChangeUsername}
            className="w-full border border-solid border-gray-400 p-2 rounded-sm"
          />
        </label>
        <label className="flex flex-col items-start">
          <span className="text-md text-gray-800 mb-2">Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            className="w-full border border-solid border-gray-400 p-2 rounded-sm"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full mt-4 bg-blue-50 p-4 rounded-sm cursor-pointer hover:bg-blue-200"
      >
        Login
      </button>
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
