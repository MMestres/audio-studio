import { getAudios } from '@/data/audios'
import AudioItemWrapper from './AudioItemWrapper'

export default async function AudioList () {
  const audios = await getAudios()

  return <div className='md:p-4 grid grid-cols-[repeat(auto-fill,minmax(225px,1fr))] gap-4'>
    {audios.map((audio, index) => {
      return <AudioItemWrapper songId={audio.id} key={audio.id} />
    })}
  </div>
}
