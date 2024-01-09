import { getStudios } from '@/data/studio'
import DraggableStudio from './DraggableStudio'

export default async function ListStudio () {
  const studios = await getStudios()

  return <DraggableStudio studios={studios} />
}
