import { Suspense } from 'react'

import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import HeaderStudio from '@/components/dashboard/estudio/HeaderStudio'
import ListStudio from '@/components/dashboard/estudio/ListStudio'
import LoadingTable from '@/components/dashboard/LoadingTable'

export default async function Page () {
  return (<PageList title='Estudio'>
    <Suspense fallback={<div>Loading...</div>}>
      <PageInfo pageID='studio' />
    </Suspense>
    <Table title='Bloques de estudio' newButton={{ href: '/dashboard/estudio/nuevo', label: 'Crear bloque de estudio' }}>
      <HeaderStudio />
      <Suspense fallback={<LoadingTable rows={3} />}>
        <ListStudio />
      </Suspense>
    </Table>
  </PageList>
  )
}
