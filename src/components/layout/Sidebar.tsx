'use client'

import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { HiHome } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import { RiShakeHandsFill, RiSpeakFill } from 'react-icons/ri'
import { GiCompactDisc } from 'react-icons/gi'

import Box from '@/components/layout/Box'
import SidebarItem from '@/components/layout/SidebarItem'
import AudioItem from '@/components/multimedia/AudioItem'
import { type Audio } from '@/types/Audio'

interface SidebarProps {
  className?: string
  audios?: Audio[]
}

export default function Sidebar ({
  className = '', audios = []
}: SidebarProps) {
  const pathname = usePathname()
  const routes = useMemo(() => [{
    icon: HiHome,
    label: 'AUDIO STUDIO',
    active: pathname === '/' || pathname === '',
    href: '/',
    className: 'font-bold',
    iconClassName: ''
  }, {
    icon: RiShakeHandsFill,
    label: 'Servicios',
    active: pathname === '/servicios' || pathname === '/equipo' || pathname === '/estudio',
    href: '/servicios',
    className: ''
  },
  {
    icon: GiCompactDisc,
    label: 'Multimedia',
    active: pathname === '/audio' || pathname === '/video',
    href: '/audio',
    className: ''
  },
  {
    icon: RiSpeakFill,
    label: 'Contacto',
    active: pathname === '/contacto',
    href: '/contacto',
    className: ''
  }], [pathname])

  return (
    <div className={twMerge('flex-col flex md:overflow-y-auto w-full gap-2', className)}>
      <Box className='flex flex-row md:flex-col md:gap-2 h-fit md:p-4'>
        {routes.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </Box>
      <Box className='overflow-y-auto h-full hidden md:flex p-4 flex-col gap-2'>
        {audios.map((item) => (
          <AudioItem key={item.id} audio={item} />
        ))}
      </Box>
    </div>
  )
}
