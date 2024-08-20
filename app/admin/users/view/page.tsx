'use client'
// import UsersManagement from '@/app/lib/components/Users'
import { Box, Button, Grid, Typography, CircularProgress, Snackbar } from '@mui/material';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { convertSnakeToCamel } from '@/app/lib/utils';
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from 'react';
import {User, Role} from '@/app/lib/types'
import UsersTable from '@/app/lib/components/UsersTable';


const UsersManagementPage = () => {

    const { data: session, status } = useSession();
    const [users, setUsers] = useState<User[] | null>(null);
    const [roles, setRoles] = useState<Role[] | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const getUsers = useCallback(async () => {
      try {
          const http = HttpClient.getInstance();
          let response = await http.get('/api/users');
          const users = response.data.map((element: any) => {
              return convertSnakeToCamel(element);
          });
          setUsers(users);
      } catch (error) {
          console.error('Failed to fetch users:', error);
          setError('Failed to fetch users. Please try again later.');
      }
  }, []);

  const getRoles = useCallback(async () => {
      try {
          const http = HttpClient.getInstance();
          let response = await http.get('/api/roles');
          const roles = response.data.map((element: any) => {
              return convertSnakeToCamel(element);
          });
          setRoles(roles);
      } catch (error) {
          console.error('Failed to fetch roles:', error);
          setError('Failed to fetch roles. Please try again later.');
      }
  }, []);

  useEffect(() => {
      getUsers();
      getRoles();
  }, [getUsers, getRoles]);

    if (error) {
        return <Typography color="error">{error}</Typography>;
      }

      if (!users || !roles) {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        );
      }

      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            User Management
          </Typography>
          <UsersTable users={users} roles={roles} onUserRolesUpdated={() => getUsers()}/>
        </Box>
      );



}

export default UsersManagementPage