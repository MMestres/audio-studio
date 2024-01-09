'use server'

import { sql } from '@vercel/postgres'
import { type Ressource } from '@/types/Ressource'
import mockressources from '@/mocks/mockressources'
import { revalidatePath } from 'next/cache'
import { deleteFile, uploadFile } from './file'

export async function getRessources () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Ressource>`
        SELECT id, label, description, image, ressource, position
        FROM ressources
        ORDER BY position ASC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch ressources.')
    }
  } else {
    return mockressources.sort((a: Ressource, b: Ressource) => a.position - b.position)
  }
}

export async function getRessource (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Ressource>`
        SELECT id, label, description, image, ressource, position
        FROM ressources WHERE id = ${id};
      `

      return data.rows[0]
    } catch (err) {
      throw new Error(`Failed to fetch ressources ${id}.`)
    }
  } else {
    return mockressources.find((p: Ressource) => p.id === id)
  }
}

export async function getPublicRessources () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Ressource>`
        SELECT id, label, description, image, ressource, position
        FROM ressources
        ORDER BY ressource DESC, position ASC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch ressources.')
    }
  } else {
    return mockressources.sort((a: Ressource, b: Ressource) => {
      if (a.ressource && !b.ressource) return -1
      if (!a.ressource && b.ressource) return 1
      else return a.position - b.position
    })
  }
}

export async function getMaxPosition () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Ressource>`
        SELECT MAX(position) as position
        FROM ressources;
      `

      const max = data.rows[0]?.position ?? 0

      return max
    } catch (err) {
      throw new Error('Failed to fetch ressources.')
    }
  } else {
    return mockressources.reduce((prev: number, curr: Ressource) => Math.max(prev, curr.position), 0)
  }
}

export async function saveRessource (id: string | undefined, label: string, description: string, ressource: boolean) {
  if (process.env.DATA === '@vercel/postgres') {
    if (ressource) {
      try {
        await sql<Ressource>`UPDATE ressources SET ressource = false;`
      } catch (err) {
        throw new Error('Failed to unmark ressources')
      }
    }

    if (id != null) {
      try {
        const data = await sql<Ressource>`
        UPDATE ressources
        SET label = ${label}, description = ${description}, ressource = ${ressource}
        WHERE id = ${id};
      `

        revalidatePaths()

        return data
      } catch (err) {
        throw new Error(`Failed to save ressource ${id}: ${err as string}}`)
      }
    } else {
      try {
        const maxPosition = await getMaxPosition()
        const data = await sql<Ressource>`
        INSERT INTO ressources (id, label, description, ressource, position)
        VALUES (uuid_generate_v4(), ${label}, ${description}, ${ressource}, ${maxPosition + 1});
      `

        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save new ressource.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveRessourceImage (id: string | undefined, filename: string, file: unknown) {
  if (process.env.DATA === '@vercel/postgres') {
    if (file != null) {
      const ressource = id != null ? await getRessource(id) : (await saveRessource(undefined, '', '', false)).rows[0]
      if (ressource == null) throw new Error('Failed to save ressource image.')

      if (ressource.image != null) {
        await deleteFile(ressource.image)
      }

      const uploadedFile = await uploadFile(file, filename)

      await sql<Ressource>`
        UPDATE ressources SET image = ${uploadedFile.url} WHERE id = ${ressource.id};
      `

      revalidatePaths()
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function deleteRessource (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const ressource = await getRessource(id)

      if (ressource != null) {
        if (ressource.image != null) {
          await deleteFile(ressource.image)
        }

        const data = await sql<Ressource>`
          DELETE FROM ressources
          WHERE id = ${id};
        `

        revalidatePaths()

        return data
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Failed to delete ressource ${id}.`)
    }
  } else {
    throw new Error('Delete not implemented')
  }
}

export async function swapRessources (source: string, destination: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      await sql<Ressource>`
        UPDATE ressources
        SET position = CASE
          WHEN id = ${source} THEN (SELECT position FROM ressources WHERE id = ${destination})
          WHEN id = ${destination} THEN (SELECT position FROM ressources WHERE id = ${source})
        END
        WHERE id IN (${source}, ${destination});
      `
      revalidatePaths()
    } catch (err) {
      throw new Error(`Failed to swap ressources ${source} and ${destination}.`)
    }
  } else {
    throw new Error('Swap not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard/equipo', 'layout')
  revalidatePath('/equipo', 'page')
  revalidatePath('/', 'page')
}
