import cn from '#/lib/cn'
import { Link } from '@tanstack/react-router'

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
  const navItemCn = (active: boolean) =>
    cn('py-2 px-5 bg-transparent text-gray-400 rounded-3xl', {
      'bg-primary text-white': active,
    })

  return (
    <div className="flex flex-row flex-1 p-3 bg-muted-primary/50 border border-primary rounded-4xl h-fit">
      <Link to="/dashboard/pharmacies">
        {({ isActive }) => <div className={navItemCn(isActive)}>Apotek</div>}
      </Link>
      <Link to="/dashboard/account">
        {({ isActive }) => <div className={navItemCn(isActive)}>Account</div>}
      </Link>
      <Link to="/dashboard/billing">
        {({ isActive }) => <div className={navItemCn(isActive)}>Billing</div>}
      </Link>
    </div>
  )
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
  return (
    <div className="flex flex-row flex-2 justify-end items-center gap-2 h-full">
      <div className="flex flex-col justify-center items-end h-fit">
        <span className="">test1</span>
        <span className="text-sm text-gray-500">Logout</span>
      </div>
    </div>
  )
}
