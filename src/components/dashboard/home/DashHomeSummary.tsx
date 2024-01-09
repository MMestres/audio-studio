import { getHomeSummary } from '@/data/home'
import { getRessources } from '@/data/ressources'
import { getServices } from '@/data/services'
import { getStudios } from '@/data/studio'
import FormHomeSummary from './FormHomeSummary'

export default async function DashHomeSummary () {
  const homeSummary = await getHomeSummary()
  const services = await getServices()
  const ressources = await getRessources()
  const studios = await getStudios()

  return <FormHomeSummary
    ressources={ressources}
    services={services}
    studios={studios}
    homeSummary={homeSummary} />
}
