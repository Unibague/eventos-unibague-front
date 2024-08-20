import { User, Role } from '../../types';
import { HttpClient } from '@/app/lib/Http/HttpClient'; // Adjust the import path


// Function to update user roles
export const updateUserRoles = async (userId: string, roles: Role[]): Promise<void> => {
  try {
    const http = HttpClient.getInstance();
    await http.put(`/api/users/${userId}/roles`, {
    roles: roles.map(role => role.id),
    });
    
  } catch (error) {
    console.error('Error updating roles:', error);
    throw error; // Rethrow to handle in component
  }
};
