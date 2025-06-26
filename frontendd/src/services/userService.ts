import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  photo_profile?: string;
  created_at?: string;
}

const userService = {
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  getFirstThreeUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?limit=3`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      // Return empty array instead of throwing to handle gracefully
      return [];
    }
  }
};

export default userService;
