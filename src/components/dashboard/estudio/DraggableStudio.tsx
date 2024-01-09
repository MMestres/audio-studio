'use client'

import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

import Button from '@/components/dashboard/Button'
import ButtonAction from '@/components/dashboard/ButtonAction'
import { deleteStudio, swapStudios } from '@/data/studio'
import { type Studio } from '@/types/Studio'
import { useDragSwapper } from '@/hooks/useDragSwapper'

interface DraggableStudioProps {
  studios: Studio[]
}

export default function DraggableStudio ({
  studios
}: DraggableStudioProps) {
  const dragSwapper = useDragSwapper({
    onSwap: swapStudios
  })

  const classState = dragSwapper.state === 'success'
    ? 'bg-green-500/20'
    : dragSwapper.state === 'error'
      ? 'bg-red-500/20'
      : dragSwapper.state === 'pending'
        ? 'bg-zinc-500/20'
        : ''

  return <tbody className={`flex flex-col gap-4 lg:table-row-group ${classState}`}>
    {studios.map((studio, index) => {
      return <tr draggable id={studio.id} key={studio.id} {...dragSwapper} className={`grid grid-cols-3 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'border-t' : ''} border-black/40 hover:bg-black/20 cursor-grab rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:px-6 lg:py-4 order-1 row-span-3 grid place-content-center lg:table-cell">
          {studio.image != null && <picture>
            <img src={studio.image} alt={studio.label} className="w-36" />
          </picture>}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-lg lg:text-base text-zinc-200 whitespace-nowrap col-span-2 order-3">
          <p>{studio.label}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right order-4 col-span-2">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            <Button className='p-2'>
              <Link href={`/dashboard/estudio/${studio.id}`}>
                <AiFillEdit className="inline w-6 h-6" title="Editar bloque de estudio" />
              </Link>
            </Button>
            <ButtonAction id={studio.id} className='hover:text-red-400 hover:border-red-400' serverAction={deleteStudio} >
              <AiFillDelete className="inline w-6 h-6" title="Eliminar bloque estudio" />
            </ButtonAction>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
