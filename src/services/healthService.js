import axios from 'axios';
import { API_BASE_URL } from '../config';

const healthService = {
  createHealthLog: async (healthData) => {
    const response = await axios.post(`${API_BASE_URL}/health/logs`, healthData);
    return response.data;
  },

  getHealthLogs: async (params) => {
    const response = await axios.get(`${API_BASE_URL}/health/logs`, { params });
    return response.data;
  },

  updateHealthLog: async (id, healthData) => {
    const response = await axios.patch(`${API_BASE_URL}/health/logs/${id}`, healthData);
    return response.data;
  },

  deleteHealthLog: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/health/logs/${id}`);
    return response.data;
  },

  getHealthSummary: async (timeframe) => {
    const response = await axios.get(`${API_BASE_URL}/health/summary`, { params: { timeframe } });
    return response.data;
  }
};

export default healthService;
