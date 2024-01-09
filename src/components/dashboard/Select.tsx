'use client'

import { useEffect, useState } from 'react'

interface SelectProps<T> {
  label: string
  name: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void
  options: T[]
  optionValue: (option: T) => string
  optionLabel: (option: T) => string
}

export default function Select<T> ({
  label,
  name,
  value = '',
  onChange,
  onBlur,
  options = [],
  optionValue,
  optionLabel
}: SelectProps<T>) {
  useEffect(() => {
    setHandleValue(value)
  }, [value])

  const [handleValue, setHandleValue] = useState<string>(value)

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHandleValue(event.target.value)
    if (onChange != null) onChange(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    if (onBlur != null) onBlur(event)
  }

  return (
    <div className="flex flex-col gap-1">
      <label className='h-6' htmlFor={name}>{label}:</label>
      <select name={name} id={name}
        className="bg-black/20 text-zinc-400 border border-zinc-600 rounded-lg p-2 outline-none ring-0 focus:border-zinc-400 focus:bg-zinc-900 focus:text-zinc-200 transition duration-500 h-11"
        value={handleValue}
        onChange={handleChange}
        onBlur={handleBlur}>
          {options.map((option) => <option key={optionValue(option)} value={optionValue(option)}>{optionLabel(option)}</option>)}
      </select>
    </div>
  )
}
