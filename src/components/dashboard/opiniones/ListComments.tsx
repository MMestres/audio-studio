import Link from 'next/link'
import { AiFillDelete, AiFillEdit, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

import Button from '@/components/dashboard/Button'
import ButtonAction from '@/components/dashboard/ButtonAction'
import { deleteComment, getComments, hideComment, showComment } from '@/data/comments'
import { FaExclamationCircle } from 'react-icons/fa'

export default async function ListComments () {
  const comments = await getComments()

  return <tbody className='flex flex-col gap-4 lg:table-row-group'>
    {comments.map((comment, index) => {
      return <tr key={comment.id} className={`grid grid-cols-2 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'border lg:border-none lg:border-t' : ''} border-black/40 hover:bg-black/20 rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:px-1 lg:py-4 lg:pl-3 text-center order-2 flex place-content-end lg:table-cell">
          {!comment.read && <FaExclamationCircle className="w-6 h-6 text-yellow-400" title="Opinión no leída" />}
          {comment.read && comment.show && <AiFillEye className="w-6 h-6 text-green-600" title="Opinión leída y publicada" />}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-400 whitespace-nowrap order-1">
          <p>{comment.date.toLocaleString()}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-200 whitespace-nowrap col-span-2 order-3 text-lg lg:text-base">
            <p>{comment.title}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-200 col-span-2 order-4">
            <p>{comment.comment}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right col-span-2 order-5">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            {comment.show && <ButtonAction className='transition-opacity duration-700 opacity-20 hover:opacity-100 hover:text-yellow-400 hover:border-yellow-400' id={comment.id} serverAction={hideComment}>
              <AiFillEyeInvisible className="inline w-6 h-6" title="Ocultar opinión" />
            </ButtonAction>}
            {!comment.show && <ButtonAction className='hover:text-green-600 hover:border-green-600' id={comment.id} serverAction={showComment}>
              <AiFillEye className="inline w-6 h-6" title="Mostrar opinión" />
            </ButtonAction>}
            <Button className='p-2'>
              <Link href={`/dashboard/opiniones/${comment.id}`}>
                <AiFillEdit className="inline w-6 h-6" title="Editar opinión" />
              </Link>
            </Button>
            <ButtonAction className='hover:text-red-400 hover:border-red-400' id={comment.id} serverAction={deleteComment}>
              <AiFillDelete className="inline w-6 h-6" title="Eliminar opinión" />
            </ButtonAction>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
