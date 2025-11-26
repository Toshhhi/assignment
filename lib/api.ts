import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    // Token is sent via HTTP-only cookie, so we don't need to add it manually
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

// Auth API
export const authAPI = {
  register: async (data: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  
  login: async (data: { email: string; password: string }) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Profile API
export const profileAPI = {
  get: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  
  update: async (data: { name?: string }) => {
    const response = await api.put('/profile', data);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async (filters?: {
    search?: string;
    status?: string;
    priority?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);
    
    const response = await api.get(`/tasks?${params.toString()}`);
    return response.data;
  },
  
  getOne: async (id: string) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },
  
  create: async (data: {
    title: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
  }) => {
    const response = await api.post('/tasks', data);
    return response.data;
  },
  
  update: async (id: string, data: {
    title?: string;
    description?: string;
    status?: 'todo' | 'in-progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
  }) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
  },
  
  delete: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;

