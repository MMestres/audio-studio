'use client'

import { twMerge } from 'tailwind-merge'
import { ImSpinner9 } from 'react-icons/im'
import { useFormLogin } from '@/hooks/useFormLogin'

interface LoginFormProps {
  className?: string
}

export default function LoginForm ({
  className = ''
}: LoginFormProps) {
  const { refBtnLogin, handleSubmit, changePassword, changeUser, loading, error, userInfo } = useFormLogin()

  return <form className={twMerge('flex flex-col gap-6', className)} onSubmit={handleSubmit}>
  <div>
    <input required value={userInfo.username} onChange={changeUser} type="text" placeholder='Usuario' className="text-xl block min-h-[auto] w-full rounded-md border bg-zinc-400/10 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" />
  </div>
  <div>
    <input required value={userInfo.password} onChange={changePassword} type="password" placeholder='Contraseña' className="text-xl block min-h-[auto] w-full rounded-md border bg-zinc-400/10 border-zinc-800 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-[0-8s] ease-linear text-zinc-200 placeholder:text-zinc-200 focus:border-zinc-600 focus:placeholder:text-zinc-600" autoComplete='false' />
  </div>
  <button ref={refBtnLogin} type='submit' className={`${error ? 'animatecss animatecss-shake' : ''} text-xl font-bold relative w-full items-center justify-start inline-block mb-2 lg:mb-8 px-5 py-3 overflow-hidden rounded-md transition-all duration-[0.8s] group text-zinc-900 bg-zinc-100 hover:shadow-md hover:shadow-black hover:scale-[1.02] focus:outline-none focus:ring-0 focus:shadow-md focus:shadow-black focus:scale-[1.02]`}>
    <span className="absolute top-0 left-0 w-80 h-80 -mt-1 transition-all duration-[0.8s] ease-in-out rotate-45 -translate-x-96 -translate-y-40 bg-zinc-900 opacity-100 group-hover:-translate-x-3 group-focus:-translate-x-3"></span>
    <span className="relative w-full text-left text-zinc-900 transition-colors duration-[0.8s] ease-in-out group-hover:text-zinc-100 group-focus:text-zinc-100 flex place-content-center items-center gap-2">
      <ImSpinner9 className={`relative w-4 h-4 inline animate-spin ${loading ? '' : 'hidden'}`} />
      <span>Login</span>
    </span>
    <span className="absolute inset-0 border-2 border-zinc-100 rounded-md"></span>
  </button>
</form>
}
