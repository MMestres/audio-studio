'use client'

import { useContactForm } from '@/hooks/useContactForm'
import { ImSpinner9 } from 'react-icons/im'

export interface FormData {
  nombre: string
  email: string
  mensaje: string
}

interface ContactFormProps {
  txtName: string
  txtEmail: string
  txtMessage: string
  txtSubmit: string
}

export default function ContactForm ({
  txtName, txtEmail, txtMessage, txtSubmit
}: ContactFormProps) {
  const { className, onSubmit, loading } = useContactForm()

  return <form className={`flex flex-col gap-4 ${className.form}`} onSubmit={onSubmit}>
    <div>
      <input required type="text" name="name" placeholder={txtName} className="block min-h-[auto] w-full rounded-md border bg-zinc-400/10 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" />
    </div>
    <div>
      <input required type="email" name="email" placeholder={txtEmail} className="block min-h-[auto] w-full rounded-md border bg-zinc-400/10 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" />
    </div>
    <div className="relative mb-6" data-te-input-wrapper-init>
      <textarea required name="message" rows={6} placeholder={txtMessage} className="block min-h-[auto] w-full rounded-md border bg-zinc-400/10 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" />
    </div>
    <button type='submit' className={'relative w-full items-center justify-start inline-block mb-2 lg:mb-8 px-5 py-3 overflow-hidden rounded-md transition-all duration-[0.8s] group text-zinc-900 bg-zinc-100 hover:shadow-md hover:shadow-black hover:scale-[1.02] focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-black focus:scale-[1.02]'}>
      <span className="absolute top-0 left-0 w-80 h-80 -mt-1 transition-all duration-[0.8s] ease-in-out rotate-45 -translate-x-96 -translate-y-40 bg-zinc-900 opacity-100 group-hover:-translate-x-3 group-focus:-translate-x-3"></span>
      <span className={'relative w-full text-left text-zinc-900 transition-all duration-[0.8s] ease-in-out group-hover:text-zinc-100 group-focus:text-zinc-100 flex place-content-center gap-2'}>
        <ImSpinner9 className={`relative top-1 w-4 h-4 inline animate-spin ${loading ? '' : 'hidden'}`} />
        <span>{txtSubmit}</span>
      </span>
      <span className={'absolute inset-0 border-2 transition-all duration-[0.8s] ease-in-out border-zinc-100 rounded-md'}></span>
    </button>
  </form>
}
