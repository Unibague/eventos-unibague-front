import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from 'zod';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import GoogleProvider from "next-auth/providers/google";
import { convertSnakeToCamel } from "./snakeToCamelCase";

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
              throw new Error('Check your email and password syntax');
            }
            //At this point, the credentials are already validated from Frontend

            //Now validate them from backend
            const userData = parsedCredentials.data
            const http = HttpClient.getInstance();
            await http.get('sanctum/csrf-cookie');
            try {
              const resp = await http.post('api/auth/credentials/validate', {user: userData});
              if (resp.data.status === 'error') {
                throw new Error(resp.data.message);
              }

              console.log(resp.data, 'respuesta del back que valida las credenciales')

              return {
                id: "",
                email: resp.data.email,
              };
            } catch (e: any) {
              throw new Error(e.response?.data?.message || "Unknown error");
            }
          },
        }),
      ],

      session: {
        maxAge: 3600 * 8,
      },

      callbacks: {

        async jwt({ token, user }) {
          // If user object exists, store it in the token

          console.log(user, 'objeto user inicial, que es el que usaremos para mandar el email')
          return {...token, ...user};
        },

        async session({ session, token}) {
          session.user = {...token}

          console.log(token, 'lo que viene en el token')
          
          console.log(session.user, 'objeto session user inicial, con la data inicial de la sesion')
          try {
            if (session.user?.email) {
              const http = HttpClient.getInstance();
              const resp = await http.post('api/userInfo', {email:session.user?.email});
              console.log(resp.data, 'Información del user devuelta por el back que será asignada al session.user')
              session.user = convertSnakeToCamel(resp.data);
              }
          } catch (error) {
            console.error("Error fetching user data from backend:", error);
          }
          return session;
        },
      },
}