'use server'

import { sql } from '@vercel/postgres'
import mockcontact from '@/mocks/mockcontact'
import { type ContactData } from '@/types/ContactData'
import { revalidatePath } from 'next/cache'

export async function getContact () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<ContactData>`
        SELECT id, address, phone, mail, map
        FROM contact
        LIMIT 1;
      `

      return data.rows[0]
    } catch (err) {
      throw new Error('Failed to fetch contact.')
    }
  } else {
    return mockcontact[0]
  }
}

export async function saveContact (id: string | undefined, address: string, phone: string, mail: string, map: string) {
  if (process.env.DATA === '@vercel/postgres') {
    if (id != null) {
      try {
        const data = await sql<ContactData>`
        UPDATE contact
        SET address = ${address}, phone = ${phone}, mail = ${mail}, map = ${map}
        WHERE id = ${id};
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save contact.')
      }
    } else {
      try {
        const data = await sql<ContactData>`
        INSERT INTO contact (id, address, phone, mail, audio, map)
        VALUES (uuid_generate_v4(), ${address}, ${phone}, ${mail}, ${map});
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save contact.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard/contacto', 'layout')
  revalidatePath('/contacto', 'page')
}
