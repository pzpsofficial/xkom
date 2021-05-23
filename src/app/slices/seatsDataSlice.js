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
      return {
        ...state,
        seats: action.payload,
      };
    },
    insertNewlyReservedSeats: (state, action) => {
      const oldSeats = [...state.seats];

      action.payload.forEach((userSeat) => {
        const index = oldSeats.indexOf(userSeat);
        oldSeats[index] = { ...oldSeats[index], reserved: true };
      });

      return {
        ...state,
        seats: [...oldSeats],
        userSeats: action.payload,
      };
    },
    clearUserSeats: (state) => {
      return {
        ...state,
        userSeats: [],
      };
    },
  },
});

export const { setSeats, clearUserSeats, insertNewlyReservedSeats } =
  seatsDataSlice.actions;

export default seatsDataSlice.reducer;
