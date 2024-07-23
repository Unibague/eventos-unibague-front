'use client'
import { createTheme} from "@mui/material";
import {red} from '@mui/material/colors'

export const blueTheme = createTheme({
    palette:  {
        primary: {
            main: '#003d7c',
            alternative:'#FFFFFF',
        },
        secondary:{
            main: '#ffcc00'
        },
        error:{
            main: red.A400
        }
    }
})