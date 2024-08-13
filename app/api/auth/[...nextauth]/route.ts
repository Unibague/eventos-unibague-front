import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { HttpClient } from '@/app/lib/Http/HttpClient';

export const authOptions: NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.googleClientId ?? "",
            clientSecret: process.env.googleClientSecret ?? "",
        })
    ],

    callbacks: {
        
        async signIn({ user }) {
            // Send user data to Laravel backend
            const http = HttpClient.getInstance();
            const resp = await http.post('api/auth/google',{user})
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
            return token;
          },
        },

        async session({ session, token }) {

            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id
            
            return session
          },

}

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}