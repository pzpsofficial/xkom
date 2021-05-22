import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seats: [],
  userSeats: [],
};

export const seatsDataSlice = createSlice({
  name: 'seats',
  initialState,
  reducers: {
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    setUserSeat: (state, action) => {
      const seatIndex = state.userSeats.findIndex(
        (seat) => seat.id === action.payload.id
      );

      if (seatIndex === -1) {
        state.userSeats.push(action.payload);
      } else {
        state.userSeats.splice(seatIndex, 1);
      }
    },
    clearUserSeats: (state) => {
      state.userSeats = [];
    },
  },
});

export const { setSeats, setUserSeat, clearUserSeats } = seatsDataSlice.actions;

export default seatsDataSlice.reducer;
