'use client'

import { usePlayerStore } from '@/hooks/usePlayerStore'
import { FaPlay, FaPause } from 'react-icons/fa'
import { MdNoPhotography } from 'react-icons/md'

import { type Audio } from '@/types/Audio'

interface WrapperCurrentProps {
  audios: Audio[]
  audio?: Audio
}

export default function WrapperCurrent ({
  audios, audio
}: WrapperCurrentProps) {
  const current = usePlayerStore((state) => state.current)
  const play = usePlayerStore((state) => state.play)
  const playing = usePlayerStore((state) => state.playing)
  const playID = usePlayerStore((state) => state.playID)

  let audioRender = audios.find(a => a.id === audio?.id)
  if (audioRender == null) audioRender = current

  const isCurrent = current?.id != null && audioRender?.id === current?.id

  const handlePlay = () => {
    if (!isCurrent && audioRender != null) {
      playID(audioRender.id)
    } else {
      play()
    }
  }

  return <div className='relative'>
    {audioRender?.image != null && <picture><img src={audioRender?.image} className='w-64 h-64 object-cover rounded-md shadow-sm shadow-black border border-black/50' alt={audioRender.title} title={audioRender.title} /></picture>}
    {audioRender?.image == null && <div className='w-64 h-64 bg-black  rounded-md shadow-sm shadow-black flex items-center justify-center'><MdNoPhotography className="text-3xl text-zinc-800" /></div>}
    <button className='absolute w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center left-4 bottom-4 transition duration-[0.8s] hover:bg-zinc-300 hover:scale-105 hover:shadow-md hover:shadow-black focus:bg-zinc-300 focus:scale-105 focus:shadow-md focus:shadow-black' onClick={handlePlay}>
      {(!isCurrent || !playing) && <FaPlay className='relative text-zinc-800 text-sm left-[1px]' />}
      {isCurrent && playing && <FaPause className='relative text-zinc-800 text-sm' />}
    </button>
  </div>
}
