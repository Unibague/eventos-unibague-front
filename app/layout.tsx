import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { blueTheme } from './theme/blueTheme';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {getServerSession} from 'next-auth'
import SessionProvider from './lib/components/SessionProvider'
import * as dotenv from 'dotenv'

dotenv.config();

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
              {children}
            </ThemeProvider>
            </SessionProvider>
          </AppRouterCacheProvider>
        </body>
      </head>
    </html>
  );
}
