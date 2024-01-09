'use client'

import { twMerge } from 'tailwind-merge'
import { useInView } from 'react-intersection-observer'

import { type HomeBanner } from '@/types/HomeBanner'

interface BannerProps {
  className?: string
  id: string
  homeBanner?: HomeBanner
}

export default function Banner ({
  className = '', id, homeBanner
}: BannerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  className += inView ? ' animatecss animatecss-fast animatecss-slideInUp' : ' opacity-0'

  return <section id={id} className={twMerge('relative mt-8 flex flex-col-reverse', className)} ref={ref}>
  <picture className='mt-12 lg:mt-0'>
    <img className=' rounded-lg w-[100%] border border-black/50 bg-zinc-950/50 shadow-md shadow-black/50' src={homeBanner?.bannerImage} alt={homeBanner?.bannerTitle}></img>
  </picture>
  <div className='lg:absolute lg:left-10 lg:bottom-10 lg:right-[30%] lg:bg-zinc-950/95 lg:rounded-md text-zinc-400 lg:text-zinc-100 lg:p-8 text-md flex flex-col gap-2 lg:gap-4'>
    <h3 className='text-2xl font-bold text-zinc-100'>{homeBanner?.bannerTitle}</h3>
    {homeBanner?.bannerText.split('\n').map((text, index) =>
      <p key={index}>{text}</p>
    )}
  </div>
</section>
}
