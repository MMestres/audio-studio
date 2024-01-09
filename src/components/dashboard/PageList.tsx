interface PageListProps {
  title: string
  children: React.ReactNode
}

export default function PageList ({
  title, children
}: PageListProps) {
  return <div className='p-8 h-[100%] overflow-x-hidden overflow-y-auto'>
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl lg:text-6xl font-bold">{title}</h2>
      {children}
    </div>
  </div>
}
