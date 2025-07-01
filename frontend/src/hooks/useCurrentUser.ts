import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import authService from '../services/authService';

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  photo_profile?: string;
  phone?: string;
  city?: string;
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentUser = async () => {
    if (!authService.isAuthenticated()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get('/profile');
      const freshUser = response.data;
      
      // Update localStorage with fresh data
      localStorage.setItem('user', JSON.stringify(freshUser));
      setUser(freshUser);
    } catch (err) {
      console.error('Failed to fetch current user:', err);
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch fresh user data on mount if authenticated
    if (authService.isAuthenticated() && user) {
      fetchCurrentUser();
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    refetch: fetchCurrentUser
  };
};
