/* eslint-disable no-console */
//create slice with creation of the course

import { apiClient } from '@/app/lib/axios';
import endpoints from '@/app/lib/endpoints';
import { Course } from '@/components/dashboard/classes/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface CourseState {
  courses: Course[] | [];
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  isLoading: false,
  success: false,
  error: null
};

export const createClass = createAsyncThunk(
  'course/createCourse',
  async (data: Course, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(endpoints.course.create, data);
      return response;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error);
    }
  }
);

export const classSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    /* builder.addCase(fetchCourses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courses = action.payload.data;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.isLoading = false;
    }); */
    builder.addCase(createClass.pending, (state) => {
      state.isLoading = true;
      state.success = false;
      state.error = null;
    });
    builder.addCase(createClass.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(createClass.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = (action.payload as string) || 'An error occurred';
    });
  }
});

export const { resetSuccess } = classSlice.actions;

export default classSlice.reducer;

// selectors
export const selectCourses = (state: { course: { courses: Course[] } }) =>
  state.course.courses;
export const selectIsLoading = (state: { course: { isLoading: boolean } }) =>
  state.course.isLoading;
export const selectSuccess = (state: { course: { success: boolean } }) =>
  state.course.success;
export const selectError = (state: { course: { error: string | null } }) =>
  state.course.error;
