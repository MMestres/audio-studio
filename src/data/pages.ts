'use server'

import { sql } from '@vercel/postgres'
import mockpages from '@/mocks/mockpages'
import { type PageInfo } from '@/types/PageInfo'
import { revalidatePath } from 'next/cache'

export async function getPageInfo (page: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const data = await sql<PageInfo>`
        SELECT id, title, subtitle, metatitle, metadescription, index, follow, keywords
        FROM pages
        WHERE id = ${page};
      `

      const pageInfo = data.rows[0]

      return pageInfo
    } catch (err) {
      throw new Error('Failed to fetch page info.')
    }
  } else {
    return mockpages.find((p: PageInfo) => p.id === page)
  }
}

export async function saveHeaderData (page: string, title: string, subtitle: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const pageInfo = await getPageInfo(page)

      if (pageInfo != null) {
        const data = await sql<PageInfo>`
          UPDATE pages
          SET title = ${title}, subtitle = ${subtitle}
          WHERE id = ${page};
        `
        revalidatePaths()

        return data
      } else {
        const data = await sql<PageInfo>`
          INSERT INTO pages (id, title, subtitle, metatitle, metadescription, index, follow, keywords)
          VALUES (${page}, ${title}, ${subtitle}, '', '', false, false, '');
        `
        revalidatePaths()

        return data
      }
    } catch (err) {
      throw new Error('Failed to save header data.')
    }
  } else {
    throw new Error('Save not implemented')
  }
}

export async function saveMetadata (page: string, metatitle: string, metadescription: string, index: boolean, follow: boolean, keywords: string) {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const pageInfo = await getPageInfo(page)
      if (pageInfo != null) {
        const data = await sql<PageInfo>`
          UPDATE pages
          SET metatitle = ${metatitle}, metadescription = ${metadescription}, index = ${index}, follow = ${follow}, keywords = ${keywords}
          WHERE id = ${page};
        `
        revalidatePaths()

        return data
      } else {
        const data = await sql<PageInfo>`
          INSERT INTO pages (id, metatitle, metadescription, index, follow, keywords, title, subtitle)
          VALUES (${page}, ${metatitle}, ${metadescription}, ${index}, ${follow}, ${keywords}, '', '');
        `
        revalidatePaths()
        return data
      }
    } catch (err) {
      throw new Error('Failed to save metadata.')
    }
  } else {
    throw new Error('Save not implemented')
  }
}

function revalidatePaths () {
  revalidatePath('/', 'layout')
}
