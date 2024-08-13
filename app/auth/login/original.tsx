import { Grid, Typography, Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import Link from 'next/link';

export const Login = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', textAlign: 'center', px:3 }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Eventos Unibagué
      </Typography>
      <Link href="/googleLoginRedirect">
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ maxWidth: 400 }}
      >
        <Google />
        <Typography sx={{ ml: 1 }}>Ingresar con Google</Typography>
      </Button>
      </Link>
    </Grid>
  );
};

export default Login;
