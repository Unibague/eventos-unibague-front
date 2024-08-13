// next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    } & DefaultSession['user'];
  }

  interface User {
    accessToken?: string;
    // Add any other properties you expect to have on the user
  }
}
