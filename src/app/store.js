import { configureStore } from '@reduxjs/toolkit';

import userInputReducer from './slices/userInputSlice';
import seatsDataReducer from './slices/seatsDataSlice';

export const store = configureStore({
  reducer: {
    userInput: userInputReducer,
    seats: seatsDataReducer,
  },
});
