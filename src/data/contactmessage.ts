'use server'

import { type ContactMessage } from '@/types/ContactMessage'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'

export async function getContactMessages (): Promise<ContactMessage[]> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<ContactMessage>`
        SELECT id, name, email, message, date, read
        FROM contactmessage
        ORDER BY read ASC, date DESC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch contact messages.')
    }
  } else {
    return []
  }
}

export async function getContactMessage (id: string): Promise<ContactMessage | undefined> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<ContactMessage>`
        SELECT id, name, email, message, date, read
        FROM contactmessage
        WHERE id = ${id};
      `

      return data.rows[0]
    } catch (err) {
      throw new Error(`Failed to fetch contact message ${id}.`)
    }
  } else {
    return undefined
  }
}

export async function getCountUnreadContactMessages () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        SELECT id, name, email, message, date, read
        FROM contactmessage
        WHERE read = false;
      `

      return data.rows.length
    } catch (err) {
      throw new Error('Failed to fetch contact messages count.')
    }
  } else {
    return 0
  }
}

export async function markContactMessageRead (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        UPDATE contactmessage
        SET read = true
        WHERE id = ${id};
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to read contact messages ${id}.`)
    }
  } else {
    throw new Error('Show not implemented')
  }
}

export async function markContactMessageUnread (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        UPDATE contactmessage
        SET read = false
        WHERE id = ${id};
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to read contact messages ${id}.`)
    }
  } else {
    throw new Error('Show not implemented')
  }
}

export async function deleteContactMessage (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<ContactMessage>`
        DELETE FROM contactmessage
        WHERE id = ${id};
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to delete contact message ${id}.`)
    }
  } else {
    throw new Error('Delete not implemented')
  }
}

export async function createContactMessage (name: string, email: string, message: string) {
  if (process.env.DATA === '@vercel/postgres') {
    console.log(name, email, message)

    try {
      const data = await sql<ContactMessage>`
        INSERT INTO contactmessage (id, name, email, message, date, read)
        VALUES (uuid_generate_v4(), ${name}, ${email}, ${message}, NOW(), false);
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to create contact message: ${err as string}}`)
    }
  } else {
    throw new Error('Save not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard', 'layout')
}
