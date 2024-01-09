import { Suspense } from 'react'

import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import LoadingTable from '@/components/dashboard/LoadingTable'
import HeaderAudio from '@/components/dashboard/audio/HeaderAudio'
import ListAudio from '@/components/dashboard/audio/ListAudio'

export default function Page () {
  return <PageList title='Audio'>
  <Suspense fallback={<div>Loading...</div>}>
    <PageInfo pageID='audio' />
  </Suspense>
  <Table title='Bloques de audio' newButton={{ href: '/dashboard/audio/nuevo', label: 'Crear bloque de audio' }}>
    <HeaderAudio />
    <Suspense fallback={<LoadingTable rows={5} />}>
      <ListAudio />
    </Suspense>
  </Table>
</PageList>
}
