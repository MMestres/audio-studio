import { getServices } from '@/data/services'
import DraggableServicios from './DraggableServicios'

export default async function ListServicios () {
  const services = await getServices()
  return <DraggableServicios services={services} />
}
