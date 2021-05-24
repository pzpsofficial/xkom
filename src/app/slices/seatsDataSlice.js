import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
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
      return {
        ...state,
        seats: [
          ...state.seats.map((row) => {
            return [
              ...row.map((seat) => {
                if (!seat) return seat;

                if (
                  action.payload.find((userSeat) => userSeat.id === seat.id)
                ) {
                  return { ...seat, reserved: true };
                }
                return seat;
              }),
            ];
          }),
        ],
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
