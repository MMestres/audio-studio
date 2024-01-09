'use client'

import { useRef, useState } from 'react'

import { type PlayListItemSummary } from '@/types/PlayListItemSummary'

interface VideoListProps {
  videos: PlayListItemSummary[]
}

export default function VideoList ({
  videos
}: VideoListProps) {
  const [active, setActive] = useState('')
  const iframe = useRef<HTMLIFrameElement>(null)

  const orderedVideos = videos.sort((a, b) => {
    if (a.videoId === b.videoId) return 0
    if (a.videoId === active) return -1
    if (b.videoId === active) return 1
    return 0
  })

  const handleClick = (id: string) => {
    setActive(id)
    iframe.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-2 md:mt-0 md:p-4'>
    {orderedVideos.map((video) => {
      return <div key={video.videoId} className={`${active === video.videoId ? 'lg:row-span-2 lg:col-span-2' : 'hover:scale-[1.02]'} cursor-pointer relative shadow-md shadow-black/50 z-10 transition duration-[0.8s]`} onClick={() => { handleClick(video.videoId) }}>
        {active === video.videoId && <iframe src={`https://www.youtube-nocookie.com/embed/${video.videoId}?&autoplay=1`} ref={iframe} className='w-[100%] aspect-video  rounded-md xl:aspect-auto xl:h-[100%]' />}
        {active !== video.videoId && <><picture>
          <img className='rounded-lg object-cover w-[100%] h-[100%] border border-black/50 bg-zinc-950/50' src={`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`} alt={video.title} title={video.title} />
        </picture>
        <div className='absolute rounded-bl-md bottom-0 left-0 right-0 pt-1 px-4 text-sm md:text-md bg-gradient-to-r from-black via-black to-transparent'>
          <h3 className='text-lg mb-1 font-semibold'>{video.title}</h3>
        </div></>}
      </div>
    })}
  </div>
}
