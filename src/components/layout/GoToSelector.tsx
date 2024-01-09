'use client'

interface GoToSelectorProps {
  selector: string
  className?: string
  children: React.ReactNode
}

export default function GoToSelector ({
  selector, className = '', children
}: GoToSelectorProps) {
  return <button onClick={() => { document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' }) }} className={className}>
    {children}
  </button>
}
