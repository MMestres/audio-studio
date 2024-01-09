import FormStudio from '@/components/dashboard/estudio/FormStudio'
import { getStudio } from '@/data/studio'

export default async function Page ({
  params
}: {
  params: { id: string }
}) {
  const studio = await getStudio(params.id)

  if (studio == null) {
    return <p>Not found</p>
  }

  return <div className='p-8 h-[100%] overflow-x-hidden overflow-y-auto'>
    <FormStudio studio={studio} />
  </div>
}
