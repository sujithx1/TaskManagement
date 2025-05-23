import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_ADMIN_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})


api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('admin-token'); // or sessionStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
  
  // Response Interceptor (e.g., global error handling)
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        // Handle 401, 403, etc.
        if (error.response.status === 401) {
          // Optionally log out user or redirect
          console.warn("Unauthorized - maybe redirect to login?");
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default api;
  
