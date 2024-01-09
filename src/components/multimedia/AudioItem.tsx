'use client'

import { twMerge } from 'tailwind-merge'
import { MdNoPhotography } from 'react-icons/md'
import { FaPause, FaPlay } from 'react-icons/fa'

import { type Audio } from '@/types/Audio'
import { usePlayerStore } from '@/hooks/usePlayerStore'

interface AudioItemProps {
  className?: string
  audio?: Audio
  hidePlayButton?: boolean
}

export default function AudioItem ({
  className = '', audio, hidePlayButton = false
}: AudioItemProps) {
  const current = usePlayerStore((state) => state.current)
  const play = usePlayerStore((state) => state.play)
  const playing = usePlayerStore((state) => state.playing)
  const playID = usePlayerStore((state) => state.playID)

  const isCurrent = audio?.id === current?.id

  const handlePlayClick = () => {
    if (audio?.id != null && !isCurrent) {
      playID(audio.id)
    } else {
      play()
    }
  }

  return <div className={twMerge('flex flex-row gap-2 items-center justify-start group', className)}>
    <div className='relative group'>
      {audio?.image != null && <picture><img className='w-14 h-14 object-cover object-center rounded-md shadow-sm shadow-black border border-black/50' src={audio?.image} alt={audio?.title} /></picture>}
      {audio?.image == null && <div className='w-14 h-14 bg-black  rounded-md shadow-sm shadow-black flex items-center justify-center'><MdNoPhotography className="text-3xl text-zinc-800" /></div>}
      {!hidePlayButton && <div className='position absolute inset-0 z-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 w-14 h-14 flex items-center justify-center bg-black/50 rounded-md transition duration-500 ease-in'>
        <button className='w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center' onClick={handlePlayClick}>
          {(!isCurrent || !playing) && <FaPlay className='relative text-zinc-800 text-sm left-[1px]' />}
          {isCurrent && playing && <FaPause className='relative text-zinc-800 text-sm' />}
        </button>
      </div>}
    </div>
    <div className='flex flex-col gap-1 text-zinc-100 w-[calc(100%-70px)]'>
      <button className='text-sm font-semibold group-hover:underline group-hover:text-zinc-300 transition duration-[0.8s] overflow-ellipsis whitespace-nowrap overflow-hidden w-[180px] text-left' onClick={handlePlayClick}>{audio?.title}</button>
      <p className='text-xs font-light text-zinc-300 w-[180px] overflow-ellipsis whitespace-nowrap overflow-hidden'>{audio?.artists}</p>
    </div>
  </div>
}
