'use server'

import mockkusers from '@/mocks/mockusers.json'
import { sql } from '@vercel/postgres'
import { type User } from '@/types/User'

export async function getUser (username: string): Promise<User | undefined> {
  if (process.env.DATA === '@vercel/postgres') {
    try {
      const user = await sql<User>`SELECT * from USERS where username=${username}`
      return user.rows[0]
    } catch (error) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
  } else {
    const users = mockkusers as User[]

    return users[0]
  }
}
