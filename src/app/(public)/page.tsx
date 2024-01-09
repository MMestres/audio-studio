import { type Metadata } from 'next'

import HeroSection from '@/components/home/HeroSection'
import GoToBanner from '@/components/home/GoToBanner'
import Banner from '@/components/home/Banner'
import ComentariosSection from '@/components/home/ComentariosSection'
import Resources from '@/components/home/Resources'
import { getPageInfo } from '@/data/pages'
import { getHomeBanner } from '@/data/home'

export async function generateMetadata (): Promise<Metadata> {
  const pageInfo = await getPageInfo('home')

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

export default async function Home () {
  const homeBanner = await getHomeBanner()

  return (<div className="w-full h-[100%] overflow-x-hidden overflow-y-auto p-4">
    <div className="w-full p-2 lg:p-8 flex flex-col gap-4">
      <HeroSection />
      <GoToBanner className='hidden lg:flex w-full h-12 justify-center mb-12' />
      <Banner id="banner" className='relative mt-8 flex flex-col-reverse' homeBanner={homeBanner} />
      <Resources className='w-full lg:w-[80%] my-12 lg:my-24 mx-auto' />
      <ComentariosSection id="opiniones" />
    </div>
  </div>
  )
}
