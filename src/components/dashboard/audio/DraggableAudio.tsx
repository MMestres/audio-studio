'use client'

import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { GiCompactDisc } from 'react-icons/gi'

import Button from '@/components/dashboard/Button'
import ButtonAction from '@/components/dashboard/ButtonAction'
import { deleteAudio, swapAudios } from '@/data/audios'

import { type Audio } from '@/types/Audio'
import { useDragSwapper } from '@/hooks/useDragSwapper'

interface DraggableAudioProps {
  audios: Audio[]
}

export default function DraggableAudio ({
  audios
}: DraggableAudioProps) {
  const dragSwapper = useDragSwapper({
    onSwap: swapAudios
  })

  const classState = dragSwapper.state === 'success'
    ? 'bg-green-500/20'
    : dragSwapper.state === 'error'
      ? 'bg-red-500/20'
      : dragSwapper.state === 'pending'
        ? 'bg-zinc-500/20'
        : ''

  return <tbody className={`flex flex-col gap-4 lg:table-row-group ${classState}`}>
    {audios.map((audio, index) => {
      return <tr draggable id={audio.id} key={audio.id} {...dragSwapper} className={`grid grid-cols-3 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'border-t' : ''} border-black/40 hover:bg-black/20 cursor-grab rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:pl-6 lg:py-4 text-center order-3 flex place-content-end lg:table-cell col-span-2">
          {audio.audio && <GiCompactDisc className="w-6 h-6 text-gray-500" title="Equipo destacado en la página de audios" />}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 order-1 row-span-4 grid place-content-center lg:table-cell">
          {audio.image != null && <picture>
            <img src={audio.image} alt={audio.title} className='aspect-square object-cover object-center' />
          </picture>}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-lg lg:text-base text-zinc-200 whitespace-nowrap col-span-2 order-4">
            <p>{audio.title}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-zinc-400 order-6 col-span-2">
            <p>{audio.artists}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right order-7 col-span-2">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            <Button className='p-2'>
              <Link href={`/dashboard/audio/${audio.id}`}>
                <AiFillEdit className="inline w-6 h-6" title="Editar audio" />
              </Link>
            </Button>
            <ButtonAction id={audio.id} className='hover:text-red-400 hover:border-red-400' serverAction={deleteAudio}>
              <AiFillDelete className="inline w-6 h-6" title='Eliminar audio' />
            </ButtonAction>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
