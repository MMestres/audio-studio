import { getPublicStudio } from '@/data/studio'

export default async function EstudioList () {
  const studios = await getPublicStudio()

  return <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-2 md:mt-0 md:p-4'>
    {studios.map((studio) => {
      return <div key={studio.id} className='relative shadow-md shadow-black/50 hover:scale-[1.02] z-10 transition duration-[0.8s]'>
        <picture>
          <img className='rounded-lg object-cover w-[100%] h-[100%] aspect-[4/3] border border-black/50 bg-zinc-950/50' src={studio.image} alt={studio.label} title={studio.label} />
        </picture>
        <p className='rounded-bl-md absolute bottom-0 left-0 right-0 p-1 text-sm md:text-md bg-gradient-to-r from-black via-20% via-black to-transparent'>
          {studio.label}
        </p>
      </div>
    })}
  </div>
}
