import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { User, Role } from '@/app/lib/types'; // Adjust the import path to your types
import { HttpClient } from '@/app/lib/Http/HttpClient'; // Adjust the import path
import { updateUserRoles } from '../utils/api/updateUserRoles';
import Notification from './Notification';

interface UserManagementProps {
  users: User[];
  roles: Role[];
  onUserRolesUpdated: () => void
}

const UsersTable: React.FC<UserManagementProps> = ({ users, roles, onUserRolesUpdated }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  console.log(users);

  const handleOpenDialog = (user: User) => {
    setSelectedUser(user);
    setSelectedRoles(user.roles);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setSelectedRoles([]);
  };

  const handleRoleChange = (role: Role) => {
    setSelectedRoles((prevRoles) => {
      if (prevRoles.find((r) => r.id === role.id)) {
        return prevRoles.filter((r) => r.id !== role.id);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedUser) {
      try {
        await updateUserRoles(selectedUser.id, selectedRoles);
        setNotificationOpen(true);
              // Re-fetch users to reflect the updated roles
        onUserRolesUpdated();
        handleCloseDialog();
      } catch (error) {
        setError('Failed to update roles. Please try again.');
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper} >
        <Table aria-label="user management table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align="right">Manage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.map((role) => role.name).join(', ')}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Manage Roles">
                    <IconButton onClick={() => handleOpenDialog(user)}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog for editing roles */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Manage Roles for the user "{selectedUser?.name}"</DialogTitle>
          <DialogContent>
            {roles.map((role,id) => (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      checked={selectedRoles.some((r) => r.id === role.id)}
                      onChange={() => handleRoleChange(role)}
                    />
                  }
                  label={role.name}
                />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </DialogActions>
        </Dialog>

      </TableContainer>

      <Notification
        message="User roles updated successfully"
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        snackbarColor="secondary.main"
      />

    </>
  );
};

export default UsersTable;
