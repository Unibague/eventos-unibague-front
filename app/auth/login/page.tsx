import { Grid, Link, TextField, Typography, Button } from '@mui/material';
import { Google } from '@mui/icons-material';

export const Login = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1, textAlign: 'center' }}>
        Una nueva forma de gestionar tu dinero dentro del campus
      </Typography>
      <form>
        <Grid container>
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button
                href="/googleLoginRedirect"
                variant="contained"
                fullWidth
                color="secondary"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Ingresar con Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Login;
