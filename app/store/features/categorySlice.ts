import { apiClient } from '@/app/lib/axios';
import endpoints from '@/app/lib/endpoints';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Category {
  id: number;
  name: string;
}

export interface CategroyState {
  categories: Category[] | [];
  isLoading: boolean;
}

const initialState: CategroyState = {
  categories: [],
  isLoading: false
};

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(endpoints.category.index);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.data;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export default categorySlice.reducer;
