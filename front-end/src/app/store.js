import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/Employee/employeeSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
