// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import categoryReducer from './features/categorySlice';
// Import other reducers

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer
  // Add other reducers
});
