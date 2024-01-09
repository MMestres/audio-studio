import { type Metadata } from 'next'

import Box from '@/components/layout/Box'
import LoginForm from '@/components/login/LoginForm'

export const metadata: Metadata = {
  title: 'dashboard',
  description: '',
  robots: 'noindex, nofollow'
}

export default function LoginPage () {
  return (
    <div className='h-screen grid place-content-center'>
      <Box className='p-20 flex flex-col gap-10'>
        <h2 className='text-5xl font-semibold'>Login</h2>
        <LoginForm className=' w-[300px]' />
      </Box>
    </div>
  )
}
