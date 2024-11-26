/* eslint-disable no-console */
// slices/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiClient, ApiResponse } from '@/app/lib/axios';
import endpoints from '@/app/lib/endpoints';
import Cookies from 'js-cookie';
import { RootState } from '../store';
import { TransformedData } from '@/app/[locale]/signup/page';
import axios from 'axios';
import { toast } from 'sonner';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ProfessorData {
  id: number;
  name: string;
  spoken_languages: string[];
  phone: string;
  city: string;
  description: string;
  email: string;
  email_verified_at: string | null;
  profile_photo_path: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: ProfessorData | null;
  token: string | null;
  isLoading: boolean;
  error: null | string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null
};

export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        return null;
      }

      // Validate token and get user data
      const response = await apiClient.get(endpoints.authProf.me);
      return {
        user: response,
        token
      };
    } catch (error) {
      localStorage.removeItem('token');
      return rejectWithValue('Session expired');
    }
  }
);

// Thunks
export const loginProfessor = createAsyncThunk<
  { user: ProfessorData; token: string },
  LoginCredentials,
  { rejectValue: string }
>('auth/loginProfessor', async (credentials, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<{
      user: ProfessorData;
      token: string;
    }>(endpoints.authProf.login, credentials);
    // Set token in cookie instead of localStorage
    Cookies.set('token', response.data.token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Login failed');
  }
});

interface RegisterResponse {
  token: string;
}

export const registerProf = createAsyncThunk<
  ApiResponse<RegisterResponse>,
  TransformedData,
  { rejectValue: string }
>('auth/registerProf', async (data: TransformedData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post<RegisterResponse>(
      endpoints.authProf.register,
      data
    );
    Cookies.set('token', response.data.token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.errors || 'Register failed');
    }
    return rejectWithValue('Register failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await apiClient.post(endpoints.authProf.logout, {});
    Cookies.remove('token');
    return null;
  } catch (error: any) {
    Cookies.remove('token');
    throw error.response?.data?.message || 'Logout failed';
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginProfessor.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginProfessor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginProfessor.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      })
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Logout failed';
      })
      // Register cases
      .addCase(registerProf.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerProf.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerProf.rejected, (state, action) => {
        state.isLoading = false;
        state.error = 'error_professor_register';
      })
      // Initialize cases
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.user || null;
        state.token = action.payload?.token || null;
        state.error = null;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectAuthError = (state: RootState) => state.auth.error;
