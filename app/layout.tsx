import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { blueTheme } from './theme/blueTheme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { getServerSession } from 'next-auth'
import SessionProvider from './lib/components/SessionProvider'
import * as dotenv from 'dotenv'
import type { Metadata } from "next";
import { UserProvider } from "./context/userContext";
import ProtectedRoutes from './lib/utils/ProtectedRoutes';

dotenv.config();

export const metadata: Metadata = {
  title: "Eventos Unibagué",
  description: "Unibagué App to create and manage events",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "JEstebanGnz",
      url: "https://www.linkedin.com/in/jestebangonzalez/",
    },
  ],
  icons: [
    { rel: "unibague-touch-icon", url: "/images/pwa-icons/icon-128x128.png" },
    { rel: "icon", url: "/images/pwa-icons/icon-128x128.png" },
  ],
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <body>
          <AppRouterCacheProvider>
              <SessionProvider session={session}>
                <ThemeProvider theme={blueTheme}>
                  <CssBaseline />
                  <ProtectedRoutes>{children}</ProtectedRoutes>
                </ThemeProvider>
              </SessionProvider>
          </AppRouterCacheProvider>
        </body>
      </head>
    </html>
  );
}
