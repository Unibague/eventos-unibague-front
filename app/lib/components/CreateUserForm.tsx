// app/components/CreateUserForm.tsx
'use client'

import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface CreateUserFormProps {
  onSubmit: (userData: { name: string; email: string; password: string }) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password });
    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4, px:2}}>
      <Typography variant="h6" gutterBottom>
        Create New User
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create User
      </Button>
    </Box>
  );
};

export default CreateUserForm;