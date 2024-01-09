'use client'

import FileInput from '@/components/dashboard/FileInput'
import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { saveStudio, saveStudioImage } from '@/data/studio'
import { type Studio } from '@/types/Studio'

interface FormServicioProps {
  studio?: Studio
}

export default function FormStudio ({
  studio
}: FormServicioProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const labelI = e.currentTarget.label as unknown as HTMLInputElement
    return await saveStudio(studio?.id, labelI.value)
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

      await saveStudioImage(studio?.id, filename, base64)
    }
  }

  return <div className="flex flex-col gap-8">
  <h2 className="text-6xl font-bold">{studio?.id != null ? 'Editar bloque de estudio' : 'Nuevo bloque de estudio'}</h2>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Form title='Textos del bloque de estudio' submit={handleSubmit}>
      <Input name='label' label='Título' value={studio?.label} />
    </Form>
    <Form title='Imagen del bloque de estudio' submit={handleSubmitMedia}>
      <FileInput name='image' value={studio?.image} />
    </Form>
  </div>
</div>
}
