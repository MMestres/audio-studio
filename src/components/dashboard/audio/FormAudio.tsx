'use client'

import Checkbox from '@/components/dashboard/Checkbox'
import FileInput from '@/components/dashboard/FileInput'
import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { type Audio } from '@/types/Audio'
import { saveAudio, saveAudioFile, saveAudioImage } from '@/data/audios'

interface FormAudioProps {
  audio?: Audio
}

export default function FormAudio ({
  audio
}: FormAudioProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const titleI = e.currentTarget.title as unknown as HTMLInputElement
    const artistsI = e.currentTarget.artists as unknown as HTMLTextAreaElement
    const audioI = e.currentTarget.audio as unknown as HTMLInputElement
    return await saveAudio(audio?.id, titleI.value, artistsI.value, audioI.checked)
  }

  const handleSubmitImage = async (e: React.FormEvent<HTMLFormElement>) => {
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

      await saveAudioImage(audio?.id, filename, base64)
    }
  }

  const handleSubmitSong = async (e: React.FormEvent<HTMLFormElement>) => {
    const inputI = e.currentTarget.file as unknown as HTMLInputElement
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

      await saveAudioFile(audio?.id, filename, base64)
    }
  }

  return <div className="flex flex-col gap-8">
  <h2 className="text-6xl font-bold">{audio?.id != null ? 'Editar audio' : 'Nuevo audio'}</h2>
  <div className="grid grid-cols-2 gap-4">
    <Form className='row-span-2' title='Textos del audio' submit={handleSubmit}>
      <Input name='title' label='Título' value={audio?.title} />
      <Input name='artists' label='Artistas' value={audio?.artists} />
      <Checkbox name='audio' label='Audio destacado en la página de audio' checked={audio?.audio} />
    </Form>
    <Form title='Imagen de portada' submit={handleSubmitImage}>
      <FileInput name='image' value={audio?.image} />
    </Form>
    <Form title='Audio' submit={handleSubmitSong}>
      <FileInput name='file' value={audio?.file} type='audio' />
    </Form>
  </div>
</div>
}
