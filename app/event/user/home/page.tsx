'use client'
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

export const UserHomePage = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserData();
    }
  }, []);


  const getUserData = async () =>{
    const http = HttpClient.getInstance();
    let response = await http.post('api/userData', null)
    setUserData(response.data);
    console.log(response.data);
  }

  return (
    <> 
    <div> Aquí iría un diseño bien bonito para el home </div>
    <Typography component="pre" sx={{color:'white'}}> {JSON.stringify(userData)}</Typography>
    </>
  )
}


export default UserHomePage;
