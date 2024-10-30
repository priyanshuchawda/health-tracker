import axios from 'axios';
import { toast } from 'react-toastify';

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    if (response) {
      // Handle different error status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear local storage and redirect to login
          localStorage.clear();
          window.location.href = '/login';
          break;
        case 403:
          toast.error('You do not have permission to perform this action');
          break;
        case 404:
          toast.error('Resource not found');
          break;
        case 422:
          // Validation errors
          const validationErrors = response.data.errors;
          if (validationErrors) {
            Object.values(validationErrors).forEach(error => {
              toast.error(error);
            });
          }
          break;
        case 500:
          toast.error('An unexpected error occurred. Please try again later.');
          break;
        default:
          toast.error(response.data.message || 'Something went wrong');
      }
    } else {
      // Network error
      toast.error('Unable to connect to the server. Please check your internet connection.');
    }

    return Promise.reject(error);
  }
);

export default axios;
