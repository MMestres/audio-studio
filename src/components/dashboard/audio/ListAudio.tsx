import { getAudios } from '@/data/audios'
import DraggableAudio from './DraggableAudio'

export default async function ListAudio () {
  const audios = await getAudios()

  return <DraggableAudio audios={audios} />
}
