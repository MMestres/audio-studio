import LoadingTable from '@/components/dashboard/LoadingTable'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import HeaderComment from '@/components/dashboard/opiniones/HeaderComment'
import ListComments from '@/components/dashboard/opiniones/ListComments'
import { Suspense } from 'react'

export default async function Page () {
  return <PageList title='Opiniones'>
    <Table title='Opiniones' newButton={{ href: '/dashboard/opiniones/nuevo', label: 'Añadir opinión manualmente' }}>
      <HeaderComment />
      <Suspense fallback={<LoadingTable rows={5} />}>
        <ListComments />
      </Suspense>
    </Table>
  </PageList>
}
