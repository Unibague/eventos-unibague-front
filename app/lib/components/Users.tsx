// import React, { useState } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   CircularProgress
// } from '@mui/material';
// import { Edit } from '@mui/icons-material';
// import { User, Role } from '@/app/lib/types'; // Adjust the import path to your types
// import { HttpClient } from '@/app/lib/Http/HttpClient'; // Adjust the import path

// interface UserManagementProps {
//   users: User[];
//   roles: Role[];
// }

// const UserManagement: React.FC<UserManagementProps> = ({ users, roles }) => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [selectedRoles, setSelectedRoles] = useState<Role[] | null>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleOpenDialog = (user: User) => {
//     setSelectedUser(user);
//     setSelectedRoles(user.roles);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUser(null);
//     setSelectedRoles([]);
//   };

//   const handleRoleChange = (role: Role) => {
//     setSelectedRoles((prevRoles) => {
//       if (prevRoles.find((r) => r.id === role.id)) {
//         return prevRoles.filter((r) => r.id !== role.id);
//       } else {
//         return [...prevRoles, role];
//       }
//     });
//   };

//   const handleSubmit = async () => {
//     if (!selectedUser) return;

//     setIsLoading(true);
//     try {
//       const http = HttpClient.getInstance();
//       await http.put(`/api/users/${selectedUser.id}/roles`, {
//         roles: selectedRoles.map((role) => role.id),
//       });
//       setIsLoading(false);
//       handleCloseDialog();
//     } catch (error) {
//       console.error('Failed to update roles:', error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="user management table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Roles</TableCell>
//             <TableCell align="right">Manage</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {users.map((user) => (
//             <TableRow key={user.id}>
//               <TableCell component="th" scope="row">
//                 {user.name}
//               </TableCell>
//               <TableCell>{user.email}</TableCell>
//               <TableCell>jjk</TableCell>
//               <TableCell align="right">
//                 <Tooltip title="Manage Roles">
//                   <IconButton onClick={() => handleOpenDialog(user)}>
//                     <Edit />
//                   </IconButton>
//                 </Tooltip>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {/* Dialog for editing roles */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Manage Roles for {selectedUser?.name}</DialogTitle>
//         <DialogContent>
//           {roles.map((role) => (
//             <FormControlLabel
//               key={role.id}
//               control={
//                 <Checkbox
//                   checked={selectedRoles.some((r) => r.id === role.id)}
//                   onChange={() => handleRoleChange(role)}
//                 />
//               }
//               label={role.name}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary" disabled={isLoading}>
//             {isLoading ? <CircularProgress size={24} /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </TableContainer>
//   );
// };

// export default UserManagement;
