import { AiFillDelete, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import ButtonAction from '@/components/dashboard/ButtonAction'
import { FaExclamationCircle } from 'react-icons/fa'
import { deleteContactMessage, getContactMessages, markContactMessageRead, markContactMessageUnread } from '@/data/contactmessage'

export default async function ListContactMessages () {
  const messages = await getContactMessages()

  return <tbody className='flex flex-col gap-4 lg:table-row-group'>
    {messages.map((message, index) => {
      return <tr key={message.id} className={`grid grid-cols-2 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'lg:border-t' : ''} border-black/40 hover:bg-black/20 rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:px-1 lg:py-4 lg:pl-3 text-center order-2 flex place-content-end lg:table-cell">
          {!message.read && <FaExclamationCircle className="w-6 h-6 text-yellow-400" title="Mensaje no leído" />}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-400 whitespace-nowrap order-1">
          <p>{message.date.toLocaleString()}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-lg lg:text-base text-zinc-200 whitespace-nowrap order-3">
            <p>{message.name}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-400 whitespace-normal order-4 flex place-content-end lg:table-cell">
            <p>{message.email}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-200 col-span-2 order-5">
            <p>{message.message}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right col-span-2 order-6">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            {message.read && <ButtonAction className='transition-opacity duration-700 opacity-20 hover:opacity-100' id={message.id} serverAction={markContactMessageUnread}>
              <AiFillEyeInvisible className="inline w-6 h-6" title="Marcar mensaje como no leído" />
            </ButtonAction>}
            {!message.read && <ButtonAction id={message.id} serverAction={markContactMessageRead}>
              <AiFillEye className="inline w-6 h-6" title="Marcar mensaje como leído" />
            </ButtonAction>}
            <ButtonAction className='hover:text-red-400 hover:border-red-400' id={message.id} serverAction={deleteContactMessage}>
              <AiFillDelete className="inline w-6 h-6" title="Eliminar mensaje" />
            </ButtonAction>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
