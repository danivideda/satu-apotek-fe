import cn from '#/lib/cn'

export function NavBar2() {
  return (
    <div className="flex flex-row justify-between w-full p-2.5">
      <div className="text-2xl">Satu Apotek</div>
      <NavMenuComponent />
      <div className="text-lg">Profile and logout</div>
    </div>
  )
}

function NavMenuComponent() {
  const navItemCn = (active: boolean) => cn('py-2 px-5 bg-transparent text-gray-400 rounded-3xl', {
    'bg-primary text-white': active
  })

  return (
    // <div className="flex flex-row p-3 border border-solid border-[#4CAF50] rounded-4xl bg-[#F1FFEE]">
    <div className="flex flex-row p-3 border border-solid border-primary rounded-4xl bg-muted-primary">
      <div className={navItemCn(true)}>Apotek</div>
      <div className={navItemCn(false)}>Account</div>
      <div className={navItemCn(false)}>Billing</div>
    </div>
  )
}
