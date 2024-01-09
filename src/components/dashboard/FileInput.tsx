'use client'

import { type ChangeEvent, useEffect, useState } from 'react'

interface FileInputProps {
  label?: string
  name: string
  value?: string
  type?: 'image' | 'audio'
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FileInput ({
  label = '', name, value = '', onChange, type = 'image'
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [preview, setPreview] = useState(value)

  useEffect(() => {
    if (selectedFile != null) {
      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)
      return () => { URL.revokeObjectURL(objectUrl) }
    } else {
      setPreview(value)
    }
  }, [selectedFile, value])

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null || e.target.files.length === 0) {
      setSelectedFile(undefined)
    } else {
      setSelectedFile(e.target.files[0])
    }

    if (onChange != null) {
      onChange(e)
    }
  }

  return <>
    <div>
      {label !== '' && <label className="block mb-2 text-base font-medium text-gray-900 dark:text-white h-6" htmlFor={name}>{label}:</label>}
      <input className="block w-full transition text-zinc-200 duration-500 file:bg-black/20 file:appearance-none file:text-zinc-400 file:border file:border-solid file:mr-2 file:border-zinc-600 file:rounded-lg file:outline-none file:ring-0 file:hover:border-zinc-400 file:hover:bg-transparent file:hover:text-zinc-100 file:p-2 file:px-4 h-11" id={name} name={name} type="file" onChange={onSelectFile} />
    </div>
    {type === 'image' && preview != null && preview !== '' && <picture><img src={preview} alt={label} /></picture>}
    {type === 'audio' && preview != null && preview !== '' && <audio controls src={preview} />}
  </>
}
