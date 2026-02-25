import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
};

// Analytics endpoints
export const analyticsAPI = {
  getSales: (params?: any) => api.get('/analytics/sales', { params }),
  getSalesByCategory: (params?: any) => api.get('/analytics/sales-by-category', { params }),
  getMonthlySales: (params?: any) => api.get('/analytics/monthly-sales', { params }),
  getSalesByRegion: (params?: any) => api.get('/analytics/sales-by-region', { params }),
  getTopProducts: (params?: any) => api.get('/analytics/top-products', { params }),
  getSalesStatus: (params?: any) => api.get('/analytics/sales-status', { params }),
  getProductsStats: () => api.get('/analytics/products-stats'),
  getSummary: (params?: any) => api.get('/analytics/summary', { params }),
};

export default api;
