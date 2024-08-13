import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { z } from 'zod'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*****" },
            },

            async authorize(credentials, req) {

                const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(3) }).safeParse(credentials)
                console.log(parsedCredentials);

                if (!parsedCredentials.success) {
                    throw new Error('Check your email and password');
                }

                else {
                    const http = HttpClient.getInstance();
                    await http.get('sanctum/csrf-cookie')
                    const user = parsedCredentials.data;

                    try {
                        const resp = await http.post('api/auth/credentials', { user });
                        if (resp.data.status === 'error') {
                            throw new Error(resp.data.message);
                        }
                       
                        const userData = resp.data.data;  // Capture all user data from response
                        return {
                            ...userData.user,
                            accessToken: userData.access_token,
                            eventsAvailable: userData.events_available,
                            // Add other fields as necessary
                        };


                    } catch (e) {
                        throw new Error(e.response?.data?.message || "You don't have access to this event!");
                    }
                }

            },
        }),
    ],

    callbacks: {

        async signIn({ user }) {
            // Send user data to Laravel backend
            const http = HttpClient.getInstance();
            await http.get('sanctum/csrf-cookie')
            const resp = await http.post('api/auth/google', { user })
            if (resp.data?.access_token) {
                user.accessToken = resp.data.access_token;
                return true
            } else {
                return false
            }
        },

        async jwt({ token, user, account }) {
            if (user) {
                token.accessToken = user.accessToken;  // Assuming user has accessToken property
            }
            return {...user,...token};
        },


        async session({ session, token,user }) {

            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id

            return {...session,...token,...user}
        },
    }
}

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }