import { getHomeBlock } from '@/data/home'
import FormHomeBlock from './FormHomeBlock'
import { getAudios } from '@/data/audios'

export default async function DashHomeBlock () {
  const homeBlock = await getHomeBlock()
  const audios = await getAudios()

  return <FormHomeBlock audios={audios} homeBlock={homeBlock} />
}
