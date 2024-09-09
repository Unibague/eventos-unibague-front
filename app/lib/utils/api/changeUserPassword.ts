import { User, Role } from '../../types';
import { HttpClient } from '@/app/lib/Http/HttpClient'; // Adjust the import path


// Function to update user roles
export const changeUserPassword = async (userId: string, password: string): Promise<void> => {
  try {
    const http = HttpClient.getInstance();
    await http.post(`/api/users/${userId}/password`, {password});
  } catch (error) {
    console.error('Error updating user password:', error);
    throw error; // Rethrow to handle in component
  }
};
