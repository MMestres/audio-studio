import FormAudio from '@/components/dashboard/audio/FormAudio'
import { getAudio } from '@/data/audios'

export default async function Page ({
  params
}: {
  params: { id: string }
}) {
  const audio = await getAudio(params.id)

  if (audio == null) {
    return <p>Not found</p>
  }

  return <div className='p-8 h-[100%] overflow-x-hidden overflow-y-auto'>
    <FormAudio audio={audio} />
  </div>
}
