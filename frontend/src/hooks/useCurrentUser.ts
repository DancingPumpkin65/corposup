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

// Global cache to prevent multiple requests
let userCache: User | null = null;
let userPromise: Promise<User | null> | null = null;

const fetchUserFromAPI = async (): Promise<User | null> => {
  if (!authService.isAuthenticated()) {
    return null;
  }

  if (userCache) {
    return userCache;
  }

  if (userPromise) {
    return userPromise;
  }

  userPromise = (async () => {
    try {
      const response = await apiClient.get('/profile');
      const freshUser = response.data;

      // Update localStorage with fresh data
      localStorage.setItem('user', JSON.stringify(freshUser));
      userCache = freshUser;
      return freshUser;
    } finally {
      userPromise = null;
    }
  })();

  return userPromise;
};

// Function to clear cache (useful for logout or user updates)
export const clearUserCache = () => {
  userCache = null;
  userPromise = null;
};

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(userCache || authService.getUser());
  const [loading, setLoading] = useState(!userCache && authService.isAuthenticated());

  const fetchUser = async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (userCache) {
      setUser(userCache);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const fetchedUser = await fetchUserFromAPI();
      setUser(fetchedUser);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authService.isAuthenticated()) {
      fetchUser();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  return { user, loading, refetch: fetchUser };
};
