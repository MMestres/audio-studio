import { HiChevronDoubleDown } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

import GoToSelector from '@/components/layout/GoToSelector'

interface GoToBannerProps {
  className?: string
}

export default function GoToBanner ({
  className = ''
}: GoToBannerProps) {
  return <section className={twMerge('', className)}>
    <GoToSelector selector='#banner' className='focus:outline-none focus:ring-0 group'>
      <HiChevronDoubleDown className='animate-bounce transition-all duration-[0.8s] text-zinc-500 group-hover:text-zinc-100 group-focus:text-zinc-100 w-8 h-8 group-hover:w-12 group-hover:h-12 group-focus:w-12 group-focus:h-12' />
    </GoToSelector>
  </section>
}
