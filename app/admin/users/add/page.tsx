// app/users/create/page.tsx
'use client'

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Container } from '@mui/material';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { useRouter } from 'next/navigation';
import CreateUserForm from '@/app/lib/components/CreateUserForm';
import Notification from '@/app/lib/components/Notification';

const CreateUserPage = () => {

    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');

    const handleCreateUser = async (userData: { name: string; email: string; password: string }) => {

        console.log(userData);
        try {
            const http = HttpClient.getInstance();
            await http.post('/api/users/create', { users: [userData] });
            setNotificationMessage('User created successfully');
            setNotificationOpen(true);
        } catch (error: any) {
            console.error('Failed to create user:', error);
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.status === 401) {
                    setNotificationMessage(error.response.data.message || 'Email already exists!');
                } else if (error.response.status === 422) {
                    // Validation error
                    const errorMessages = Object.values(error.response.data.errors).flat();
                    setNotificationMessage(errorMessages.join('. '));
                } else {
                    setNotificationMessage(error.response.data.message || 'An error occurred while creating the user');
                }
            } 
            
            setNotificationType('error');
            setNotificationOpen(true);
        }
    };
    return (
        <>
            <CreateUserForm onSubmit={handleCreateUser} />

            <Notification
                message={notificationMessage}
                open={notificationOpen}
                onClose={() => setNotificationOpen(false)}
                snackbarColor={notificationType === 'error' ? 'error' : 'success'}            />

        </>
    );
};

export default CreateUserPage;