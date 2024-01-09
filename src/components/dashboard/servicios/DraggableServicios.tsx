'use client'

import Link from 'next/link'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { RiShakeHandsFill } from 'react-icons/ri'

import Button from '@/components/dashboard/Button'
import { deleteService, swapServices } from '@/data/services'
import ButtonAction from '@/components/dashboard/ButtonAction'
import { type Service } from '@/types/Service'
import { useDragSwapper } from '@/hooks/useDragSwapper'

interface DraggableServiciosProps {
  services: Service[]
}

export default function DraggableServicios ({
  services
}: DraggableServiciosProps) {
  const dragSwapper = useDragSwapper({
    onSwap: swapServices
  })

  const classState = dragSwapper.state === 'success'
    ? 'bg-green-500/20'
    : dragSwapper.state === 'error'
      ? 'bg-red-500/20'
      : dragSwapper.state === 'pending'
        ? 'bg-zinc-500/20'
        : ''

  return <tbody className={`flex flex-col gap-4 lg:table-row-group ${classState}`}>
    {services.map((service, index) => {
      const description = service.description.split('\n')[0] + (service.description.split('\n').length > 1 ? '...' : '')

      return <tr draggable id={service.id} key={service.id} {...dragSwapper} className={`grid grid-cols-3 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'border-t' : ''} border-black/40 hover:bg-black/20 cursor-grab rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:pl-6 lg:py-4 text-center order-3 flex place-content-end lg:table-cell col-span-2">
          {service.service && <RiShakeHandsFill className="w-6 h-6 text-gray-500" title="Servicio destacado en la página de servicios" />}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 order-1 row-span-4 grid place-content-center lg:table-cell">
          {service.image != null && <picture>
            <img src={service.image} alt={service.label} className="w-36" />
          </picture>}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-lg lg:text-base text-zinc-200 whitespace-nowrap col-span-2 order-4">
            <p>{service.label}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-zinc-400 order-6 col-span-2">
            <p>{description}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right order-7 col-span-2">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            <Button className='p-2'>
              <Link href={`/dashboard/servicios/${service.id}`}>
                <AiFillEdit className="inline w-6 h-6" title="Editar servicio" />
              </Link>
            </Button>
            <ButtonAction id={service.id} className='hover:text-red-400 hover:border-red-400' serverAction={deleteService}>
              <AiFillDelete className="inline w-6 h-6" title="Eliminar servicio" />
            </ButtonAction>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
