import Link from 'next/link'
import { type IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

interface SidebarItemPropsLink {
  icon?: IconType
  label: string
  active?: boolean
  href?: string
  className?: string
  iconClassName?: string
}

export default function SidebarItem ({
  icon: Icon,
  label,
  active = false,
  href = '',
  className = '',
  iconClassName = ''
}: SidebarItemPropsLink) {
  const finalClass = twMerge('flex flex-col md:flex-row h-auto items-center justify-center md:justify-start w-full gap-y-1 gap-x-4 text-md font-medium cursor-pointer transition text-zinc-400 py-1 transition-all duration-[0.8s] rounded-md p-2 group hover:text-zinc-100 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow hover:shadow-md focus:text-zinc-100 focus:bg-zinc-800 focus:scale-[1.02] focus:shadow focus:shadow-md focus:outline-none focus:ring-0', active && 'text-zinc-100', className)

  const finalIconClass = twMerge('text-2xl', iconClassName)

  return (
    <>
      {(href !== '') && <Link href={href} className={finalClass}>
        {Icon != null && <Icon className={finalIconClass} />}
        <p className='md:hidden truncate w-fill text-xs text-center'>{label.split(' ')[0]}</p>
        <p className='hidden md:flex truncate w-fill text-base'>{label}</p>
      </Link>}
      {(href === '') && <div className={finalClass}>
        {Icon != null && <Icon className={finalIconClass} />}
        <p className='truncate w-fill text-xs md:text-base'>{label}</p>
      </div>}
    </>
  )
}
