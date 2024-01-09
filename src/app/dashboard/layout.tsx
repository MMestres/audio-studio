import type { Metadata } from 'next'

import { unstable_noStore as noStore } from 'next/cache'

import Box from '@/components/layout/Box'
import Sidebar from '@/components/dashboard/Sidebar'
import { getCountUnreadComments } from '@/data/comments'
import { getCountUnreadContactMessages } from '@/data/contactmessage'

export const metadata: Metadata = {
  title: 'dashboard',
  description: '',
  robots: 'noindex, nofollow'
}

export default async function DashboardLayout ({
  children
}: {
  children: React.ReactNode
}) {
  noStore()
  const qtyComments = await getCountUnreadComments()
  const qtyMessages = await getCountUnreadContactMessages()

  return (
    <div id="app" className='dashboard relative md:h-screen p-2 gap-2'>
      <Sidebar className='[grid-area:aside]' unreadComments={qtyComments} unreadMessages={qtyMessages} />
      <main className='[grid-area:main] lg:overflow-hidden'>
        <Box className='pb-24 md:pb-0'>
          {children}
        </Box>
      </main>
    </div>
  )
}
