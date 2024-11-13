// lib/axios.ts
import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/features/authSlice';
import Cookies from 'js-cookie';

// Create axios instance with custom config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  timeout: 10000 // 10 seconds
});

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Typed API response interface
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Export typed API methods
export const apiClient = {
  get: <T>(url: string) =>
    api.get<ApiResponse<T>>(url).then((response) => response.data),

  post: <T>(url: string, data: any) =>
    api.post<ApiResponse<T>>(url, data).then((response) => response.data),

  put: <T>(url: string, data: any) =>
    api.put<ApiResponse<T>>(url, data).then((response) => response.data),

  delete: <T>(url: string) =>
    api.delete<ApiResponse<T>>(url).then((response) => response.data)
};

export default api;
