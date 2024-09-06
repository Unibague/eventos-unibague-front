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
import { useEffect, useState } from 'react';
import { HttpClient } from '../../Http/HttpClient';

interface AppBarProps {
  event: Event;
  eventLogo: EventFile;
}

const AppBarContent = ({ event, eventLogo }: AppBarProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [hasUnreadMessages, setHasUnreadMessages] = useState(session?.user?.hasUnreadMessages ?? false);

  const handleHomeClick = () => {
    router.push('/landing');
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/landing' });
  };

  const handleBadgeClick = async () => {
    try {
      const http = HttpClient.getInstance();
      await http.get(`/api/users/${session?.user?.id}/markReadMessages`);
      setHasUnreadMessages(false);
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      const interval = setInterval(async () => {
        try {
          const http = HttpClient.getInstance();
          const response = await http.get(`/api/users/${session.user.id}/hasUnreadMessages`);
          if (response.data.hasUnreadMessages !== hasUnreadMessages) {
            setHasUnreadMessages(response.data.hasUnreadMessages);
          }
        } catch (error) {
          console.error('Failed to fetch unread messages status:', error);
        }
      }, 60000); // Polling interval: 100 seconds = 1,6 minutes

      return () => clearInterval(interval);
    }
  }, [session?.user?.id, hasUnreadMessages, event.id]);

  return (
    <Toolbar>
      <IconButton onClick={handleHomeClick} sx={{ marginRight: 1, padding: 0 }}>
        <HomeIcon sx={{ fontSize: '30px', color: 'secondary.main' }} />
      </IconButton>

      <Link href={`/event/${event.id}/home`} passHref>
        <IconButton sx={{ padding: 0 }}>
          <Box
            sx={{
              position: 'relative',
              width: 85, // Adjust size as needed
              height: 85,
              marginRight: 1, // Reduce margin right for better space utilization
            }}
          >
            <Image
              src={eventLogo.payload.source}
              alt={event.name}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 600px) 50px, 50px" // Define sizes for different viewports
            />
          </Box>
        </IconButton>
      </Link>

      <Box sx={{ flexGrow: 1 }} />

      {session && <Typography 
      fontSize={16}
      fontWeight="bold"
      sx={{
        maxWidth: '150px', // Set a max width to prevent overflow
        overflow: 'hidden', // Hide overflow
        whiteSpace: 'nowrap', // Prevent text from wrapping to next line
        textOverflow: 'ellipsis', // Show "..." if the text is too long
      }}
      >
        {session.user.name}</Typography>}

      <Link href={`/event/${event.id}/messages/view`} passHref>
        <IconButton 
          color="secondary" 
          sx={{ display: 'flex' }}
          onClick={handleBadgeClick}
        >
          <Badge color="error" 
            variant="dot" 
            invisible={!hasUnreadMessages}
          >
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
