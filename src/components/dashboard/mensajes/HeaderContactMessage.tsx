export default function HeaderContactMessage () {
  return <thead className="hidden lg:table-header-group text-xs text-zinc-400 uppercase bg-black/20">
    <tr>
      <th scope="col" className="w-4"></th>
      <th scope="col" className="px-6 py-3">Nombre</th>
      <th scope="col" className="px-6 py-3">Fecha</th>
      <th scope="col" className="px-6 py-3">Email</th>
      <th scope="col" className="px-6 py-3">Mensaje</th>
      <th scope="col" className="px-6 py-3 w-24"><span className="sr-only">Actions</span></th>
    </tr>
  </thead>
}
