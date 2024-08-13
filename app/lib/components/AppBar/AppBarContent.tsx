'use client'
import { Toolbar, Typography, Box, Badge, IconButton } from '@mui/material';
import Link from 'next/link';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Event, EventFile } from '../../types';
import Image from 'next/image';
import {signIn, signOut, useSession} from 'next-auth/react'
import LogoutIcon from '@mui/icons-material/Logout';

interface AppBarProps {
  event: Event;
  eventLogo: EventFile
}

const AppBarContent = ({ event, eventLogo }: AppBarProps) => {

  const {data: session} = useSession();
  // console.log({session});

  return (
    <Toolbar>
      <Typography variant="h6" noWrap color="#ffffff">
        <Link href={`/event/${event.id}/home`}>
          <Image
            src={eventLogo.payload.source}
            alt="Event Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '30%', height: 'auto', borderRadius:'15px'}}
          />
        </Link>
      </Typography>

      {session ? 
      <> 
      <h6> {session?.user?.name} </h6>
       
       <button onClick={() => signOut()}> Sign Out</button> 
      </>
      
      : 
      
      <> 
      <h6> Not Signed it </h6>
       
       <button onClick={() => signIn()}> Sign In</button> 
      </>
      
      }

      <Box sx={{ flexGrow: 1 }} />

      <Link href={`/event/${event.id}/messages/view`} passHref>
        <IconButton color="secondary" sx={{ display: 'flex' }}>
          <Badge color="error" variant="dot" invisible={false}>
            <NotificationsIcon sx={{ fontSize: '28px' }} />
          </Badge>
        </IconButton>
      </Link>

      <Link href={`/event/${event.id}/messages/view`} passHref>
        <IconButton color="secondary" sx={{ display: 'flex' }}>
            <LogoutIcon sx={{ fontSize: '20px' }} />
        </IconButton>
      </Link>

    </Toolbar>
  );
};

export default AppBarContent;
