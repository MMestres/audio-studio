import LoadingTable from '@/components/dashboard/LoadingTable'
import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import Table from '@/components/dashboard/Table'
import FormVideo from '@/components/dashboard/video/FormVideo'
import HeaderVideo from '@/components/dashboard/video/HeaderVideo'
import ListVideo from '@/components/dashboard/video/ListVideo'
import { getVideo } from '@/data/video'
import { Suspense } from 'react'

export default async function Page () {
  const video = await getVideo()

  return <PageList title='Vídeos'>
    <Suspense fallback={<div>Loading...</div>}>
      <PageInfo pageID='video' />
    </Suspense>
    <FormVideo video={video} />
    <Table title='Vídeos de la playlist'>
      <HeaderVideo />
      <Suspense fallback={<LoadingTable rows={2} />}>
        <ListVideo />
      </Suspense>
    </Table>
  </PageList>
}
