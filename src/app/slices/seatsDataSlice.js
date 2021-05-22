import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seats: [],
};

export const seatsDataSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
  },
});

export const { setSeats } = seatsDataSlice.actions;

export default seatsDataSlice.reducer;
