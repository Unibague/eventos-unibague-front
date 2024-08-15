'use client';
import { Toolbar, Typography, Box, Badge, IconButton } from '@mui/material';
import Link from 'next/link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Event, EventFile } from '../../types';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/navigation';


interface AppBarProps {
  event: Event;
  eventLogo: EventFile;
}

const AppBarContent = ({ event, eventLogo }: AppBarProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  // console.log({session});

  return (
    <Toolbar>
      <IconButton onClick={() => router.push('/landing')}>
        <HomeIcon sx={{ fontSize: '35px' , color:'secondary.main'}}/>
      </IconButton>

      {/* <Typography variant="h6" noWrap color="#ffffff">
        <Link href={`/event/${event.id}/home`}>
          <Image
            src={eventLogo.payload.source}
            alt="Event Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '30%', height: 'auto', borderRadius: '15px' }}
          />
        </Link>
      </Typography> */}

 

      <Box sx={{ flexGrow: 1 }} />

      {session ? <h6>{session?.user.name}</h6> : null}

      <Link href={`/event/${event.id}/messages/view`} passHref>
        <IconButton color="secondary" sx={{ display: 'flex' }}>
          <Badge color="error" variant="dot" invisible={false}>
            <NotificationsIcon sx={{ fontSize: '28px' }} />
          </Badge>
        </IconButton>
      </Link>

      {session ? (
        <>
          <IconButton
            onClick={() => signOut({ callbackUrl: '/landing' })}
            color="secondary"
            sx={{ display: 'flex' }}
          >
            <LogoutIcon sx={{ fontSize: '25px' }} />
          </IconButton>
        </>
      ) : null}
    </Toolbar>
  );
};

export default AppBarContent;
