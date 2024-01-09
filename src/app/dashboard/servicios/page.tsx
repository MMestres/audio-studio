import { Suspense } from 'react'

import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import HeaderServicios from '@/components/dashboard/servicios/HeaderServicios'
import ListServicios from '@/components/dashboard/servicios/ListServicios'
import LoadingTable from '@/components/dashboard/LoadingTable'

export default async function Page () {
  return (<PageList title='Servicios'>
    <Suspense fallback={<div>Loading...</div>}>
      <PageInfo pageID='services' />
    </Suspense>
    <Table title='Bloques de servicios' newButton={{ href: '/dashboard/servicios/nuevo', label: 'Crear bloque de servicio' }}>
      <HeaderServicios />
      <Suspense fallback={<LoadingTable rows={5} />}>
        <ListServicios />
      </Suspense>
    </Table>
  </PageList>
  )
}
