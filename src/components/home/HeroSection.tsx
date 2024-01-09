import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { HiChevronDoubleDown } from 'react-icons/hi'

import GoToSelector from '@/components/layout/GoToSelector'
import { getHomeBlock } from '@/data/home'
import { getPageInfo } from '@/data/pages'
import AudioItemWrapper from '../multimedia/AudioItemWrapper'

export interface HeroSectionProps {
  className?: string
}

export default async function HeroSection ({
  className = ''
}: HeroSectionProps) {
  const homeBlock = await getHomeBlock()
  const pageInfo = await getPageInfo('home')

  return <section className={twMerge('flex flex-col items-center justify-between lg:flex-row lg:h-[calc(100vh-270px)] animatecss animatecss-fast animatecss-fadeIn', className)}>
    <div className="lg:pr-5 lg:my-0 min-w-[300px] h-[calc(100vh-300px)] md:h-[calc(100vh-250px)] lg:h-auto flex flex-col justify-center">
      <div className="max-w-xl flex flex-col gap-4">
        <h1 className='text-xl font-bold tracking-tight text-zinc-200 sm:leading-none uppercase'>Audio Studio</h1>
        <h2 className="max-w-md text-3xl font-semibold tracking-tight text-zinc-200 sm:text-4xl sm:leading-none">{pageInfo?.title}</h2>
        {pageInfo?.subtitle.split('\n').map((text, index) =>
          <p key={index} className="text-base text-zinc-400 md:text-lg">{text}</p>
        )}
        <hr className="mb-6 border-zinc-400" />
      </div>
      <AudioItemWrapper songId={homeBlock?.audio ?? ''} />
    </div>
    <GoToSelector selector='#presupuesto' className='focus:outline-none focus:ring-0 group lg:hidden mb-24'>
      <HiChevronDoubleDown className='animate-bounce transition-all duration-[0.8s] text-zinc-500 group-hover:text-zinc-100 group-focus:text-zinc-100 w-8 h-8 group-hover:w-12 group-hover:h-12 group-focus:w-12 group-focus:h-12' />
    </GoToSelector>
    <div className="px-5 pt-6 pb-5 mb-12 lg:mb-0 text-center border border-zinc-400 bg-black/40 rounded lg:w-2/5 min-w-[300px]" id="presupuesto">
      <Link href="/contacto" className="relative items-center justify-start inline-block mb-2 lg:mt-4 lg:mb-6 px-5 py-3 overflow-hidden rounded-md transition-all duration-[0.8s] group text-zinc-900 bg-zinc-100 hover:shadow-md hover:shadow-black hover:scale-110 focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-black focus:scale-110">
        <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-[0.8s] ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-zinc-900 opacity-100 group-hover:-translate-x-4 group-focus:-translate-x-4"></span>
        <span className="relative w-full text-left text-zinc-900 transition-colors duration-[0.8s] ease-in-out group-hover:text-zinc-100 group-focus:text-zinc-100">{homeBlock?.contactButtonText}</span>
        <span className="absolute inset-0 border-2 border-zinc-100 rounded-md"></span>
      </Link>
      <p className="px-5 mb-3 text-zinc-400 md:mb-6 w-full">{homeBlock?.topText}</p>
      <div className="flex items-center w-full mb-5">
        <hr className="flex-1 border-gray-400" />
        <div className="px-3 text-xs text-gray-400 sm:text-sm">{homeBlock?.smallTopText}</div>
        <hr className="flex-1 border-gray-400" />
      </div>
      <GoToSelector selector="#opiniones" className="relative items-center justify-start inline-block mb-2 lg:mt-4 lg:mb-8 px-5 py-3 overflow-hidden rounded-md transition-all duration-[0.8s] text-zinc-100 group hover:shadow-md hover:shadow-black hover:scale-110 focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-black focus:scale-110">
        <span className="absolute top-0 left-0 w-72 h-72 -mt-1 transition-all duration-[0.8s] ease-in-out rotate-45 -translate-x-[350px] -translate-y-36 bg-zinc-100 opacity-100 group-hover:-translate-x-4 group-focus:-translate-x-4"></span>
        <span className="relative w-full text-left text-zinc-100 transition-colors duration-[0.8s] ease-in-out group-hover:text-zinc-900 group-focus:text-zinc-900">{homeBlock?.commentButtonText}</span>
        <span className="absolute inset-0 border-2 border-zinc-100 rounded-md"></span>
      </GoToSelector>
    </div>
  </section>
}
