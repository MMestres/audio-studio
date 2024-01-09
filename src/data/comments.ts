'use server'

import { sql } from '@vercel/postgres'
import { type Comment } from '@/types/Comment'
import mockcomments from '@/mocks/mockcomments'
import { revalidatePath } from 'next/cache'

export async function getComments (): Promise<Comment[]> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        SELECT id, title, comment, date, read, show
        FROM comment
        ORDER BY read ASC, show DESC, date DESC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch comments.')
    }
  } else {
    return mockcomments.map((p) => { return { ...p, date: new Date() } })
  }
}

export async function getComment (id: string): Promise<Comment | undefined> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        SELECT id, title, comment, date, read, show
        FROM comment
        WHERE id = ${id};
      `

      return data.rows[0]
    } catch (err) {
      throw new Error(`Failed to fetch comment ${id}.`)
    }
  } else {
    return mockcomments.map((p) => { return { ...p, date: new Date() } }).find((p) => p.id === id)
  }
}

export async function getCountUnreadComments () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        SELECT id, title, comment, date, read, show
        FROM comment
        WHERE read = false;
      `

      return data.rows.length
    } catch (err) {
      throw new Error('Failed to fetch comments count.')
    }
  } else {
    return mockcomments.filter((p) => !p.read).length
  }
}

export async function getPublicComments (): Promise<Comment[]> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        SELECT id, title, comment, date, read, show
        FROM comment
        WHERE show = true and read = true
        ORDER BY date DESC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch comment.')
    }
  } else {
    return mockcomments.map((p) => { return { ...p, date: new Date() } }).filter((p) => p.show)
  }
}

export async function saveCommentFromPublic (title: string, comment: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        INSERT INTO comment (id, title, comment, date, read, show)
        VALUES (uuid_generate_v4(), ${title}, ${comment}, NOW(), false, false);
      `
      revalidatePaths(true)

      return data
    } catch (err) {
      throw new Error('Failed to save new comment.')
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveCommentFromDash (id: string | undefined, title: string, comment: string) {
  if (process.env.DATA === '@vercel/postgres') {
    if (id != null) {
      try {
        const data = await sql<Comment>`
        UPDATE comment
        SET title = ${title}, comment = ${comment}, read = true
        WHERE id = ${id};
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error(`Failed to save comment ${id}: ${err as string}}`)
      }
    } else {
      try {
        const data = await sql<Comment>`
        INSERT INTO comment (id, title, comment, date, read, show)
        VALUES (uuid_generate_v4(), ${title}, ${comment}, NOW(), true, false);
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save new comment.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function showComment (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        UPDATE comment
        SET show = true, read = true
        WHERE id = ${id};
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to show comment ${id}.`)
    }
  } else {
    throw new Error('Show not implemented')
  }
}

export async function hideComment (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        UPDATE comment
        SET show = false, read = true
        WHERE id = ${id};
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to hide comment ${id}: ${err as string}`)
    }
  } else {
    throw new Error('Hide not implemented')
  }
}

export async function deleteComment (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Comment>`
        DELETE FROM comment
        WHERE id = ${id};
      `

      revalidatePaths()

      return data
    } catch (err) {
      throw new Error(`Failed to delete comment ${id}.`)
    }
  } else {
    throw new Error('Delete not implemented')
  }
}

function revalidatePaths (isPublic = false) {
  revalidatePath('/dashboard/opiniones', 'layout')

  if (isPublic) {
    revalidatePath('/', 'page')
  }
}
