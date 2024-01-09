import { BiSolidDoorOpen } from 'react-icons/bi'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface SignoutProps {
  mobile?: boolean
}

export default function Signout ({
  mobile = false
}: SignoutProps) {
  const router = useRouter()
  const handleSignout = () => {
    signOut({ redirect: false }).then(() => {
      router.push('/')
    }).catch((e) => {
      console.error(e)
    })
  }

  return (
      <button onClick={handleSignout} className={`flex flex-col ${!mobile ? 'md:flex-row' : ''} h-auto items-center justify-center ${!mobile ? 'md:justify-start' : ''} w-full gap-y-1 gap-x-4 text-md font-medium cursor-pointer text-zinc-400 py-2 transition-all duration-[0.8s] rounded-md p-2 group hover:text-zinc-100 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-md focus:text-zinc-100 focus:bg-zinc-800 focus:scale-[1.02] focus:shadow-md focus:outline-none focus:ring-0`}>
        <BiSolidDoorOpen className='text-2xl' />
        <p className={`${!mobile ? 'md:hidden' : ''} truncate w-fill text-xs text-center`}>Salir</p>
        {!mobile && <p className='hidden md:flex truncate w-fill text-base'>Salir</p>}
      </button>
  )
}
