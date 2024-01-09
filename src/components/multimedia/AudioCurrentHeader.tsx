import { type Audio } from '@/types/Audio'
import WrapperCurrent from './WrapperCurrent'
import { getPublicAudios } from '@/data/audios'

interface CurrentSongProps {
  audio?: Audio
}

export default async function AudioCurrentHeader ({
  audio
}: CurrentSongProps) {
  const audios = await getPublicAudios()
  const current = audios[0]

  return <div className='flex flex-col-reverse lg:flex-row-reverse gap-4 mb-8 mx-auto lg:mx-0 lg:px-4'>
    <div className='flex flex-1 flex-col justify-end pb-4'>
      <div>
        <p className='text-sm lg:text-lg text-zinc-300 font-light'>{current.artists}</p>
        <h3 className='text-lg lg:text-2xl text-zinc-100 font-semibold'>{current.title}</h3>
      </div>
    </div>
    <WrapperCurrent audios={audios} audio={audio} />
  </div>
}
