'use client'

import { type ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'

interface SliderProps {
  value?: number
  onChange: (value: number) => void
  className?: string
  min?: number
  max?: number | undefined
  step?: number
}

export default function Slider ({
  value = 0, onChange, className = '', min = 0, max = 0, step = 1
}: SliderProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value)
    onChange(newValue)
  }

  if (max == null || isNaN(max)) {
    max = value
  }

  return <input className={twMerge('rounded-full overflow-hidden appearance-none bg-zinc-950 h-1 cursor-pointer', className)}
    type="range" min={min} max={max} step={step} value={value} onChange={handleChange} />
}
