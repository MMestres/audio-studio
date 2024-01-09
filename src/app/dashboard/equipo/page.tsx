import { Suspense } from 'react'

import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import HeaderEquipo from '@/components/dashboard/equipo/HeaderEquipo'
import ListEquipo from '@/components/dashboard/equipo/ListEquipo'
import LoadingTable from '@/components/dashboard/LoadingTable'

export default async function Page () {
  return (<PageList title='Equipo'>
    <Suspense fallback={<div>Loading...</div>}>
      <PageInfo pageID='ressources' />
    </Suspense>
    <Table title='Bloques de equipo' newButton={{ href: '/dashboard/equipo/nuevo', label: 'Crear bloque de equipo' }}>
      <HeaderEquipo />
      <Suspense fallback={<LoadingTable rows={5} />}>
        <ListEquipo />
      </Suspense>
    </Table>
  </PageList>
  )
}
