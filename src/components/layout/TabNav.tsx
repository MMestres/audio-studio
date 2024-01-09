import Link from 'next/link'

interface TabNavProps {
  tabs?: Array<{
    id: string
    label: string
    link: string
  }>
  activeTab?: string
}

export default function TabNav ({
  tabs = [], activeTab = ''
}: TabNavProps) {
  return <div className='flex gap-1 flex-col md:flex-row items-center justify-evenly w-full'>
    {tabs.map((tab, index) => (
      <Link href={tab.link}
        key={tab.id}
        className={`${activeTab === tab.id ? 'text-black bg-white shadow-md shadow-black text-md md:text-lg' : 'text-sm md:text-md text-zinc-400 hover:bg-zinc-800 hover:text-white hover:shadow-md hover:shadow-black focus:outline-none focus:ring-0 focus:bg-zinc-800 focus:text-white focus:shadow-md focus:shadow-black'} relative rounded-md py-2 md:px-8 md:py-3 font-medium outline-none transition duration-[0.8s] w-full md:w-auto text-center`}>
        {index === 0 && <h1>{tab.label}</h1>}
        {index > 0 && <span>{tab.label}</span>}
      </Link>
    ))}
  </div>
}
