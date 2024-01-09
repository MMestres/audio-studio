'use client'

import Form from '@/components/dashboard/Form'
import Input from '@/components/dashboard/Input'
import { saveVideo } from '@/data/video'
import { type Video } from '@/types/Video'

interface FormVideoProps {
  video?: Video
}

export default function FormVideo ({
  video
}: FormVideoProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const playlistidI = e.currentTarget.playlistid as unknown as HTMLInputElement
    return await saveVideo(video?.id, playlistidI.value)
  }

  return <div className="flex flex-col gap-8">
    <Form title='Lista de reproducción en YouTube' submit={handleSubmit}>
      <Input name='playlistid' label='Código de la lista de reproducción' value={video?.playlistid} />
    </Form>
  </div>
}
