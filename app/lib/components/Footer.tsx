import { Box, Container, Grid, Typography } from "@mui/material";
import { Event } from "../types";
import Image from "next/image";

interface FooterProps{
  event: Event;
}


const Footer = ({event}: FooterProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" color='white'>
              {event.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} container justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2" color='white'>
              {event.startDate} - {event.endDate}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: { xs: 120, sm: 170 },
                height: { xs: 15, sm: 50 },
                overflow: 'hidden',
              }}
            >
            <Image
              src="/images/powered.png"
              alt="Event Image"
              layout="fill"
              style={{ marginLeft:'0px', opacity:0.3 }} 
              
            />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;