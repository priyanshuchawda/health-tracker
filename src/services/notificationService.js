import axios from 'axios';
import { API_BASE_URL } from '../config';

const notificationService = {
  getNotifications: async () => {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await axios.patch(`${API_BASE_URL}/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await axios.patch(`${API_BASE_URL}/notifications/mark-all-read`);
    return response.data;
  },

  deleteNotification: async (notificationId) => {
    const response = await axios.delete(`${API_BASE_URL}/notifications/${notificationId}`);
    return response.data;
  }
};

export default notificationService;
