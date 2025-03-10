import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized, clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })
      );
    }
    return response.data;
  },

  register: async (name, email, password, role) => {
    return api.post('/auth/register', { name, email, password, role });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
};

// Crop services
export const cropService = {
  getAllCrops: async () => {
    return api.get('/crops/public/all');
  },

  getCropById: async (id) => {
    return api.get(`/crops/public/${id}`);
  },

  createCrop: async (cropData) => {
    return api.post('/crops', cropData);
  },

  getMyListings: async () => {
    return api.get('/crops/my-listings');
  },

  cancelCrop: async (id) => {
    return api.put(`/crops/${id}/cancel`);
  },
};

// Bid services
export const bidService = {
  placeBid: async (cropId, amount) => {
    return api.post('/bids', { cropId, amount });
  },

  getBidsByCrop: async (cropId) => {
    return api.get(`/bids/crop/${cropId}`);
  },

  getMyBids: async () => {
    return api.get('/bids/my-bids');
  },

  acceptBid: async (bidId) => {
    return api.put(`/bids/${bidId}/accept`);
  },
};

// User services
export const userService = {
  getProfile: async () => {
    return api.get('/users/profile');
  },

  updateProfile: async (userData) => {
    return api.put('/users/profile', userData);
  },
};

export default api;
