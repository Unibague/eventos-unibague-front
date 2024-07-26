'use client'
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { Image } from '@mui/icons-material';
import { Box } from '@mui/material'


function EventBannersCarousel(props)
{
    var items = [

        {
            url: "/images/wosc.jpg",
            id: 1
        },
        {
            url: "/images/wosc2.jpg",
            id: 1
        },

    ]

    return (
        <Carousel navButtonsAlwaysVisible={true}>
            {
                items.map( (item, i) => <Item key={i} item={item}/> )
            }
        </Carousel>
    )
}

function Item({item})
{
    return (
       
        <Box component="img"
        src={item.url}
        sx={{width: '100%',
            height: {
                xs: '28vh',  // height for mobile devices
                sm: '40vh',  // height for small screens
                md: '50vh',  // height for medium screens
                lg: '60vh'   // height for large screens
            },
            borderRadius: '5px'
            }}>
        </Box>
    )
}

export default EventBannersCarousel;
