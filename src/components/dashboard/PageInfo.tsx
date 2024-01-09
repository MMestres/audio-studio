'use client'

import { getPageInfo, saveHeaderData, saveMetadata } from '@/data/pages'
import { useEffect, useState } from 'react'
import { type PageInfo as PageInfoType } from '@/types/PageInfo'

import Form from './Form'
import Input from './Input'
import TextArea from './TextArea'
import Checkbox from './Checkbox'

interface PageProps {
  pageID: string
}

export default function PageInfo ({
  pageID
}: PageProps) {
  const [pageInfo, setPageInfo] = useState<PageInfoType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getPageInfo(pageID).then((data) => {
      if (data != null) {
        setPageInfo(data)
      }
      setLoading(false)
    }).catch((err) => {
      console.error(err)
      setLoading(false)
    })
  }, [pageID])

  const handleSubmitHeader = async (e: React.FormEvent<HTMLFormElement>) => {
    const title = e.currentTarget.title as unknown as HTMLInputElement
    const subtitle = e.currentTarget.subtitle as unknown as HTMLTextAreaElement
    return await saveHeaderData(pageID, title.value, subtitle.value)
  }

  const handleSubmitMetadata = async (e: React.FormEvent<HTMLFormElement>) => {
    const metatitle = e.currentTarget.metatitle as unknown as HTMLInputElement
    const metadescription = e.currentTarget.metadescription as unknown as HTMLTextAreaElement
    const keywords = e.currentTarget.keywords as unknown as HTMLInputElement
    const index = e.currentTarget.index as unknown as HTMLInputElement
    const follow = e.currentTarget.follow as unknown as HTMLInputElement
    return await saveMetadata(pageID, metatitle.value, metadescription.value, index.checked, follow.checked, keywords.value)
  }

  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <Form title="Cabecera" submit={handleSubmitHeader} loading={loading}>
    <Input name="title" label="Título" value={pageInfo?.title} />
    <TextArea rows={8} name="subtitle" label="Subtítulo" value={pageInfo?.subtitle} />
  </Form>
  <Form title="Metadatos" submit={handleSubmitMetadata} loading={loading}>
    <Input name="metatitle" label="Meta title" value={pageInfo?.metatitle} />
    <TextArea rows={4} name="metadescription" label="Meta description" value={pageInfo?.metadescription} />
    <Input name="keywords" label="Keywords" value={pageInfo?.keywords} />
    <div className='flex flex-row justify-evenly'>
      <Checkbox name="index" label="Indexar" checked={pageInfo?.index} />
      <Checkbox name="follow" label="Seguir" checked={pageInfo?.follow} />
    </div>
  </Form>
</div>
}
