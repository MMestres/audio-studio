import LoadingTable from '@/components/dashboard/LoadingTable'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import HeaderContactMessage from '@/components/dashboard/mensajes/HeaderContactMessage'
import ListContactMessages from '@/components/dashboard/mensajes/ListContactMessages'
import { Suspense } from 'react'

export default async function Page () {
  return <PageList title='Mensajes de contacto'>
    <Table title='Mensajes de contacto'>
      <HeaderContactMessage />
      <Suspense fallback={<LoadingTable rows={5} />}>
        <ListContactMessages />
      </Suspense>
    </Table>
  </PageList>
}
