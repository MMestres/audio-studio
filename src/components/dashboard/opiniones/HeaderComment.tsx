export default function HeaderComment () {
  return <thead className="hidden lg:table-header-group text-xs text-zinc-400 uppercase bg-black/20">
    <tr>
      <th scope="col" className="w-4"></th>
      <th scope="col" className="px-6 py-3">¿Cuándo?</th>
      <th scope="col" className="px-6 py-3">¿Quién?</th>
      <th scope="col" className="px-6 py-3">¿Qué?</th>
      <th scope="col" className="px-6 py-3 w-36"><span className="sr-only">Actions</span></th>
    </tr>
  </thead>
}
