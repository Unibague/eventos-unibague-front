import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { Image } from '@mui/icons-material';

function EventBannersCarousel(props)
{
    var items = [
        {
            url: "https://wosc.world/images/WOSC%202024%20congress/WoscBanner_3600x1200.jpg",
            id: 1
        },
        {
            url: 'https://images6.alphacoders.com/133/1333846.png',
            id: 2
        }
    ]

    return (
        <Carousel navButtonsAlwaysVisible={true}>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item({item})
{
    return (
            <img src={item.url} 
            style={{width:'100%', height:'28vh', borderRadius: '5px'}}/>
    )
}

export default EventBannersCarousel;