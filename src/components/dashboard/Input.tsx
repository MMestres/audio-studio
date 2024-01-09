'use client'

import { useEffect, useState } from 'react'

interface InputProps {
  label: string
  name: string
  type?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export default function Input ({
  label,
  name,
  type = 'text',
  value = '',
  onChange,
  onBlur
}: InputProps) {
  useEffect(() => {
    setHandleValue(value)
  }, [value])

  const [handleValue, setHandleValue] = useState<string>(value)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHandleValue(event.target.value)
    if (onChange != null) onChange(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur != null) onBlur(event)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className='h-6' htmlFor={name}>{label}:</label>
      <input type={type} name={name} id={name}
        className="bg-black/20 text-zinc-400 border border-zinc-600 rounded-lg p-2 outline-none ring-0 focus:border-zinc-400 focus:bg-zinc-900 focus:text-zinc-200 transition duration-500 h-11"
        value={handleValue}
        onChange={handleChange}
        onBlur={handleBlur} />
    </div>
  )
}
