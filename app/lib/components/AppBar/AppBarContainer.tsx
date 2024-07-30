import { AppBar } from '@mui/material';
import WaveEffect from './WaveEffect';
import AppBarContent from './AppBarContent';

export default function AppBarContainer({event}) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#003d7c',
        position: 'relative',
        zIndex: 1,
        paddingBottom: '25px',
      }}
    >
      <AppBarContent event = {event} />
      <WaveEffect />
    </AppBar>
  );
}
