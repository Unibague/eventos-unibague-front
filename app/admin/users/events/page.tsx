// app/events/manage-access/page.tsx
'use client'

import React from 'react';
import { Container } from '@mui/material';
import EventUserAssignment from '@/app/lib/components/EventUserAssignment';

const ManageEventAccessPage = () => {
  return (
    <Container>
      <EventUserAssignment />
    </Container>
  );
};

export default ManageEventAccessPage;