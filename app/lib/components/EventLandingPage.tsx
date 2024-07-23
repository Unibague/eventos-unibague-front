import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

interface EventCardProps{
  image: string,
  name: string,
  location: string,
  startDate: Date,
  endDate: Date,  
}


export default function EventCard({image,name, location, startDate, endDate}: EventCardProps) {
  return (

    <>
    <Card sx={{ maxWidth: 345, mb:'15px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://wosc.world/images/WOSC 2024 congress/WoscBanner_3600x1200.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Wosc 19th Congress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Oxford, UK <br />
            Sept 11-13
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://www.unibague.edu.co//images/2024/banners/bg-acreditacion-julio2.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Semana de la ciencia
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Univsersidad de Ibagué, Tolima <br />
            12/07/2024 - 17/07/2024
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

    
    </>
  );
}
