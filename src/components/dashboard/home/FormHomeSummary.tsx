'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { saveHomeProps } from '@/data/home'
import { type HomeSummary } from '@/types/HomeSummary'
import { type Service } from '@/types/Service'
import Select from '@/components/dashboard/Select'
import { type Ressource } from '@/types/Ressource'
import { type Studio } from '@/types/Studio'

interface FormHomeSummaryProps {
  homeSummary?: HomeSummary
  services: Service[]
  ressources: Ressource[]
  studios: Studio[]
}

export default function FormHomeSummary ({
  homeSummary, services, ressources, studios
}: FormHomeSummaryProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const summaryTextI = e.currentTarget.summaryText as unknown as HTMLInputElement
    const serviceTextI = e.currentTarget.serviceText as unknown as HTMLInputElement
    const ressourceTextI = e.currentTarget.ressourceText as unknown as HTMLInputElement
    const studioTextI = e.currentTarget.studioText as unknown as HTMLInputElement
    const serviceI = e.currentTarget.service as unknown as HTMLSelectElement
    const ressourceI = e.currentTarget.ressource as unknown as HTMLSelectElement
    const studioI = e.currentTarget.studio as unknown as HTMLSelectElement

    return await saveHomeProps({
      summaryText: summaryTextI.value,
      serviceText: serviceTextI.value,
      ressourceText: ressourceTextI.value,
      studioText: studioTextI.value,
      service: serviceI.value,
      ressource: ressourceI.value,
      studio: studioI.value
    })
  }

  return <div className="flex flex-col gap-8">
    <Form title='Resumen servicios' submit={handleSubmit}>
      <Input name='summaryText' label='Texto del bloque servicio' value={homeSummary?.summaryText} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className='flex flex-col gap-4'>
          <Select name='service' label="Servicio destacado" options={services} optionValue={option => option.id} optionLabel={option => option.label} value={homeSummary?.service} />
          <Select name='ressource' label="Equipo destacado" options={ressources} optionValue={option => option.id} optionLabel={option => option.label} value={homeSummary?.ressource} />
          <Select name='studio' label="Foto de estudio destacada" options={studios} optionValue={option => option.id} optionLabel={option => option.label} value={homeSummary?.studio} />
        </div>
        <div className='flex flex-col gap-4'>
          <Input name='serviceText' label='Texto del bloque equipo' value={homeSummary?.serviceText} />
          <Input name='ressourceText' label='Texto del bloque estudio' value={homeSummary?.ressourceText} />
          <Input name='studioText' label='Título' value={homeSummary?.studioText} />
        </div>
      </div>
    </Form>
  </div>
}
