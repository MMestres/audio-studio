'use client'

import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  children?: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button ({
  children,
  onClick,
  type = 'button'
  , className
}: ButtonProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick != null) onClick(event)
  }

  return (
    <button type={type} className={twMerge('bg-black/20 text-zinc-400  p-2 px-4 transition duration-500 border border-zinc-600 rounded-lg outline-none ring-0 hover:border-zinc-400 hover:bg-transparent hover:text-zinc-100 focus:border-zinc-400 focus:bg-transparent focus:text-zinc-100', className)} onClick={handleClick}>{children}</button>
  )
}
