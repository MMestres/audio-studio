'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import Button from '@/components/dashboard/Button'

interface FormProps {
  title: string
  children: React.ReactNode
  submit?: (e: React.FormEvent<HTMLFormElement>) => Promise<any>
  saveButton?: string
  loading?: boolean
  className?: string
}

export default function Form ({
  title, children, submit, saveButton = 'Guardar', loading = false, className = ''
}: FormProps) {
  const [error, setError] = useState(false)
  const [handleDirty, setDirty] = useState(false)
  const [handleLoading, setLoading] = useState(loading)
  const [handleSuccess, setSuccess] = useState(false)

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    if (submit != null) {
      submit(e).then(() => {
        setDirty(false)
        setLoading(false)
        setSuccess(true)

        setTimeout(() => {
          setSuccess(false)
        }, 500)
      }).catch((err) => {
        setError(true)
        setLoading(false)

        setTimeout(() => {
          setError(false)
        }, 500)
        console.error(err)
      })
    } else {
      setDirty(false)
      setLoading(false)
    }
  }

  const classForm = twMerge('relative transition duration-500 flex flex-col border p-4 rounded-lg h-full', className, handleDirty ? 'border-zinc-200' : 'border-zinc-600', error ? 'animatecss animatecss-shake border-red-500' : '', handleSuccess ? 'animatecss animatecss-pulse animatecss-fast border-green-500' : '')
  const classButton = twMerge('border', handleDirty ? 'border-zinc-200' : 'border-zinc-600', error ? 'border-red-500' : '', handleSuccess ? 'border-green-500' : '')

  return <div className={classForm}>
    <div className="mb-4">
      <h3 className="text-2xl lg:text-xl font-semibold text-zinc-400">{title}</h3>
    </div>
    <form className="flex flex-col gap-4" onSubmit={onSubmit} onChange={() => { setDirty(true) }}>
      {children}
      <div className='flex flex-row-reverse gap-2'>
        <Button className={classButton} type='submit'>{saveButton}</Button>
      </div>
    </form>
    {handleLoading && <div className='absolute inset-0 grid place-content-center bg-black/30 rounded-lg'>
      <div className="relative inline-flex">
        <div className="w-8 h-8 bg-zinc-500 rounded-full"></div>
        <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>}
  </div>
}
