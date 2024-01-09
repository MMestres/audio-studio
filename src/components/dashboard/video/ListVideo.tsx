import { getPlaylistVideos } from '@/data/youtube'
import Link from 'next/link'
import { AiFillYoutube } from 'react-icons/ai'
import Button from '../Button'
import { getVideo } from '@/data/video'

export default async function ListVideo () {
  const video = await getVideo()
  const videos = await getPlaylistVideos(video.playlistid)

  return <tbody className='flex flex-col gap-4 lg:table-row-group'>
    {videos.map((video, index) => {
      return <tr key={video.videoId} className={`grid grid-cols-3 gap-2 p-2 lg:p-0 lg:table-row border lg:border-none ${index !== 0 ? 'border-t' : ''} border-black/40 hover:bg-black/20 rounded-xl lg:rounded-none`}>
        <td scope="row" className="lg:px-6 lg:py-4 order-1 row-span-2 grid place-content-center lg:table-cell">
          {video.thumbnailUrl != null && <picture>
            <img src={video.thumbnailUrl} alt={video.title} className='aspect-video object-cover' />
          </picture>}
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 font-medium text-zinc-200 whitespace-normal order-2 col-span-2">
          <p>{video.title}</p>
        </td>
        <td scope="row" className="lg:px-6 lg:py-4 text-right order-3 col-span-2">
          <div className='flex place-content-end lg:flex-row gap-2 font-medium text-gray-500'>
            <Button className='p-2'>
              <Link target='_blank' href={video.videoUrl}>
                <AiFillYoutube className="inline w-6 h-6" title="Ver vídeo en YouTube" />
              </Link>
            </Button>
          </div>
        </td>
      </tr>
    })}
  </tbody>
}
