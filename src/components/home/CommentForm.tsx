'use client'

import { useCommentForm } from '@/hooks/useCommentForm'
import { ImSpinner9 } from 'react-icons/im'

export interface FormData {
  nombre: string
  email: string
  mensaje: string
}

interface ContactFormProps {
  onClose: () => void
  txtName: string
  txtMessage: string
  txtButton: string
}

export default function CommentForm ({
  onClose, txtName, txtMessage, txtButton
}: ContactFormProps) {
  const { className, onSubmit, loading } = useCommentForm(() => {
    setTimeout(() => {
      onClose()
    }, 200)
  })

  return <form className={`flex flex-col gap-4 w-[80vw] max-w-[600px] mx-auto ${className.form}`} onSubmit={onSubmit}>
    <div className='w-full'>
      <input required type="text" name="name" placeholder={txtName} className="block min-h-[auto] w-full rounded-md border bg-zinc-800/60 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" />
    </div>
    <div className="relative" data-te-input-wrapper-init>
      <textarea required name="message" rows={10} placeholder={txtMessage} className="block min-h-[auto] w-full rounded-md border bg-zinc-800/60 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" />
    </div>
    <div className='flex flex-row place-content-center gap-4 mt-2'>
      <button type='submit' className={'relative w-full max-w-[300px] items-center justify-center inline-block mb-2 lg:mb-8 px-5 py-3 overflow-hidden rounded-md transition-all duration-[0.8s] group text-zinc-900 bg-zinc-100 hover:shadow-md hover:shadow-black hover:scale-[1.02] focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-black focus:scale-[1.02]'}>
        <span className="absolute top-0 left-0 w-80 h-80 -mt-1 transition-all duration-[0.8s] ease-in-out rotate-45 -translate-x-96 -translate-y-40 bg-zinc-900 opacity-100 group-hover:-translate-x-3 group-focus:-translate-x-3"></span>
        <span className={'relative w-full text-left text-zinc-900 transition-all duration-[0.8s] ease-in-out group-hover:text-zinc-100 group-focus:text-zinc-100 flex place-content-center gap-2'}>
          <ImSpinner9 className={`relative top-1 w-4 h-4 inline animate-spin ${loading ? '' : 'hidden'}`} />
          <span>{txtButton}</span>
        </span>
        <span className={'absolute inset-0 border-2 transition-all duration-[0.8s] ease-in-out border-zinc-100 rounded-md'}></span>
      </button>
      <button className="relative items-center justify-start inline-block  mb-2 lg:mb-8 px-5 py-3 overflow-hidden rounded-md transition-all duration-[0.8s] text-zinc-100 group hover:shadow-md hover:shadow-black hover:scale-110 focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-black focus:scale-110" onClick={onClose}>
        <span className="absolute top-0 left-0 w-72 h-72 -mt-1 transition-all duration-[0.8s] ease-in-out rotate-45 -translate-x-[350px] -translate-y-36 bg-zinc-100 opacity-100 group-hover:-translate-x-4 group-focus:-translate-x-4"></span>
        <span className="relative w-full text-left text-zinc-100 transition-colors duration-[0.8s] ease-in-out group-hover:text-zinc-900 group-focus:text-zinc-900">X</span>
        <span className="absolute inset-0 border-2 border-zinc-100 rounded-md"></span>
      </button>
    </div>
  </form>
}
