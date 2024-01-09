'use client'

import { useEffect, useState } from 'react'

interface TextAreaProps {
  label: string
  name: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}

export default function TextArea ({
  label,
  name,
  value = '',
  onChange,
  rows = 7,
  onBlur
}: TextAreaProps) {
  useEffect(() => {
    setHandleValue(value)
  }, [value])

  const [handleValue, setHandleValue] = useState<string>(value)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHandleValue(event.target.value)
    if (onChange != null) onChange(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (onBlur != null) onBlur(event)
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}:</label>
      <textarea rows={rows} name={name} id={name}
        className="bg-black/20 text-zinc-400 border border-zinc-600 rounded-lg p-2 outline-none ring-0 focus:border-zinc-400 focus:bg-transparent focus:text-zinc-200 transition duration-500"
        value={handleValue}
        onChange={handleChange}
        onBlur={handleBlur} />
    </div>
  )
}
