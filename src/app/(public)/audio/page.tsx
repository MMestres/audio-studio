import { type Metadata } from 'next'

import TabNav from '@/components/layout/TabNav'
import TitleSection from '@/components/layout/TitleSection'
import AudioCurrentHeader from '@/components/multimedia/AudioCurrentHeader'
import AudioList from '@/components/multimedia/AudioList'
import { getPageInfo } from '@/data/pages'
import { getPublicAudios } from '@/data/audios'

const tabs = [
  { id: 'audio', label: 'Audio', link: '/audio' },
  { id: 'video', label: 'Video', link: '/video' }
]

export async function generateMetadata (): Promise<Metadata> {
  const pageInfo = await getPageInfo('audio')
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

export default async function AudioPage () {
  const audios = await getPublicAudios()

  return (
    <div className='relative w-full flex flex-col gap-2 h-[100%] overflow-x-hidden overflow-y-auto p-4'>
      <TabNav tabs={tabs} activeTab='audio' />
      <section className='flex flex-col animatecss animatecss-fast animatecss-slideInUp w-full'>
        <TitleSection data='audio' />
        <AudioCurrentHeader audio={audios[0]} />
        <AudioList />
      </section>
    </div>
  )
}
