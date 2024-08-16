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
  console.log(session, "fejjwejfj")

  const handleHomeClick = () => {
    router.push('/landing');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/landing' });
  };

  return (
    <Toolbar>
      <IconButton onClick={handleHomeClick}>
        <HomeIcon sx={{ fontSize: '35px', color: 'secondary.main' }} />
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      {session && <h6>{session.user.name}</h6>}

      <Link href={`/event/${event.id}/messages/view`} passHref>
        <IconButton color="secondary" sx={{ display: 'flex' }}>
          <Badge color="error" variant="dot" invisible={false}>
            <NotificationsIcon sx={{ fontSize: '28px' }} />
          </Badge>
        </IconButton>
      </Link>

      {session && (
        <IconButton onClick={handleSignOut} color="secondary" sx={{ display: 'flex' }}>
          <LogoutIcon sx={{ fontSize: '25px' }} />
        </IconButton>
      )}
    </Toolbar>
  );
};

export default AppBarContent;
