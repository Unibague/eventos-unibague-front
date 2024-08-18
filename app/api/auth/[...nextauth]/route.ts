import NextAuth from 'next-auth/next';
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { z } from 'zod';
import {authOptions} from '@/app/lib/utils/authOptions'

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
