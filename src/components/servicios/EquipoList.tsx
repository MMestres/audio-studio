import { getPublicRessources } from '@/data/ressources'

export default async function EquipoList () {
  const ressources = await getPublicRessources()

  return <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full mt-2 md:mt-0 md:p-4'>
    {ressources.map((ressource, index) => {
      return <div key={ressource.id} className={`${index === 0 ? 'lg:row-span-2 lg:col-span-2' : ''} relative shadow-md shadow-black/50 hover:scale-[1.02] z-10 transition duration-[0.8s]`}>
        <picture>
          <img className='rounded-lg object-cover w-[100%] h-[100%] aspect-[4/3] border border-black/50 bg-zinc-950/50' src={ressource.image} alt={ressource.label} title={ressource.label} />
        </picture>
        <div className='absolute rounded-bl-md bottom-0 left-0 right-0 p-1 text-sm md:text-md bg-gradient-to-r from-black via-20% via-black to-transparent'>
          <h3 className='text-lg mb-1 font-semibold'>{ressource.label}</h3>
          <ul className='flex flex-col gap-1'>
            {ressource.description.split('\n').map((element, index) => {
              return <li key={index} className='text-xs'>{element}</li>
            })}
          </ul>
        </div>
      </div>
    })}
  </div>
}
