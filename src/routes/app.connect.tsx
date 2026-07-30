import { fetchHelper } from '#/lib/fetch'
import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'

export const Route = createFileRoute('/app/connect')({
  component: RouteComponent,
})

function RouteComponent() {
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputVal = inputRef.current?.value
    console.log(inputVal)
    const response = await fetchHelper('/auth/pharmacies/connect', 'POST', {
      "code": inputVal
    })
    console.log(response.status)
  }

  return (
    <div className="container mx-auto">
      <div>Connect Apotek with code:</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1.5">
        <label htmlFor="code">Code</label>
        <div className="flex flex-row gap-1.5">
          <input
            ref={inputRef}
            className="flex-5 border border-black rounded-lg p-4"
            name="code"
            placeholder="input your apotek code"
          />
          <button
            className="flex-1 p-2 cursor-pointer bg-white text-black hover:bg-black hover:text-white border border-black rounded-lg"
            type="submit"
          >
            Connect
          </button>
        </div>
      </form>
    </div>
  )
}
