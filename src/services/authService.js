import axios from 'axios';
import { API_BASE_URL } from '../config';

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-email/${token}`);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  resendVerification: async (email) => {
    const response = await axios.post(`${API_BASE_URL}/auth/resend-verification`, { email });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;
