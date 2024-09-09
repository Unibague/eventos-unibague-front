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
  CircularProgress,
  TextField,
} from '@mui/material';
import { Edit, Lock } from '@mui/icons-material';
import { User, Role } from '@/app/lib/types';
import { updateUserRoles } from '../utils/api/updateUserRoles';
import { changeUserPassword } from '../utils/api/changeUserPassword';
import Notification from './Notification';
import DialogPage from './DialogPage';

interface UserManagementProps {
  users: User[];
  roles: Role[];
  onUserRolesUpdated: () => void;
}

const UserRow = ({ user, roles, onRoleChange, onOpenDialog, onOpenPasswordDialog }: any) => {
  const handleRoleChange = (role: Role) => {
    onRoleChange(user, role);
  };

  const handleOpenPasswordDialog = () => {
    onOpenPasswordDialog(user);
  };

  return (
    <TableRow key={user.id}>
      <TableCell component="th" scope="row">
        {user.name}
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.roles.map((role: any) => role.name).join(', ')}</TableCell>
      <TableCell align="right">
        <Tooltip title="Manage Roles">
          <IconButton onClick={() => onOpenDialog(user)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Change password">
          <IconButton onClick={handleOpenPasswordDialog}>
            <Lock />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

const UsersTable: React.FC<UserManagementProps> = ({ users, roles, onUserRolesUpdated }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

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

  const handleRoleChange = (user: User, role: Role) => {
    setSelectedUser(user);
    setSelectedRoles((prevRoles) => {
      if (prevRoles.find((r) => r.id === role.id)) {
        return prevRoles.filter((r) => r.id !== role.id);
      } else {
        return [...prevRoles, role];
      }
    });
  };

  const handleOpenPasswordDialog = (user: User) => {
    setSelectedUser(user);
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError(null); // Reset error when closing dialog
  };

  const handleSubmit = async () => {
    if (selectedUser) {
      try {
        await updateUserRoles(selectedUser.id, selectedRoles);
        setNotificationOpen(true);
        onUserRolesUpdated();
        handleCloseDialog();
      } catch (error) {
        setError('Failed to update roles. Please try again.');
      }
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    if (value !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmitPassword = async () => {
    if (passwordError) {
      console.log('Passwords do not match');
      setError('Passwords do not match!');
      return;
    }
    if (selectedUser) {
      try {
        await changeUserPassword(selectedUser.id, newPassword);
        setNotificationOpen(true);
        handleClosePasswordDialog();
      } catch (error) {
        setError('Failed to update password. Please try again.');
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
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
              <UserRow
                key={user.id}
                user={user}
                roles={roles}
                onRoleChange={handleRoleChange}
                onOpenDialog={handleOpenDialog}
                onOpenPasswordDialog={handleOpenPasswordDialog}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Manage Roles for the user "{selectedUser?.name}"
        </DialogTitle>
        <DialogContent>
          {roles.map((role, id) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  checked={selectedRoles.some((r) => r.id === role.id)}
                  onChange={() => handleRoleChange(selectedUser!, role)}
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

      <DialogPage
        open={openPasswordDialog}
        handleClose={handleClosePasswordDialog}
        dialogTitle={`Change Password for ${selectedUser?.name}`}
        cancelAction={handleClosePasswordDialog}
        acceptAction={handleSubmitPassword}
        acceptActionLabel="Save"
      >
        <TextField
          label="New Password"
          required
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={handlePasswordChange}
          error={!!passwordError} // Set error state
          helperText={passwordError || ''} // Show error message
        />
        <TextField
          label="Confirm Password"
          required
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={!!passwordError} // Set error state
          helperText={passwordError || ''} // Show error message
        />
      </DialogPage>

      <Notification
        message="Operation successful"
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        snackbarColor="secondary.main"
      />
    </>
  );
};

export default UsersTable;
