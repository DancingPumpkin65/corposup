import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

class DatabaseService {
  async testConnection(): Promise<{ message: string; status: string; timestamp: string }> {
    const response = await axios.get(`${API_BASE_URL}/test`);
    return response.data;
  }

  async ping(): Promise<{ message: string }> {
    const response = await axios.get(`${API_BASE_URL}/ping`);
    return response.data;
  }
}

export default new DatabaseService();