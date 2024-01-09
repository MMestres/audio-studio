import { type Metadata } from 'next'

import ContactSection from '@/components/contact/ContactSection'
import { getPageInfo } from '@/data/pages'

export async function generateMetadata (): Promise<Metadata> {
  const pageInfo = await getPageInfo('contact')
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

export default async function Contacto () {
  return (
    <div className="relative w-full h-[100%] overflow-x-hidden overflow-y-auto p-4 flex flex-col-reverse animatecss animatecss-fast animatecss-slideInUp justify-end">
      <ContactSection />
    </div>
  )
}
