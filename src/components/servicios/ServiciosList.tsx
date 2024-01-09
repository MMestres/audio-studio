import { getPublicServices } from '@/data/services'

export default async function ServiciosList () {
  const services = await getPublicServices()

  return <div className='grid lg:grid-cols-3 gap-4 w-full mt-2 md:mt-0 md:p-4'>
    {services.map((servicio, index) => {
      return <div key={servicio.id} className={`${index === 0 ? 'row-span-2' : ''} border border-black/50 bg-zinc-950/50 rounded-lg shadow-md shadow-black/50 hover:scale-[1.02] z-10 transition-all duration-[0.8s]`}>
          <picture>
            <img className={`rounded-t-lg object-cover ${index === 0 ? 'h-[60vh]' : 'h-[33vh]'} w-[100%]`} src={servicio.image} alt={servicio.label} />
          </picture>
          <div className="p-5">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-white">{servicio.label}</h3>
            {servicio.description.split('\n').map((description, index) => {
              return <>{description !== '' && <p key={index} className="mb-3 font-normal text-gray-400">{description}</p>}</>
            })}
          </div>
      </div>
    })}
  </div>
}
