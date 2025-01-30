// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import categoryReducer from './features/categorySlice';
import classReducer from './features/classSlice';
// Import other reducers

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  course: classReducer
  // Add other reducers
});
