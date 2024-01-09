'use client'

import Checkbox from '@/components/dashboard/Checkbox'
import FileInput from '@/components/dashboard/FileInput'
import TextArea from '@/components/dashboard/TextArea'
import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { type Service } from '@/types/Service'
import { saveService, saveServiceImage } from '@/data/services'

interface FormServicioProps {
  service?: Service
}

export default function FormServicio ({
  service
}: FormServicioProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const labelI = e.currentTarget.label as unknown as HTMLInputElement
    const descriptionI = e.currentTarget.description as unknown as HTMLTextAreaElement
    const serviceI = e.currentTarget.service as unknown as HTMLInputElement
    return await saveService(service?.id, labelI.value, descriptionI.value, serviceI.checked)
  }

  const handleSubmitMedia = async (e: React.FormEvent<HTMLFormElement>) => {
    const inputI = e.currentTarget.image as unknown as HTMLInputElement
    const file = inputI.files?.[0]
    if (file != null) {
      const filename = file.name
      const toBase64 = async (file: File) => await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => { resolve(reader.result) }
        reader.onerror = reject
      })

      const base64 = await toBase64(file)

      await saveServiceImage(service?.id, filename, base64)
    }
  }

  return <div className="flex flex-col gap-8">
  <h2 className="text-6xl font-bold">{service?.id != null ? 'Editar servicio' : 'Nuevo servicio'}</h2>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Form title='Textos del servicio' submit={handleSubmit}>
      <Input name='label' label='Título' value={service?.label} />
      <TextArea name='description' label='Descripción' value={service?.description} />
      <Checkbox name='service' label='Servicio destacado en la página de servicios' checked={service?.service} />
    </Form>
    <Form title='Imagen del servicio' submit={handleSubmitMedia}>
      <FileInput name='image' value={service?.image} />
    </Form>
  </div>
</div>
}
