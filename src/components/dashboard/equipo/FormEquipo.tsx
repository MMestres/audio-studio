'use client'

import Checkbox from '@/components/dashboard/Checkbox'
import FileInput from '@/components/dashboard/FileInput'
import TextArea from '@/components/dashboard/TextArea'
import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { type Ressource } from '@/types/Ressource'
import { saveRessource, saveRessourceImage } from '@/data/ressources'

interface FormServicioProps {
  ressource?: Ressource
}

export default function FormEquipo ({
  ressource
}: FormServicioProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const labelI = e.currentTarget.label as unknown as HTMLInputElement
    const descriptionI = e.currentTarget.description as unknown as HTMLTextAreaElement
    const ressourceI = e.currentTarget.ressource as unknown as HTMLInputElement
    return await saveRessource(ressource?.id, labelI.value, descriptionI.value, ressourceI.checked)
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

      await saveRessourceImage(ressource?.id, filename, base64)
    }
  }

  return <div className="flex flex-col gap-8">
  <h2 className="text-6xl font-bold">{ressource?.id != null ? 'Editar equipo' : 'Nuevo equipo'}</h2>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <Form title='Textos del equipo' submit={handleSubmit}>
      <Input name='label' label='Título' value={ressource?.label} />
      <TextArea name='description' label='Descripción' value={ressource?.description} />
      <Checkbox name='ressource' label='Equipo destacado en la página de equipo' checked={ressource?.ressource} />
    </Form>
    <Form title='Imagen del equipo' submit={handleSubmitMedia}>
      <FileInput name='image' value={ressource?.image} />
    </Form>
  </div>
</div>
}
