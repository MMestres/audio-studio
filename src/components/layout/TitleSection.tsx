import { getPageInfo } from '@/data/pages'

interface TitleSectionProps {
  data: string
}

export default async function TitleSection ({
  data
}: TitleSectionProps) {
  const pageInfo = await getPageInfo(data)

  return <div className='flex flex-col gap-2 md:px-4 my-8 md:my-16 max-w-3xl text-left text-lg md:text-xl text-zinc-400'>
    <h4 className='mb-4 text-2xl md:text-2xl text-zinc-200'>{pageInfo?.title}</h4>
    {pageInfo?.subtitle.split('\n').map((text: string, index: number) => {
      return <p key={index}>{text}</p>
    })}
    <hr className='mt-4 border-t-zinc-400 max-w-3xl hidden md:flex' />
  </div>
}
