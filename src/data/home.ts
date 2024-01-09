'use server'

import mockhomeprops from '@/mocks/mockhomeprops'
import { sql } from '@vercel/postgres'
import { type HomeProp } from '@/types/HomeProp'
import { type HomeBlock } from '@/types/HomeBlock'
import { type HomeBanner } from '@/types/HomeBanner'
import { type HomeSummary } from '@/types/HomeSummary'
import { type HomeComment } from '@/types/HomeComment'
import { revalidatePath } from 'next/cache'
import { type ContactFormText } from '@/types/ContactFormText'
import { deleteFile, uploadFile } from './file'

export async function getHomeInformation (): Promise<HomeProp[] | undefined> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const homeprops = await sql<HomeProp>`SELECT * from homeprops`
      return homeprops.rows
    } catch (error) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
  } else {
    const mocks = mockhomeprops as HomeProp[]
    return mocks
  }
}

export async function getHomeBlock (): Promise<HomeBlock | undefined> {
  const info = await getHomeInformation()
  if (info != null) {
    return {
      contactButtonText: info.find((item) => item.property === 'contactButtonText')?.value ?? '',
      commentButtonText: info.find((item) => item.property === 'commentButtonText')?.value ?? '',
      topText: info.find((item) => item.property === 'topText')?.value ?? '',
      smallTopText: info.find((item) => item.property === 'smallTopText')?.value ?? '',
      audio: info.find((item) => item.property === 'audio')?.value ?? ''
    }
  } else {
    return undefined
  }
}

export async function getHomeBanner (): Promise<HomeBanner | undefined> {
  const info = await getHomeInformation()
  if (info != null) {
    return {
      bannerTitle: info.find((item) => item.property === 'bannerTitle')?.value ?? '',
      bannerText: info.find((item) => item.property === 'bannerText')?.value ?? '',
      bannerImage: info.find((item) => item.property === 'bannerImage')?.value ?? ''
    }
  } else {
    return undefined
  }
}

export async function getHomeSummary (): Promise<HomeSummary | undefined> {
  const info = await getHomeInformation()
  if (info != null) {
    return {
      summaryText: info.find((item) => item.property === 'summaryText')?.value ?? '',
      service: info.find((item) => item.property === 'service')?.value ?? '',
      serviceText: info.find((item) => item.property === 'serviceText')?.value ?? '',
      ressource: info.find((item) => item.property === 'ressource')?.value ?? '',
      ressourceText: info.find((item) => item.property === 'ressourceText')?.value ?? '',
      studio: info.find((item) => item.property === 'studio')?.value ?? '',
      studioText: info.find((item) => item.property === 'studioText')?.value ?? ''
    }
  } else {
    return undefined
  }
}

export async function getHomeComment (): Promise<HomeComment | undefined> {
  const info = await getHomeInformation()
  if (info != null) {
    return {
      commentTitle: info.find((item) => item.property === 'commentTitle')?.value ?? '',
      commentText: info.find((item) => item.property === 'commentText')?.value ?? '',
      newCommentLink: info.find((item) => item.property === 'newCommentLink')?.value ?? '',
      newCommentTitle: info.find((item) => item.property === 'newCommentTitle')?.value ?? '',
      newCommentText: info.find((item) => item.property === 'newCommentText')?.value ?? '',
      messageInputName: info.find((item) => item.property === 'messageInputName')?.value ?? '',
      messageInputMessage: info.find((item) => item.property === 'messageInputMessage')?.value ?? '',
      messageInputSubmit: info.find((item) => item.property === 'messageInputSubmit')?.value ?? ''
    }
  } else {
    return undefined
  }
}

export async function getContactFormTexts (): Promise<ContactFormText | undefined> {
  const info = await getHomeInformation()
  if (info != null) {
    return {
      contactInputName: info.find((item) => item.property === 'contactInputName')?.value ?? '',
      contactInputEmail: info.find((item) => item.property === 'contactInputEmail')?.value ?? '',
      contactInputMessage: info.find((item) => item.property === 'contactInputMessage')?.value ?? '',
      contactInputSubmit: info.find((item) => item.property === 'contactInputSubmit')?.value ?? ''
    }
  } else {
    return undefined
  }
}

export async function saveHomeProps (props: Record<string, string>) {
  if (process.env.DATA === '@vercel/postgres') {
    const res = await Promise.all(
      Object.keys(props).map(async (key) => {
        return await sql<HomeProp>`
        UPDATE homeprops SET value = ${props[key]} WHERE property = ${key};
      `
      })
    )

    revalidatePaths()

    return res
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveHomeFileProps (props: Record<string, { filename: string, file: unknown }>) {
  if (process.env.DATA === '@vercel/postgres') {
    const filesToDelete = (await getHomeInformation())?.filter(
      (item: HomeProp) => item.property in Object.keys(props) && item.value != null && item.value !== ''
    )

    if (filesToDelete != null && filesToDelete.length > 0) {
      for (const file of filesToDelete) {
        await deleteFile(file.value)
      }
    }

    const res = await Promise.all(
      Object.keys(props).map(async (key) => {
        const { filename, file } = props[key]
        const uploadedFile = await uploadFile(file, filename)

        return await sql<HomeProp>`
        UPDATE homeprops SET value = ${uploadedFile.url} WHERE property = ${key};
      `
      })
    )

    revalidatePaths()

    return res
  } else {
    throw new Error('Save not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/dashboard', 'page')
  revalidatePath('/', 'page')
}
