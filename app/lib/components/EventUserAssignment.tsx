// // app/components/EventUserAssignment.tsx
// 'use client'

// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Chip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Select,
//   MenuItem,
//   SelectChangeEvent,
//   FormControl,
//   InputLabel,
//   Paper,
// } from '@mui/material';
// import { Event, User } from '@/app/lib/types';
// import { HttpClient } from '@/app/lib/Http/HttpClient';
// import { convertSnakeToCamel } from '@/app/lib/utils';

// // Dummy data
// const dummyEvents: Event[] = [
//   { id: 1, name: 'Annual Conference 2024' },
//   { id: 2, name: 'Product Launch Webinar' },
//   { id: 3, name: 'Team Building Workshop' },
// ];

// const dummyUsers: User[] = [
//   { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
//   { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
//   { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
//   { id: 4, name: 'Diana Ross', email: 'diana@example.com' },
//   { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com' },
// ];

// const EventUserAssignment: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
//   const [assignedUsers, setAssignedUsers] = useState<{ [key: number]: number[] }>({});
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

//   useEffect(() => {

//     async function getRestrictedAccessEvents() {
//         try {
//           const http = HttpClient.getInstance();
//           let response = await http.get('/api/events/restricted');
//           const events = response.data.map((element: any) => {
//             return convertSnakeToCamel(element);
//           });
//           setEvents(events as Event[]);
//         } catch (error) {
//           console.error('Failed to fetch events:', error);
//         }
//       }

//     // In a real scenario, you'd fetch this data from your API
//     setEvents(dummyEvents);
//     setUsers(dummyUsers);
//     // Initialize with some dummy assignments
//     setAssignedUsers({
//       1: [1, 2],
//       2: [3, 4],
//       3: [5],
//     });

//     getRestrictedAccessEvents();

//   }, []);

//   const handleEventClick = (event: Event) => {
//     setSelectedEvent(event);
//     setDialogOpen(true);
//   };

//   const handleClose = () => {
//     setDialogOpen(false);
//     setSelectedEvent(null);
//     setSelectedUsers([]);
//   };

//   const handleUserSelect = (event: SelectChangeEvent<number[]>) => {
//     setSelectedUsers(event.target.value as number[]);
//   };

//   const handleAssignUsers = () => {
//     if (selectedEvent) {
//       setAssignedUsers(prev => ({
//         ...prev,
//         [selectedEvent.id]: [...(prev[selectedEvent.id] || []), ...selectedUsers]
//       }));
//       handleClose();
//     }
//   };

//   const handleRemoveUser = (eventId: number, userId: number) => {
//     setAssignedUsers(prev => ({
//       ...prev,
//       [eventId]: prev[eventId].filter(id => id !== userId)
//     }));
//   };

//   return (
//     <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
//     <Typography variant="h4" gutterBottom>
//       Event User Assignment
//     </Typography>
//     <List>
//       {events.map((event) => (
//         <Paper key={event.id} elevation={3} sx={{ mb: 2, p: 2 }}>
//           <ListItem
//             secondaryAction={
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={() => handleEventClick(event)}
//               >
//                 Manage Access
//               </Button>
//             }
//           >
//             <ListItemText
//               primary={event.name}
//               secondary={
//                 <React.Fragment>
//                   <Typography component="span" variant="body2" color="text.primary">
//                     Assigned Users:
//                   </Typography>
//                   <Box sx={{ mt: 1 }}>
//                     {assignedUsers[event.id]?.map(userId => {
//                       const user = users.find(u => u.id === userId);
//                       return user ? (
//                         <Chip
//                           key={user.id}
//                           label={user.name}
//                           onDelete={() => handleRemoveUser(event.id, user.id)}
//                           sx={{ mr: 1, mb: 1 }}
//                         />
//                       ) : null;
//                     })}
//                   </Box>
//                 </React.Fragment>
//               }
//             />
//           </ListItem>
//         </Paper>
//       ))}
//     </List>

//       <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Assign Users to {selectedEvent?.name}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel id="user-select-label">Select Users</InputLabel>
//             <Select
//               labelId="user-select-label"
//               multiple
//               value={selectedUsers}
//               onChange={handleUserSelect}
//               renderValue={(selected) => (
//                 <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                   {selected.map((value) => (
//                     <Chip key={value} label={users.find(u => u.id === value)?.name} />
//                   ))}
//                 </Box>
//               )}
//             >
//               {users
//                 .filter(user => !assignedUsers[selectedEvent?.id || 0]?.includes(user.id))
//                 .map((user) => (
//                   <MenuItem key={user.id} value={user.id}>
//                     {user.name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleAssignUsers} variant="contained" color="primary">
//             Assign Users
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default EventUserAssignment;