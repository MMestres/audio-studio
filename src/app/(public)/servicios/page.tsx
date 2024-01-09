import { type Metadata } from 'next'

import TabNav from '@/components/layout/TabNav'
import TitleSection from '@/components/layout/TitleSection'
import ServiciosList from '@/components/servicios/ServiciosList'
import { getPageInfo } from '@/data/pages'

const tabs = [
  { id: 'services', label: 'Servicios', link: '/servicios' },
  { id: 'resources', label: 'Equipo', link: '/equipo' },
  { id: 'studio', label: 'Estudio', link: '/estudio' }
]

export async function generateMetadata (): Promise<Metadata> {
  const pageInfo = await getPageInfo('services')
  const index = pageInfo?.index === true
    ? 'index'
    : 'noindex'
  const follow = pageInfo?.follow === true
    ? 'follow'
    : 'nofollow'

  return {
    title: pageInfo?.metatitle,
    description: pageInfo?.metadescription,
    robots: `${index}, ${follow}`,
    keywords: pageInfo?.keywords
  }
}

export default async function ServiciosPage () {
  return (
    <div className='relative w-full flex flex-col gap-2 h-[100%] overflow-x-hidden overflow-y-auto p-4'>
      <TabNav tabs={tabs} activeTab='services' />
      <section className='flex flex-col animatecss animatecss-fast animatecss-slideInUp w-full'>
        <TitleSection data='services' />
        <ServiciosList />
      </section>
    </div>
  )
}
