import bcrypt from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { getUser } from '@/data/users'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 h
    updateAge: 15 * 60 // 15m
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text', placeholder: 'Usuario' },
        password: { label: 'Contraseña', type: 'password', placeholder: 'Contraseña' }
      },
      async authorize (credentials, req) {
        const { username, password } = credentials as { username: string, password: string }

        if (username == null || username === '' || password == null || password === '') {
          throw new Error('Campos obligatorios.')
        } else {
          const user = await getUser(username)
          if (user == null) throw new Error('Usuario o contraseña incorrectos.')

          const match = await bcrypt.compare(password, user.password)
          if (match) return user
          else throw new Error('Usuario o contraseña incorrectos.')
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
