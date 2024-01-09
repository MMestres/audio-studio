import { twMerge } from 'tailwind-merge'
import { getHomeSummary } from '@/data/home'
import WrapperRessource from './WrapperRessource'
import { getRessource } from '@/data/ressources'
import { getService } from '@/data/services'
import { getStudio } from '@/data/studio'
import WrapperService from './WrapperService'
import WrapperStudio from './WrapperStudio'

interface ResourcesProps {
  className?: string
}

export default async function Ressources ({
  className = ''
}: ResourcesProps) {
  const homeSummary = await getHomeSummary()
  const ressource = homeSummary?.ressource != null ? await getRessource(homeSummary?.ressource) : null
  const service = homeSummary?.service != null ? await getService(homeSummary?.service) : null
  const studio = homeSummary?.studio != null ? await getStudio(homeSummary?.studio) : null

  return <section className={twMerge('', className)}>
    <div className='mb-4'>
      <div className="flex items-center w-full mb-5 lg:w-[80%] mx-auto">
        <hr className="flex-1 border-gray-300" />
        <div className="px-3 text-gray-100 texl:lg md:text-2xl">{homeSummary?.summaryText}</div>
        <hr className="flex-1 border-gray-200" />
      </div>
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
      <WrapperRessource image={ressource?.image ?? ''} title={homeSummary?.ressourceText ?? ''} />
      <WrapperService image={service?.image ?? ''} title={homeSummary?.serviceText ?? ''} />
      <WrapperStudio image={studio?.image ?? ''} title={homeSummary?.studioText ?? ''} />
    </div>
  </section>
}
