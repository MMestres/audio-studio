import { getRessources } from '@/data/ressources'
import DraggableEquipo from './DraggableEquipo'

export default async function ListEquipo () {
  const ressources = await getRessources()

  return <DraggableEquipo ressources={ressources} />
}
