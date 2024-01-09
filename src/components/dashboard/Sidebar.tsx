'use client'

import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { HiHome } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import { RiShakeHandsFill, RiSpeakFill } from 'react-icons/ri'
import { GiCompactDisc, GiGuitarHead } from 'react-icons/gi'
import { BiSolidGuitarAmp, BiSolidVideo } from 'react-icons/bi'

import Box from '@/components/layout/Box'
import SidebarItem from '@/components/layout/SidebarItem'
import Signout from '@/components/layout/Signout'
import { FaCommentDots } from 'react-icons/fa'
import { MdMarkunread } from 'react-icons/md'
import SidebarItemMobileDash from './SidebarItemMobileDash'
import { BsMenuButtonWideFill } from 'react-icons/bs'

interface SidebarProps {
  className?: string
  unreadComments?: number
  unreadMessages?: number
}

export default function Sidebar ({
  className = '', unreadComments = 0, unreadMessages = 0
}: SidebarProps) {
  const pathname = usePathname()

  const routes = useMemo(() => [{
    icon: HiHome,
    label: 'AUDIO STUDIO',
    active: pathname === '/dashboard',
    href: '/dashboard',
    className: 'font-bold',
    iconClassName: ''
  }, {
    icon: RiShakeHandsFill,
    label: 'Servicios',
    active: pathname === '/dashboard/servicios',
    href: '/dashboard/servicios',
    className: ''
  },
  {
    icon: GiGuitarHead,
    label: 'Equipo',
    active: pathname === '/dashboard/equipo',
    href: '/dashboard/equipo',
    className: ''
  },
  {
    icon: BiSolidGuitarAmp,
    label: 'Estudio',
    active: pathname === '/dashboard/estudio',
    href: '/dashboard/estudio',
    className: ''
  },
  {
    icon: GiCompactDisc,
    label: 'Audio',
    active: pathname === '/dashboard/audio',
    href: '/dashboard/audio',
    className: ''
  },
  {
    icon: BiSolidVideo,
    label: 'Vídeo',
    active: pathname === '/dashboard/video',
    href: '/dashboard/video',
    className: ''
  },
  {
    icon: RiSpeakFill,
    label: 'Datos contacto',
    active: pathname === '/dashboard/contacto',
    href: '/dashboard/contacto',
    className: ''
  },
  {
    icon: FaCommentDots,
    label: 'Opiniones' + (unreadComments > 0 ? ` (${unreadComments})` : ''),
    active: pathname === '/dashboard/opiniones',
    href: '/dashboard/opiniones',
    className: unreadComments > 0 ? 'text-yellow-400 hover:text-yellow-200' : ''
  },
  {
    icon: MdMarkunread,
    label: 'Mensajes' + (unreadMessages > 0 ? ` (${unreadMessages})` : ''),
    active: pathname === '/dashboard/mensajes',
    href: '/dashboard/mensajes',
    className: unreadMessages > 0 ? 'text-yellow-400 hover:text-yellow-200' : ''
  }
  ], [pathname, unreadComments, unreadMessages])

  const [open, setOpen] = useState(false)

  return (
    <div className={twMerge('flex-col flex lg:overflow-y-auto w-full gap-2', className)}>
      <Box className='hidden lg:flex flex-row lg:flex-col lg:gap-2 h-fit lg:p-4'>
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
        <Signout />
      </Box>
      <Box className='flex lg:hidden flex-row lg:flex-col lg:gap-2 h-fit lg:p-4'>
        <SidebarItemMobileDash icon={BsMenuButtonWideFill} onClick={() => { setOpen((open) => !open) }} label='Menú' className='font-bold' />
        <Signout mobile />
      </Box>
      <Box className={`${open ? 'grid' : 'hidden'} lg:hidden grid-cols-3 p-2 gap-2 animatecss animatecss-fadeInDown h-fit`}>
        {routes.map((item) => (
          <SidebarItemMobileDash key={item.label} {...item} />
        ))}
      </Box>
      <Box className='overflow-y-auto h-full hidden lg:flex p-4 flex-col gap-2'>

      </Box>
    </div>
  )
}
