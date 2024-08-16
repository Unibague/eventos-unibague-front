import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from 'zod';
import { HttpClient } from '@/app/lib/Http/HttpClient';


import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.googleClientId ?? "",
          clientSecret: process.env.googleClientSecret ?? "",
        }),
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text", placeholder: "example@domain.com" },
            password: { label: "Password", type: "password", placeholder: "******" },
          },
          async authorize(credentials, req) {
            const parsedCredentials = z.object({
              email: z.string().email(),
              password: z.string().min(3)
            }).safeParse(credentials);
            
            if (!parsedCredentials.success) {
              throw new Error('Check your email and password');
            }
    
            const { eventId } = req.body as { eventId: string };
            const http = HttpClient.getInstance();
            await http.get('sanctum/csrf-cookie');
            const data = { user: parsedCredentials.data, eventId };
    
            try {
              const resp = await http.post('api/auth/credentials', data);
              if (resp.data.status === 'error') {
                throw new Error(resp.data.message);
              }
              const userData = resp.data.data;
              return {
                ...userData.user,
                eventsAvailable: userData.events_available,
                userEventsAdmin: userData.user_events_admin,
              };
            } catch (e: any) {
              throw new Error(e.response?.data?.message || "You don't have access to this event!");
            }
          },
        }),
      ],
      callbacks: {
        async signIn({ user }) {
          const http = HttpClient.getInstance();
          await http.get('sanctum/csrf-cookie');
          const resp = await http.post('api/auth/google', { user });
          console.log(resp.data);
          return resp.data;
        },
        async jwt({ token, user, account }) {
          console.log(user, 'userData');
          return { ...token, ...user };
        },
        async session({ session, token, user }) {
          console.log(user, 'userData2');
          session.user = token as any;
          return session;
        },
      },
}