interface LoadingTableProps {
  rows: number
}

export default function LoadingTable ({ rows }: LoadingTableProps) {
  return <tbody><tr className="bg-black/30"><td colSpan={6} className='text-center'>
    <div className="flex flex-row justify-evenly items-center">
      <div className='w-24 h-24 grid place-content-center'>
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-zinc-500 rounded-full"></div>
          <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
      <div className='w-24 h-24 grid place-content-center'>
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-zinc-500 rounded-full"></div>
          <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
      <div className='w-24 h-24 grid place-content-center'>
        <div className="relative inline-flex">
          <div className="w-8 h-8 bg-zinc-500 rounded-full"></div>
          <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-ping"></div>
          <div className="w-8 h-8 bg-zinc-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
        </div>
      </div>
    </div>
  </td></tr></tbody>
}
