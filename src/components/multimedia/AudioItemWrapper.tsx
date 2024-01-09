import AudioItem from './AudioItem'
import { getAudio } from '@/data/audios'

interface AudioItemWrapperProps {
  songId: string
}

export default async function AudioItemWrapper ({
  songId
}: AudioItemWrapperProps) {
  const audio = await getAudio(songId)

  return <AudioItem audio={audio} className='mb-4' />
}
