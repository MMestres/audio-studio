import { twMerge } from 'tailwind-merge'

import SliderComentarios from '@/components/home/SliderComentarios'
import { getHomeComment } from '@/data/home'
import { getPublicComments } from '@/data/comments'
import NewComment from './NewComment'

interface ComentariosSectionProps {
  className?: string
  id: string
}

export default async function ComentariosSection ({
  className = '', id
}: ComentariosSectionProps) {
  const homeComment = await getHomeComment()
  const comments = await getPublicComments()

  return <section id={id} className={twMerge('flex flex-col gap-4', className)}>
    <h3 className='text-3xl font-semibold text-zinc-100'>{homeComment?.commentTitle}</h3>
    {homeComment?.commentText.split('\n').map((text, index) =>
      <p key={index} className='text-xl text-zinc-400'>{text}</p>
    )}
    <SliderComentarios className='pt-8 lg:pt-12 mb-4' comments={comments} />
    <NewComment linkTxt={homeComment?.newCommentLink ?? ''} title={homeComment?.newCommentTitle ?? ''} text={homeComment?.newCommentText ?? ''} txtName={homeComment?.messageInputName ?? ''} txtMessage={homeComment?.messageInputMessage ?? ''} txtButton={homeComment?.messageInputSubmit ?? ''} />
  </section>
}
