// app/components/EventUserAssignment.tsx
'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  List,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Event, User } from '@/app/lib/types';
import { HttpClient } from '@/app/lib/Http/HttpClient';
import { convertSnakeToCamel } from '@/app/lib/utils';
import Notification from '@/app/lib/components/Notification';
import { prepareErrorText } from '@/app/lib/utils/index';

const EventUserAssignment: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>(
    'success',
  );
  const [isLoading, setIsLoading] = useState(true); // Loading state for data fetching
  const [isSending, setIsSending] = useState(false);

  async function getEvents() {
    setIsLoading(true);
    try {
      const http = HttpClient.getInstance();
      let response = await http.get('/api/events/', {
        params: { restrictedAccess: true },
      });
      let events = response.data.map((element: any) => {
        return convertSnakeToCamel(element);
      });
      setEvents(events as Event[]);
      console.log(events);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getUsers() {
    setIsLoading(true);
    try {
      const http = HttpClient.getInstance();
      let response = await http.get('/api/users');
      const users = response.data.map((element: any) => {
        return convertSnakeToCamel(element);
      });
      setUsers(users as User[]);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getEvents();
    getUsers();
  }, []);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setSelectedUsers(event.users || []);
    setAdmins(event.admins || []);
  };

  const handleUserSelect = (user: User, isAdmin: boolean) => {
    if (selectedEvent) {
      if (isAdmin) {
        setAdmins((prev) =>
          prev.some((u) => u.id === user.id)
            ? prev.filter((u) => u.id !== user.id)
            : [...prev, user],
        );
      } else {
        setSelectedUsers((prev) =>
          prev.some((u) => u.id === user.id)
            ? prev.filter((u) => u.id !== user.id)
            : [...prev, user],
        );
      }
    }
  };

  const handleSaveAssignments = async () => {
    if (selectedEvent) {
      setIsSending(true);

      try {
        console.log(selectedUsers, selectedEvent);
        const http = HttpClient.getInstance();
        const resp = await http.post(
          `api/event/${selectedEvent.id}/users/assign`,
          { users: selectedUsers, admins },
        );
        setNotificationMessage(resp.data.message);
        setNotificationOpen(true);
        // Re-fetch events and users after saving
        await getEvents();

        // Re-fetch the updated event data, including the users
        const updatedEvent = {
          ...selectedEvent,
          users: selectedUsers, // Keep the current selected users in the event
          admins: admins,
        };

        setSelectedEvent(updatedEvent); // Update the selected event with the current users
      } catch (error: any) {
        setNotificationMessage(prepareErrorText(error));
        setNotificationOpen(true);
      }
    }
    setIsSending(false);
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 900,
          margin: 'auto',
          mt: 4,
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Event Users Assignment
        </Typography>

        {isLoading ? (
          <Box textAlign="center" p={2}>
            <CircularProgress />
            <Typography variant="body1" mt={2}>
              Loading data...
            </Typography>
          </Box>
        ) : (
          <List>
            {events.map((event) => (
              <Accordion
                key={event.id}
                onChange={() => handleEventClick(event)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{event.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="h6" gutterBottom>
                        Allowed Assistants
                      </Typography>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                          {users.map((user) => (
                            <FormControlLabel
                              key={user.id}
                              control={
                                <Checkbox
                                  checked={selectedUsers.some(
                                    (u) => u.id === user.id,
                                  )}
                                  onChange={() => handleUserSelect(user, false)}
                                />
                              }
                              label={user.name}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6" gutterBottom>
                        Event Admins
                      </Typography>
                      <FormControl component="fieldset" variant="standard">
                        <FormGroup>
                          {users.map((user) => (
                            <FormControlLabel
                              key={user.id}
                              control={
                                <Checkbox
                                  checked={admins.some((u) => u.id === user.id)}
                                  onChange={() => handleUserSelect(user, true)}
                                />
                              }
                              label={user.name}
                            />
                          ))}
                        </FormGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSaveAssignments}
                      disabled={isSending}
                      sx={{ mt: 3 }}
                    >
                      {isSending ? (
                        <CircularProgress size={24} />
                      ) : (
                        'Save Assignments'
                      )}
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </List>
        )}
      </Box>

      <Notification
        message={notificationMessage}
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        snackbarColor={notificationType === 'error' ? 'red' : 'green'}
      />
    </>
  );
};

export default EventUserAssignment;
