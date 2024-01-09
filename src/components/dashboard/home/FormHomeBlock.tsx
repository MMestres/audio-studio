'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import Select from '@/components/dashboard/Select'
import { saveHomeProps } from '@/data/home'
import { type HomeBlock } from '@/types/HomeBlock'
import { type Audio } from '@/types/Audio'
import TextArea from '../TextArea'

interface FormHomeBlockProps {
  homeBlock?: HomeBlock
  audios: Audio[]
}

export default function FormHomeBlock ({
  homeBlock, audios
}: FormHomeBlockProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const contactButtonTextI = e.currentTarget.contactButtonText as unknown as HTMLInputElement
    const topTextI = e.currentTarget.topText as unknown as HTMLTextAreaElement
    const smallTopTextI = e.currentTarget.smallTopText as unknown as HTMLInputElement
    const commentButtonTextI = e.currentTarget.commentButtonText as unknown as HTMLInputElement
    const audioI = e.currentTarget.audio as unknown as HTMLSelectElement
    return await saveHomeProps({
      contactButtonText: contactButtonTextI.value,
      topText: topTextI.value,
      smallTopText: smallTopTextI.value,
      commentButtonText: commentButtonTextI.value,
      audio: audioI.value
    })
  }

  return <div className="flex flex-col gap-8">
    <Form title='Cabecera (más datos)' submit={handleSubmit}>
      <Select name='audio' label='Audio destacado' options={audios} optionValue={option => option.id} optionLabel={option => option.title + ' - ' + option.artists} value={homeBlock?.audio} />
      <Input name='contactButtonText' label='Botón a contacto' value={homeBlock?.contactButtonText} />
      <TextArea name='topText' label='Texto entre botones' value={homeBlock?.topText} />
      <Input name='smallTopText' label='Texto divisorio' value={homeBlock?.smallTopText} />
      <Input name='commentButtonText' label='Botón a comentarios' value={homeBlock?.commentButtonText} />
    </Form>
  </div>
}
