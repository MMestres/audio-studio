import { type Metadata } from 'next'

import TabNav from '@/components/layout/TabNav'
import TitleSection from '@/components/layout/TitleSection'
import VideoList from '@/components/multimedia/VideoList'
import { getPageInfo } from '@/data/pages'
import { getVideo } from '@/data/video'
import { getPlaylistVideos } from '@/data/youtube'

const tabs = [
  { id: 'audio', label: 'Audio', link: '/audio' },
  { id: 'video', label: 'Video', link: '/video' }
]

export async function generateMetadata (): Promise<Metadata> {
  const pageInfo = await getPageInfo('video')

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

export default async function VideoPage () {
  const video = await getVideo()
  const videos = await getPlaylistVideos(video.playlistid)
  return (
    <div className='relative w-full flex flex-col gap-2 h-[100%] overflow-x-hidden overflow-y-auto p-4'>
      <TabNav tabs={tabs} activeTab='video' />
      <section className='flex flex-col animatecss animatecss-fast animatecss-slideInUp w-full'>
        <TitleSection data='video' />
        <VideoList videos={videos} />
      </section>
    </div>
  )
}
