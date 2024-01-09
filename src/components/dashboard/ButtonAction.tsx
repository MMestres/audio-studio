'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/dashboard/Button'

interface ButtonActionProps {
  id: string
  serverAction: (id: string) => Promise<any>
  children?: React.ReactNode
  className?: string
}

export default function ButtonAction ({
  id, serverAction, children, className = ''
}: ButtonActionProps) {
  const router = useRouter()
  const [error, setError] = useState(false)
  const handleDelete = () => {
    if (serverAction != null) {
      serverAction(id).then(() => {
        router.refresh()
      }).catch(() => {
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 500)
      })
    }
  }
  return <Button className={`p-2 ${error ? 'animatecss animatecss-shake border-red-500' : ''} ${className}`} onClick={handleDelete}>
    {children}
  </Button>
}
