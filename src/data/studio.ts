'use server'

import { sql } from '@vercel/postgres'
import { type Studio } from '@/types/Studio'
import mockstudio from '@/mocks/mockstudio'
import { revalidatePath } from 'next/cache'
import { deleteFile, uploadFile } from './file'

export async function getStudios () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Studio>`
        SELECT id, label, image, position
        FROM studio
        ORDER BY position ASC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch studios.')
    }
  } else {
    return mockstudio.sort((a: Studio, b: Studio) => a.position - b.position)
  }
}

export async function getStudio (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Studio>`
        SELECT id, label, image, position
        FROM studio WHERE id = ${id};
      `

      return data.rows[0]
    } catch (err) {
      throw new Error(`Failed to fetch studio ${id}.`)
    }
  } else {
    return mockstudio.find((p: Studio) => p.id === id)
  }
}

export async function getPublicStudio () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Studio>`
        SELECT id, label, image, position
        FROM studio
        ORDER BY position ASC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch studios.')
    }
  } else {
    return mockstudio.sort((a: Studio, b: Studio) => a.position - b.position)
  }
}

export async function getMaxPosition () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Studio>`
        SELECT MAX(position) as position
        FROM studio;
      `

      const max = data.rows[0]?.position ?? 0

      return max
    } catch (err) {
      throw new Error('Failed to fetch studio.')
    }
  } else {
    return mockstudio.reduce((prev: number, curr: Studio) => Math.max(prev, curr.position), 0)
  }
}

export async function saveStudio (id: string | undefined, label: string) {
  if (process.env.DATA === '@vercel/postgres') {
    if (id != null) {
      try {
        const data = await sql<Studio>`
        UPDATE studio
        SET label = ${label}
        WHERE id = ${id};
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error(`Failed to save studio ${id}: ${err as string}}`)
      }
    } else {
      try {
        const maxPosition = await getMaxPosition()
        const data = await sql<Studio>`
        INSERT INTO studio (id, label, home, position)
        VALUES (uuid_generate_v4(), ${label}, ${maxPosition + 1});
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save new studio.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveStudioImage (id: string | undefined, filename: string, file: unknown) {
  if (process.env.DATA === '@vercel/postgres') {
    if (file != null) {
      const studio = id != null ? await getStudio(id) : (await saveStudio(undefined, '')).rows[0]
      if (studio == null) throw new Error('Failed to save studio image')

      if (studio.image != null) {
        await deleteFile(studio.image)
      }

      const uploadedFile = await uploadFile(file, filename)

      await sql<Studio>`
        UPDATE studio SET image = ${uploadedFile.url} WHERE id = ${studio.id};
      `

      revalidatePaths()
    }
  } else {
    throw new Error('Save image not implemented')
  }
}

export async function deleteStudio (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const studio = await getStudio(id)

      if (studio != null) {
        if (studio.image != null) {
          await deleteFile(studio.image)
        }

        const data = await sql<Studio>`
          DELETE FROM studio
          WHERE id = ${id};
        `

        revalidatePaths()

        return data
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Failed to delete studio ${id}.`)
    }
  } else {
    throw new Error('Delete not implemented')
  }
}

export async function swapStudios (source: string, destination: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      await sql<Studio>`
        UPDATE studio
        SET position = CASE
          WHEN id = ${source} THEN (SELECT position FROM studio WHERE id = ${destination})
          WHEN id = ${destination} THEN (SELECT position FROM studio WHERE id = ${source})
        END
        WHERE id IN (${source}, ${destination});
      `
      revalidatePaths()
    } catch (err) {
      throw new Error(`Failed to swap studio ${source} and ${destination}.`)
    }
  } else {
    throw new Error('Swap not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard/estudio', 'layout')
  revalidatePath('/estudio', 'page')
  revalidatePath('/', 'page')
}
