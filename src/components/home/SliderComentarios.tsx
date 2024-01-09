'use client'

import { twMerge } from 'tailwind-merge'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { type Comment } from '@/types/Comment'
import { useSliderComments } from '@/hooks/useSliderComments'

interface SliderComentariosProps {
  className?: string
  comments: Comment[]
}

export default function SliderComentarios ({
  className = '', comments
}: SliderComentariosProps) {
  const { filteredComments, controledClassName, ref, prev, next } = useSliderComments({ comments, className })

  return <div ref={ref} className={twMerge('relative grid grid-cols-1 lg:grid-cols-2 gap-6', controledClassName)}>
    <button className='absolute top-[calc(50%+20px)] -left-[30px] transform -translate-y-1/2 text-6xl text-zinc-400 rounded-full cursor-pointer transition duration-[0.8s] hover:shadow-md hover:shadow-black hover:text-zinc-100 hover:bg-zinc-900 focus:shadow-md focus:shadow-black focus:text-zinc-100 focus:bg-zinc-900 focus:outline-none focus:ring-0' onClick={prev}>
      <HiChevronLeft />
    </button>
    {filteredComments.map((comentario) => {
      return <div key={comentario.id} className='flex flex-col bg-zinc-950 shadow-md shadow-black border border-black p-4 lg:p-8 rounded-md gap-3 h-[400px]'>
      <h3 className='text-2xl font-bold text-zinc-100'>{comentario.title}</h3>
      <hr className='border-t-zinc-800' />
      <p className='text-zinc-400 text-lg overflow-hidden text-clip'>{comentario.comment}</p>
    </div>
    })}
    <button className='absolute top-[calc(50%+20px)] -right-[30px] transform -translate-y-1/2 text-6xl text-zinc-100 rounded-full cursor-pointer transition duration-[0.8s] hover:shadow-md hover:shadow-black hover:text-zinc-100 hover:bg-zinc-900 focus:shadow-md focus:shadow-black focus:text-zinc-100 focus:bg-zinc-900 focus:outline-none focus:ring-0' onClick={next}>
      <HiChevronRight />
    </button>
  </div>
}
