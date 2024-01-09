import PageInfo from '@/components/dashboard/PageInfo'
import PageList from '@/components/dashboard/PageList'
import DashHomeBanner from '@/components/dashboard/home/DashHomeBanner'
import DashHomeBlock from '@/components/dashboard/home/DashHomeBlock'
import DashHomeComment from '@/components/dashboard/home/DashHomeComment'
import DashHomeSummary from '@/components/dashboard/home/DashHomeSummary'
import { Suspense } from 'react'

export default async function Page () {
  return <PageList title='Audio Studio'>
    <Suspense fallback={<div>Loading...</div>}>
      <PageInfo pageID='home' />
    </Suspense>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <Suspense fallback={<div>Loading...</div>}>
        <DashHomeBlock />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <DashHomeBanner />
      </Suspense>
    </div>
    <Suspense fallback={<div>Loading...</div>}>
      <DashHomeSummary />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <DashHomeComment />
    </Suspense>
  </PageList>
}
