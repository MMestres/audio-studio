'use server'

import { sql } from '@vercel/postgres'
import { type Audio } from '@/types/Audio'
import mockaudio from '@/mocks/mockaudio'
import { revalidatePath } from 'next/cache'
import { deleteFile, uploadFile } from './file'

export async function getAudios () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Audio>`
        SELECT id, title, artists, file, image, audio, position
        FROM audio
        ORDER BY position ASC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch audios.')
    }
  } else {
    return mockaudio.sort((a: Audio, b: Audio) => a.position - b.position)
  }
}

export async function getAudio (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Audio>`
        SELECT id, title, artists, file, image, audio, position
        FROM audio
        WHERE id = ${id};
      `

      return data.rows[0]
    } catch (err) {
      throw new Error(`Failed to fetch audio ${id}.`)
    }
  } else {
    return mockaudio.find((p: Audio) => p.id === id)
  }
}

export async function getPublicAudios () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Audio>`
        SELECT id, title, artists, file, image, audio, position
        FROM audio
        ORDER BY audio DESC, position ASC;
      `

      return data.rows
    } catch (err) {
      throw new Error('Failed to fetch audio.')
    }
  } else {
    return mockaudio.sort((a: Audio, b: Audio) => {
      if (a.audio && !b.audio) return -1
      if (!a.audio && b.audio) return 1
      else return a.position - b.position
    })
  }
}

export async function getMaxPosition () {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<Audio>`
        SELECT MAX(position) as position
        FROM audio;
      `

      const max = data.rows[0]?.position ?? 0

      return max
    } catch (err) {
      throw new Error('Failed to fetch audio.')
    }
  } else {
    return mockaudio.reduce((prev: number, curr: Audio) => Math.max(prev, curr.position), 0)
  }
}

export async function saveAudio (id: string | undefined, title: string, artists: string, audio: boolean) {
  if (process.env.DATA === '@vercel/postgres') {
    if (audio) {
      try {
        await sql<Audio>`UPDATE audio SET audio = false;`
      } catch (err) {
        throw new Error('Failed to unmark audios')
      }
    }

    if (id != null) {
      try {
        const data = await sql<Audio>`
        UPDATE audio
        SET title = ${title}, artists = ${artists}, audio = ${audio}
        WHERE id = ${id};
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error(`Failed to save audio ${id}: ${err as string}}`)
      }
    } else {
      try {
        const maxPosition = await getMaxPosition()
        const data = await sql<Audio>`
        INSERT INTO audio (id, title, artists, audio, position)
        VALUES (uuid_generate_v4(), ${title}, ${artists}, ${audio}, ${maxPosition + 1});
      `
        revalidatePaths()

        return data
      } catch (err) {
        throw new Error('Failed to save new audio.')
      }
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveAudioImage (id: string | undefined, filename: string, file: unknown) {
  if (process.env.DATA === '@vercel/postgres') {
    if (file != null) {
      const audio = id != null ? await getAudio(id) : (await saveAudio(undefined, '', '', false)).rows[0]
      if (audio == null) throw new Error('Failed to save audio file.')

      if (audio.image != null && audio.image !== '') {
        await deleteFile(audio.image)
      }

      const uploadedFile = await uploadFile(file, filename)

      const data = await sql<Audio>`
        UPDATE audio
        SET image = ${uploadedFile.url}
        WHERE id = ${audio.id};
      `

      revalidatePaths()

      return data
    } else {
      return null
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveAudioFile (id: string | undefined, filename: string, file: unknown) {
  if (process.env.DATA === '@vercel/postgres') {
    if (file != null) {
      const audio = id != null ? await getAudio(id) : (await saveAudio(undefined, '', '', false)).rows[0]
      if (audio == null) throw new Error('Failed to save audio file.')

      if (audio.file != null && audio.file !== '') {
        await deleteFile(audio.file)
      }

      const uploadedFile = await uploadFile(file, filename)

      const data = await sql<Audio>`
        UPDATE audio
        SET file = ${uploadedFile.url}
        WHERE id = ${audio.id};
      `

      revalidatePaths()

      return data
    } else {
      return null
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function deleteAudio (id: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const audio = await getAudio(id)

      if (audio != null) {
        if (audio.image != null && audio.image !== '') {
          await deleteFile(audio.image)
        }

        const data = await sql<Audio>`
          DELETE FROM audio
          WHERE id = ${id};
        `

        revalidatePaths()

        return data
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Failed to delete audio ${id}.`)
    }
  } else {
    throw new Error('Delete not implemented')
  }
}

export async function swapAudios (source: string, destination: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      await sql<Audio>`
        UPDATE audio
        SET position = CASE
          WHEN id = ${source} THEN (SELECT position FROM audio WHERE id = ${destination})
          WHEN id = ${destination} THEN (SELECT position FROM audio WHERE id = ${source})
        END
        WHERE id IN (${source}, ${destination});
      `
      revalidatePaths()
    } catch (err) {
      throw new Error(`Failed to swap audios ${source} and ${destination}.`)
    }
  } else {
    throw new Error('Swap not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/', 'layout')
}
