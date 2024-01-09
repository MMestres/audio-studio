'use client'

import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { GiGuitarHead } from 'react-icons/gi'

import Button from '@/components/dashboard/Button'
import ButtonAction from '@/components/dashboard/ButtonAction'
import { deleteRessource, swapRessources } from '@/data/ressources'
import { type Ressource } from '@/types/Ressource'
import { useDragSwapper } from '@/hooks/useDragSwapper'

interface DraggableEquipoProps {
  ressources: Ressource[]
}

export default function DraggableEquipo ({
  ressources
}: DraggableEquipoProps) {
  const dragSwapper = useDragSwapper({
    onSwap: swapRessources
  })

  const classState = dragSwapper.state === 'success'
    ? 'bg-green-500/20'
    : dragSwapper.state === 'error'
      ? 'bg-red-500/20'
      : dragSwapper.state === 'pending'
        ? 'bg-zinc-500/20'
        : ''

  return <tbody className={`flex flex-col gap-4 lg:table-row-group ${classState}`}>
    {ressources.map((ressource, index) => {
      const description = ressource.description.split('\n')[0] + (ressource.description.split('\n').length > 1 ? '...' : '')

      return <tr draggable id={ressource.id} key={ressource.id} {...dragSwapper} className={`grid grid-cols-3 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'border-t' : ''} border-black/40 hover:bg-black/20 cursor-grab rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:pl-6 lg:py-4 text-center order-3 flex place-content-end lg:table-cell col-span-2">
          {ressource.ressource && <GiGuitarHead className="w-6 h-6 text-gray-500" title="Equipo destacado en la página de equipo" />}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 order-1 row-span-4 grid place-content-center lg:table-cell">
          {ressource.image != null && <picture>
            <img src={ressource.image} alt={ressource.label} className="w-36" />
          </picture>}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-lg lg:text-base text-zinc-200 whitespace-nowrap col-span-2 order-4">
            <p>{ressource.label}</p>
        </td>
        <td scope="row" className="llg:px-6 lg:py-4 text-zinc-400 order-6 col-span-2">
            <p>{description}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right order-7 col-span-2">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            <Button className='p-2'>
              <Link href={`/dashboard/equipo/${ressource.id}`}>
                <AiFillEdit className="inline w-6 h-6" title="Editar equipo" />
              </Link>
            </Button>
            <ButtonAction id={ressource.id} className='hover:text-red-400 hover:border-red-400' serverAction={deleteRessource}>
              <AiFillDelete className="inline w-6 h-6" title="Eliminar equipo" />
            </ButtonAction>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
