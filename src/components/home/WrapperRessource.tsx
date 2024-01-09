'use client'

import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

interface WrapperRessourceProps {
  image: string
  title: string
}

export default function WrapperRessource ({
  image, title
}: WrapperRessourceProps) {
  const [refResources, inViewResources] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  return <Link href={'/equipo'} ref={refResources} className={`${inViewResources ? 'animatecss animatecss-fast animatecss-slideInLeft' : 'opacity-0'} relative transition duration-[0.8s] hover:scale-[1.02] w-[100%] h-[100%]`}>
  <picture>
    <img className='rounded-lg border border-black/50 bg-zinc-950/50 shadow-md shadow-black/50 w-[100%] h-[100%] object-cover object-center' src={image} alt={title}></img>
  </picture>
  <span className='absolute left-1 bottom-1 right-1 bg-zinc-950/80 text-sm p-2 rounded-md text-zinc-200'>{title}</span>
</Link>
}
