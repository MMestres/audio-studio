import FormComment from '@/components/dashboard/opiniones/FormComment'
import { getComment } from '@/data/comments'

export default async function Page ({
  params
}: {
  params: { id: string }
}) {
  const studio = await getComment(params.id)

  if (studio == null) {
    return <p>Not found</p>
  }

  return <div className='p-8 h-[100%] overflow-x-hidden overflow-y-auto'>
    <FormComment comment={studio} />
  </div>
}
