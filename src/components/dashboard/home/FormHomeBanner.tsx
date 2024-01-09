'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { saveHomeFileProps, saveHomeProps } from '@/data/home'
import TextArea from '../TextArea'
import { type HomeBanner } from '@/types/HomeBanner'
import FileInput from '../FileInput'

interface FormHomeBannerProps {
  homeBanner?: HomeBanner
}

export default function FormHomeBanner ({
  homeBanner
}: FormHomeBannerProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const bannerTitleI = e.currentTarget.bannerTitle as unknown as HTMLInputElement
    const bannerTextI = e.currentTarget.bannerText as unknown as HTMLTextAreaElement

    return await saveHomeProps({
      bannerTitle: bannerTitleI.value,
      bannerText: bannerTextI.value
    })
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

      await saveHomeFileProps({
        bannerImage: {
          filename,
          file: base64
        }
      })
    }
  }

  return <div className="flex flex-col gap-8">
    <Form title='Banner' submit={handleSubmit}>
      <Input name='bannerTitle' label='Título del banner' value={homeBanner?.bannerTitle} />
      <TextArea name='bannerText' label='Texto del banner' value={homeBanner?.bannerText} />
    </Form>
    <Form title='Imagen de banner' submit={handleSubmitMedia}>
      <FileInput name='image' value={homeBanner?.bannerImage} />
    </Form>
  </div>
}
