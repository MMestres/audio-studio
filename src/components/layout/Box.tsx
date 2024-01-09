import { twMerge } from 'tailwind-merge'

interface BoxProps {
  children?: React.ReactNode
  className?: string
}

export default function Box ({
  children, className = ''
}: BoxProps) {
  return <div className={twMerge('bg-zinc-900 rounded-lg w-full h-full', className)}>
    {children}
  </div>
}
