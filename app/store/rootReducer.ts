// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
// Import other reducers

export const rootReducer = combineReducers({
  auth: authReducer
  // Add other reducers
});
