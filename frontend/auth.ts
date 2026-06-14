import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prisma';
import bcrypt from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
	secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Please enter an email and password');
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email as string },
				});

				if (!user || !user.password) {
					throw new Error('No user found with this email');
				}

				const passwordMatch = await bcrypt.compare(
					credentials.password as string,
					user.password
				);

				if (!passwordMatch) {
					throw new Error('Incorrect password');
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role, // Attach the role to the returned user
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			// Attach user details to the session
			if (session.user) {
				session.user.id = token.id as string;
				session.user.role = token.role as string;
			}
			return session;
		},
		async jwt({ token, user }) {
			// user is only available the first time right after sign in
			if (user) {
				token.id = user.id;
				// @ts-ignore
				token.role = user.role;
			}
			return token;
		},
	},
	pages: {
		signIn: '/login', // Custom login page
	},
});
