import FormServicio from '@/components/dashboard/servicios/FormServicio'
import { getService } from '@/data/services'

export default async function Page ({
  params
}: {
  params: { id: string }
}) {
  const service = await getService(params.id)

  if (service == null) {
    return <p>Not found</p>
  }

  return <div className='p-8 h-[100%] overflow-x-hidden overflow-y-auto'>
    <FormServicio service={service} />
  </div>
}
