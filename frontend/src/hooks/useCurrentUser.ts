import { useState, useEffect } from 'react';
import { apiClient, authService } from '../services';

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

  const fetchUser = async () => {
    if (!authService.isAuthenticated()) return;

    setLoading(true);
    try {
      const response = await apiClient.get('/profile');
      const freshUser = response.data;
      localStorage.setItem('user', JSON.stringify(freshUser));
      setUser(freshUser);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) fetchUser();
  }, []);

  return { user, loading, refetch: fetchUser };
};
