'use server'

import { sql } from '@vercel/postgres'
import mockvideo from '@/mocks/mockvideo'
import { type Video } from '@/types/Video'
import { revalidatePath } from 'next/cache'

export async function getVideo () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Video>`
        SELECT id, playlistid
        FROM video
        LIMIT 1;
      `

      return data.rows[0]
    } catch (err) {
      throw new Error('Failed to fetch video.')
    }
  } else {
    return mockvideo[0]
  }
}

export async function saveVideo (id: string | undefined, playlistid: string) {
  if (process.env.DATA === '@vercel/postgres') {
    if (id != null) {
      try {
        const data = await sql<Video>`
        UPDATE video
        SET playlistid = ${playlistid}
        WHERE id = ${id};
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save video')
      }
    } else {
      try {
        const data = await sql<Video>`
        INSERT INTO video (id, playlistid)
        VALUES (uuid_generate_v4(), ${playlistid});
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save video.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard/video', 'layout')
  revalidatePath('/video', 'page')
}
