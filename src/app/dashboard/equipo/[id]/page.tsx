import FormEquipo from '@/components/dashboard/equipo/FormEquipo'
import { getRessource } from '@/data/ressources'

export default async function Page ({
  params
}: {
  params: { id: string }
}) {
  const ressource = await getRessource(params.id)

  if (ressource == null) {
    return <p>Not found</p>
  }

  return <div className='p-8 h-[100%] overflow-x-hidden overflow-y-auto'>
    <FormEquipo ressource={ressource} />
  </div>
}
