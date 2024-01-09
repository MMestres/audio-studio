import { unstable_noStore as noStore } from 'next/cache'

import Sidebar from '@/components/layout/Sidebar'
import Box from '@/components/layout/Box'
import Player from '@/components/Player'
import { getAudios } from '@/data/audios'

export default async function PublicLayout ({
  children
}: {
  children: React.ReactNode
}) {
  noStore()
  const audios = await getAudios()
  return (
    <div id="app" className='public relative md:h-screen p-2 gap-2'>
      <Sidebar className='[grid-area:aside]' audios={audios.slice(0, 8)} />
      <main className='[grid-area:main] md:overflow-hidden'>
        <Box className='pb-24 md:pb-0'>
          {children}
        </Box>
      </main>
      <footer className='[grid-area:player] fixed bottom-0 left-0 right-0 bg-zinc-900 border-8 border-black md:relative md:border-0'>
        <Box>
          <Player className='p-4' />
        </Box>
      </footer>
    </div>
  )
}
