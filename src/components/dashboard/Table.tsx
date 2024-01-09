import Link from 'next/link'

import Button from '@/components/dashboard/Button'

interface TableProps {
  title: string
  children: React.ReactNode
  newButton?: {
    label?: string
    href: string
  }
}

export default function Table ({
  title, children, newButton
}: TableProps) {
  return <div className='flex flex-col border border-zinc-600 p-4 rounded-lg h-full'>
  <div className="mb-4 flex flex-row w-full justify-between items-center">
    <h3 className="text-2xl lg:text-xl font-semibold text-zinc-400">{title}</h3>
    {newButton != null && <Button className='p-2'>
      <Link href={newButton.href}>{newButton?.label != null ? newButton.label : 'Crear'}</Link>
    </Button>}
  </div>
  <table className="w-full text-sm text-left">
    {children}
  </table>
</div>
}
