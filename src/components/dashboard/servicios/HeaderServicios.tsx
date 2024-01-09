export default function HeaderServicios () {
  return <thead className="hidden lg:table-header-group text-xs text-zinc-400 uppercase bg-black/20">
    <tr>
      <th scope="col" className="w-8"></th>
      <th scope="col" className="px-6 py-3 w-36 text-center">Imagen</th>
      <th scope="col" className="px-6 py-3">Título</th>
      <th scope="col" className="px-6 py-3">Descripción</th>
      <th scope="col" className="px-6 py-3 w-36"><span className="sr-only">Actions</span></th>
    </tr>
  </thead>
}
