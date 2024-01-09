'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { saveHomeProps } from '@/data/home'
import { type HomeComment } from '@/types/HomeComment'
import TextArea from '../TextArea'

interface FormHomeCommentsProps {
  homeComment?: HomeComment
}

export default function FormHomeComments ({
  homeComment
}: FormHomeCommentsProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const commentTitleI = e.currentTarget.commentTitle as unknown as HTMLInputElement
    const newCommentLinkI = e.currentTarget.newCommentLink as unknown as HTMLInputElement
    const newCommentTitleI = e.currentTarget.newCommentTitle as unknown as HTMLInputElement
    const commentTextI = e.currentTarget.commentText as unknown as HTMLTextAreaElement
    const newCommentTextI = e.currentTarget.newCommentText as unknown as HTMLTextAreaElement
    const messageInputNameI = e.currentTarget.messageInputName as unknown as HTMLInputElement
    const messageInputMessageI = e.currentTarget.messageInputMessage as unknown as HTMLInputElement
    const messageInputSubmitI = e.currentTarget.messageInputSubmit as unknown as HTMLInputElement

    return await saveHomeProps({
      commentTitle: commentTitleI.value,
      commentText: commentTextI.value,
      newCommentLink: newCommentLinkI.value,
      newCommentTitle: newCommentTitleI.value,
      newCommentText: newCommentTextI.value,
      messageInputName: messageInputNameI.value,
      messageInputMessage: messageInputMessageI.value,
      messageInputSubmit: messageInputSubmitI.value
    })
  }

  return <div className="flex flex-col gap-8">
    <Form title='Bloque de opiniones' submit={handleSubmit}>
      <Input name='commentTitle' label='Título del bloque' value={homeComment?.commentTitle} />
      <TextArea name='commentText' label='Texto del bloque' value={homeComment?.commentText} />
      <Input name='newCommentLink' label='Texto del enlace al popup de nuevo comentario' value={homeComment?.newCommentLink} />
      <Input name='newCommentTitle' label='Título del popup de nuevo comentario' value={homeComment?.newCommentTitle} />
      <TextArea name='newCommentText' label='Texto del popup de nuevo comentario' value={homeComment?.newCommentText} />
      <Input name='messageInputName' label='Campo de nombre del formulario' value={homeComment?.messageInputName} />
      <Input name='messageInputMessage' label='Campo de mensaje del formulario' value={homeComment?.messageInputMessage} />
      <Input name='messageInputSubmit' label='Botón de envío del formulario' value={homeComment?.messageInputSubmit} />
    </Form>
  </div>
}
