import { configureStore } from '@reduxjs/toolkit';

import userInputReducer from './slices/userInputSlice';
import seatsDataReducer from './slices/seatsDataSlice';
import alertReducer from './slices/alertSlice';

export const store = configureStore({
  reducer: {
    userInput: userInputReducer,
    seats: seatsDataReducer,
    alert: alertReducer,
  },
});
