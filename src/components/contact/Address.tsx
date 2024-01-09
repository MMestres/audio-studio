import Link from 'next/link'
import { BiWorld, BiPhone, BiMailSend } from 'react-icons/bi'

interface AddressProps {
  address: string
  phone: string
  mail: string
  map: string
}

export default function Address ({
  address, phone, mail, map
}: AddressProps) {
  return <div className="lg:bg-black/90 text-center my-4 lg:my-0 lg:rounded-md lg:p-6 lg:z-10 lg:w-40 lg:flex flex-col justify-around">
  {(address != null && address !== '') && <div className='flex flex-row lg:flex-col gap-1 lg:gap-2 items-center text-center justify-center flex-nowrap lg:flex-wrap'>
    <BiWorld className="text-2xl text-zinc-200"/>
    <p className='text-sm'><Link target='_blank' href={`http://maps.google.es?q=${map}`}>{address}</Link></p>
  </div>}
  {(phone != null && phone !== '') && <div className='flex flex-row lg:flex-col gap-1 lg:gap-2 items-center text-center justify-center flex-nowrap lg:flex-wrap'>
    <BiPhone className="text-2xl text-zinc-200"/>
    <p className='text-sm'><Link href={`tel:${phone}`}>{phone}</Link></p>
  </div>}
  {(mail != null && mail !== '') && <div className='flex flex-row lg:flex-col lg:gap-2 items-center text-center justify-center flex-nowrap lg:flex-wrap'>
    <BiMailSend className="mr-1 lg:mr-0 text-2xl text-zinc-200"/>
    <p className='text-sm lg:flex lg:flex-col'><Link href={`mailto:${mail}`}>{mail.split('@')[0]}</Link><Link href={`mailto:${mail}`}>@{mail.split('@')[1]}</Link></p>
  </div>}
</div>
}
