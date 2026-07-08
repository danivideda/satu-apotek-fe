import cn from '#/lib/cn'
import { fetchHelper } from '#/lib/fetch'
import {
  createLink,
  useNavigate,
  useRouteContext,
  type LinkComponent,
} from '@tanstack/react-router'
import React from 'react'

export function NavBar() {
  return (
    <div className="flex flex-row justify-between items-center w-full py-2.5 px-4 min-w-158 border-b border-gray-200 backdrop-blur-[20px] backdrop-saturate-50 bg-white/70 sticky top-0">
      <BrandComponent />
      <NavMenuComponent />
      <ProfileComponent />
    </div>
  )
}

function NavMenuComponent() {
  const NavItemComponent = createNavItemComponent()

  return (
    <div className="flex flex-row justify-between w-75 p-3 bg-muted-primary border border-primary rounded-4xl h-fit">
      <NavItemComponent to="/dashboard/pharmacies" label="Apotek" />
      <NavItemComponent to="/dashboard/account" label="Account" />
      <NavItemComponent to="/dashboard/billing" label="Billing" />
    </div>
  )
}

function createNavItemComponent() {
  interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    label: string
  }

  const BasicLinkComponent = React.forwardRef<
    HTMLAnchorElement,
    BasicLinkProps
  >((props, ref) => {
    return <a ref={ref} {...props} />
  })

  const CreatedLinkComponent = createLink(BasicLinkComponent)
  const navItemCn = (active: boolean) =>
    cn('py-2 px-5 bg-transparent hover:text-black text-gray-400 rounded-3xl', {
      'bg-primary text-white hover:text-white transition-colors ease-in-out':
        active,
      'hover:text-black transition-all ease-in-out': !active,
    })
  const CustomLink: LinkComponent<typeof BasicLinkComponent> = (props) => {
    return (
      <CreatedLinkComponent {...props}>
        {({ isActive }) => (
          <div className={navItemCn(isActive)}>{props.label}</div>
        )}
      </CreatedLinkComponent>
    )
  }

  return CustomLink
}

function BrandComponent() {
  return (
    <div className="flex flex-col flex-2 justify-center">
      <h1 className="text-2xl">Satu Apotek</h1>
      <span className="text-sm text-gray-500">Owner dashboard</span>
      <span className="text-sm text-gray-500">v0.1</span>
    </div>
  )
}

function ProfileComponent() {
  const routeContext = useRouteContext({ from: '/_owner/dashboard' })
  const navigate = useNavigate()

  async function handleLogout() {
    try {
      const response = await fetchHelper('/auth/owners/logout', 'POST')
      if (!response.ok) {
        const message = (await response.json()).error
        throw new Error(`Error happened status: ${response.status}, ${message}`)
      }

      routeContext.queryClient.invalidateQueries()

      navigate({ to: '/login' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-row flex-2 justify-end items-center gap-2 h-full">
      <div className="flex flex-col justify-center items-end h-fit text-right w-full">
        <span className="text-lg">test1</span>
        <span
          className="text-sm text-gray-500 hover:bg-gray-100 hover:text-black cursor-pointer"
          onClick={handleLogout}
        >
          Logout -{`>`}
        </span>
      </div>
    </div>
  )
}
