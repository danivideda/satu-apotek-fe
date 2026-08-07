import cn from '#/lib/cn'
import { Link, useMatches } from '@tanstack/react-router'
import { Fragment } from 'react/jsx-runtime'

export type BreadCrumbValue = {
  label: string
  path: string
}

export function BreadCrumbs() {
  const matches = useMatches()
  const list: BreadCrumbValue[] = matches.flatMap((match) => {
    const label: string = (match.loaderData as any)?.label
    if (!label) {
      return []
    }
    return { label: label, path: match.pathname }
  })

  function BreadCrumbItem({
    value,
    current,
  }: React.PropsWithChildren<{ value: BreadCrumbValue; current: boolean }>) {
    const cls = cn('text-xl', {
      'text-black': current,
      'text-gray-400 cursor-pointer hover:underline': !current,
    })
    return (
      <>
        <div className="text-xl first:hidden text-gray-400">{'>'}</div>
        {current ? (
          <div className={cls}>{value.label}</div>
        ) : (
          <Link to={value.path} className={cls}>
            {value.label}
          </Link>
        )}
      </>
    )
  }

  return (
    <div className="flex flex-row justify-start item-center gap-1 p-3">
      {list.map((value, index) => {
        return (
          <Fragment key={value.path + index}>
            <BreadCrumbItem value={value} current={index === list.length - 1} />
          </Fragment>
        )
      })}
    </div>
  )
}
