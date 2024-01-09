'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { type Comment } from '@/types/Comment'
import TextArea from '../TextArea'
import { saveCommentFromDash } from '@/data/comments'

interface FormCommentProps {
  comment?: Comment
}

export default function FormComment ({
  comment
}: FormCommentProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const titleI = e.currentTarget.title as unknown as HTMLInputElement
    const commentI = e.currentTarget.comment as unknown as HTMLTextAreaElement
    return await saveCommentFromDash(comment?.id, titleI.value, commentI.value)
  }

  return <div className="flex flex-col gap-8">
  <h2 className="text-6xl font-bold">{comment?.id != null ? 'Editar opinión' : 'Nueva opinión'}</h2>
  <div className="flex flex-col gap-4">
    <Form title='Textos del bloque de estudio' submit={handleSubmit}>
      <Input name='title' label='¿Quién?' value={comment?.title} />
      <TextArea name='comment' label='¿Qué opina?' value={comment?.comment} />
    </Form>
  </div>
</div>
}
