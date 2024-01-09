'use server'

import { sql } from '@vercel/postgres'
import { type Service } from '@/types/Service'
import mockservices from '@/mocks/mockservices'
import { revalidatePath } from 'next/cache'
import { deleteFile, uploadFile } from './file'

export async function getServices () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Service>`
        SELECT id, label, description, image, service, position
        FROM services
        ORDER BY position ASC;
      `

      const services = data.rows

      return services
    } catch (err) {
      throw new Error('Failed to fetch services.')
    }
  } else {
    return mockservices.sort((a: Service, b: Service) => a.position - b.position)
  }
}

export async function getService (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Service>`
        SELECT id, label, description, image, service, position
        FROM services WHERE id = ${id};
      `

      const service = data.rows[0]

      return service
    } catch (err) {
      throw new Error(`Failed to fetch service ${id}.`)
    }
  } else {
    return mockservices.find((p: Service) => p.id === id)
  }
}

export async function getPublicServices () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Service>`
        SELECT id, label, description, image, service, position
        FROM services
        ORDER BY service DESC, position ASC;
      `

      const services = data.rows

      return services
    } catch (err) {
      throw new Error('Failed to fetch services.')
    }
  } else {
    return mockservices.sort((a: Service, b: Service) => {
      if (a.service && !b.service) return -1
      if (!a.service && b.service) return 1
      else return a.position - b.position
    })
  }
}

export async function getMaxPosition () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Service>`
        SELECT MAX(position) as position
        FROM services;
      `

      const max = data.rows[0]?.position ?? 0

      return max
    } catch (err) {
      throw new Error('Failed to fetch services.')
    }
  } else {
    return mockservices.reduce((prev: number, curr: Service) => Math.max(prev, curr.position), 0)
  }
}

export async function saveService (id: string | undefined, label: string, description: string, service: boolean) {
  if (process.env.DATA === '@vercel/postgres') {
    if (service) {
      try {
        await sql<Service>`UPDATE services SET service = false;`
      } catch (err) {
        throw new Error('Failed to unmark services')
      }
    }

    if (id != null) {
      try {
        const data = await sql<Service>`
        UPDATE services
        SET label = ${label}, description = ${description}, service = ${service}
        WHERE id = ${id};
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error(`Failed to save service ${id}: ${err as string}}`)
      }
    } else {
      try {
        const maxPosition = await getMaxPosition()
        const data = await sql<Service>`
        INSERT INTO services (id, label, description, service, position)
        VALUES (uuid_generate_v4(), ${label}, ${description}, ${service}, ${maxPosition + 1});
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save new service.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveServiceImage (id: string | undefined, filename: string, file: unknown) {
  if (process.env.DATA === '@vercel/postgres') {
    if (file != null) {
      const service = id != null ? await getService(id) : (await saveService(undefined, '', '', false)).rows[0]
      if (service == null) throw new Error('Failed to save service image')

      if (service.image != null) {
        await deleteFile(service.image)
      }

      const uploadedFile = await uploadFile(file, filename)

      await sql<Service>`
        UPDATE services SET image = ${uploadedFile.url} WHERE id = ${service.id};
      `

      revalidatePaths()
    }
  } else {
    throw new Error('Save image not implemented')
  }
}

export async function deleteService (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const service = await getService(id)

      if (service != null) {
        if (service.image != null) {
          await deleteFile(service.image)
        }

        const data = await sql<Service>`
          DELETE FROM services
          WHERE id = ${id};
        `

        revalidatePaths()

        return data
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Failed to delete service ${id}.`)
    }
  } else {
    throw new Error('Delete not implemented')
  }
}

export async function swapServices (source: string, destination: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      await sql<Service>`
        UPDATE services
        SET position = CASE
          WHEN id = ${source} THEN (SELECT position FROM services WHERE id = ${destination})
          WHEN id = ${destination} THEN (SELECT position FROM services WHERE id = ${source})
        END
        WHERE id IN (${source}, ${destination});
      `
      revalidatePaths()
    } catch (err) {
      throw new Error(`Failed to swap services ${source} and ${destination}.`)
    }
  } else {
    throw new Error('Swap not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard/servicios', 'layout')
  revalidatePath('/servicios', 'page')
  revalidatePath('/', 'page')
}
