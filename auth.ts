import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Axios from './config/axios'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

declare module 'next-auth' {
	export interface Session {
		user: CustomUser
		expires: string
	}
}

export interface CustomUser {
	id: number | null
	name: string | null
	email: string | null
	email_verified_at?: string | null
	role: number | null
	created_at?: string | null
	updated_at?: string | null
	token: string | null
}

const credentialConfig = CredentialsProvider({
	type: 'credentials',
	credentials: {
		email: { label: 'Email' },
		password: { label: 'Password', type: 'password' },
	},
	async authorize(credentials) {
		// console.log({ credentials })
		const data = {
			email: credentials?.email,
			password: credentials?.password,
		}
		const res = await Axios.post('/auth/login', data)
		if (res.data.status == 200) {
			return res.data.user
		}

		return null
	},
})

const config: NextAuthConfig = {
	providers: [credentialConfig],
	callbacks: {
		// authorized({ request, auth }) {
		// 	const { pathname } = request.nextUrl
		// 	return true
		// },

		async jwt({ token, user, trigger }) {
			if (user) {
				token.user = user
			}
			return token
		},

		async session({
			token,
			user,
			session,
		}: {
			token: JWT
			user: any
			session: any
		}) {
			session.user = token.user as CustomUser
			return session
		},
	},
}

export const { handlers, signIn, signOut, auth } = NextAuth(config)
