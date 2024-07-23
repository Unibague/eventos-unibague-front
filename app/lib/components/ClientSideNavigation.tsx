'use client';

import { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import DialogPage from './DialogPage';

export default function ClientSideNavigation() {
  const [value, setValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const router = useRouter();

  const logoutUser = () => {
      console.log('Te voy a deslogear la compu')
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        router.push('/login/setup2FA'); // Replace with your route
        break;
      case 1:
        router.push('/login/validate2FA'); // Replace with your route
        break;
      case 2:
        return // Replace with your route
        break;
      case 3:
        setDialogContent(
            <Typography>¿Estás seguro de que deseas cerrar sesión?</Typography>
        );
        setDialogOpen(true);
        break;
        default:
        break;
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
    <BottomNavigation showLabels value={value} onChange={handleChange}
    sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000, // Ensures the BottomNavigation is above other elements
    }}>
      <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
      <BottomNavigationAction label="Pagar" icon={<ShoppingCartIcon />} />
      <BottomNavigationAction label="Recargar" icon={<CurrencyExchangeIcon />}/>
      <BottomNavigationAction label="Salir" icon={<LogoutIcon />} />
    </BottomNavigation>

    <DialogPage
        open={dialogOpen}
        handleClose={handleCloseDialog}
        dialogTitle="Confirmar Cierre de Sesión"
        cancelActionLabel='Cancelar'
        cancelAction={() => setDialogOpen(false)}
        acceptActionLabel='Aceptar'
        acceptAction={() => logoutUser()}
      >
        {dialogContent}
      </DialogPage>
  </>
  );
}
