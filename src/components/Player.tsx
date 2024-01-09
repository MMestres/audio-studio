'use client'

import { twMerge } from 'tailwind-merge'
import { FaPause, FaPlay } from 'react-icons/fa'
import { BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs'
import { ImVolumeMute, ImVolumeLow, ImVolumeMedium, ImVolumeHigh, ImVolumeMute2 } from 'react-icons/im'

import AudioItem from '@/components/multimedia/AudioItem'
import Slider from '@/components/layout/Slider'
import { usePlayer } from '@/hooks/usePlayer'

interface PlayerProps {
  className?: string
  initialId?: string
}

export default function Player ({
  className = ''
}: PlayerProps) {
  const {
    ref, volumen, changeVolume, mute, play, next, prev, handleTimeUpdate, handleUpdateCurrentTime, currentTime, current, playing, first, last, setShowVolume, showVolume, currentTimeString, durationTimeString
  } = usePlayer()

  return <div className={twMerge('grid grid-cols-[minmax(100px,1fr),120px,50px] md:grid-cols-[200px,1fr,200px] items-center', className)}>
    <AudioItem audio={current} hidePlayButton />
    <div className='flex flex-col items-center justify-center gap-1'>
      <div className='flex flex-row items-center justify-center gap-1 lg:gap-4'>
        <button className={`w-10 h-10 flex items-center justify-center ${!first ? 'group text-zinc-100 hover:scale-125 focus:scale-125 focus:outline-none focus:ring-0 hover:text-zinc-300 focus:text-zinc-300' : 'text-zinc-700'} transition duration-[0.8s]`} onClick={prev} disabled={first}>
          <BsFillSkipStartFill className='relative text-2xl left-[1px] transition duration-[0.8s]' />
        </button>
        <button className='w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center hover:bg-zinc-300 hover:scale-105 hover:shadow-md hover:shadow-black focus:bg-zinc-300 focus:scale-105 focus:shadow-md focus:shadow-black focus:outline-none focus:ring-0 transition duration-[0.8s]' onClick={play}>
          {!playing && <FaPlay className='relative text-zinc-800 text-sm left-[1px]' />}
          {playing && <FaPause className='relative text-zinc-800 text-sm' />}
        </button>
        <button className={`w-10 h-10 flex items-center justify-center ${!last ? 'group text-zinc-100 hover:scale-125 focus:scale-125 focus:outline-none focus:ring-0 hover:text-zinc-300 focus:text-zinc-300' : 'text-zinc-700'} transition duration-[0.8s]`} onClick={next} disabled={last}>
          <BsFillSkipEndFill className='relative text-2xl left-[1px] transition duration-[0.8s]' />
        </button>
      </div>
      <div className='hidden md:flex flex-row items-center justify-center gap-3 text-xs text-zinc-600'>
        <span className='w-10 text-right'>{currentTimeString}</span>
        <Slider className='w-24 md:w-56 lg:w-96' value={currentTime} max={ref.current?.duration} onChange={handleUpdateCurrentTime} />
        <span className='w-10'>{durationTimeString}</span>
      </div>
    </div>
    <div className='relative flex flew-row justify-end items-center gap-2'>
      <button className='flex md:hidden text-xl text-zinc-100 hover:text-zinc-300 focus:text-zinc-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-0 transition duration-[0.8s]' onClick={() => { setShowVolume(() => !showVolume) }}>
        {(volumen === 0) && <ImVolumeMute2 />}
        {(volumen >= 1 && volumen < 15) && <ImVolumeMute />}
        {(volumen >= 15 && volumen < 50) && <ImVolumeLow />}
        {(volumen >= 50 && volumen < 85) && <ImVolumeMedium />}
        {(volumen >= 85) && <ImVolumeHigh />}
      </button>
      <button onClick={mute} className='hidden md:flex text-xl text-zinc-100 hover:text-zinc-300 focus:text-zinc-300 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-0  transition duration-[0.8s]'>
        {(volumen === 0) && <ImVolumeMute2 />}
        {(volumen >= 1 && volumen < 15) && <ImVolumeMute />}
        {(volumen >= 15 && volumen < 50) && <ImVolumeLow />}
        {(volumen >= 50 && volumen < 85) && <ImVolumeMedium />}
        {(volumen >= 85) && <ImVolumeHigh />}
      </button>
      <Slider className={`w-48 md:w-24 h-5 md:h-1 ${showVolume ? 'flex' : 'hidden'} md:flex absolute -rotate-90 bottom-[120px] -right-[80px] md:relative md:rotate-0 md:bottom-0 md:right-0`} value={volumen} min={0} max={100} onChange={changeVolume} />
    </div>
    <audio src={current?.file} ref={ref} onEnded={next} onTimeUpdate={handleTimeUpdate} />
  </div>
}
