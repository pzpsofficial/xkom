import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seatsNumber: 0,
  areSeatsClose: false,
};

export const userInputSlice = createSlice({
  name: 'input',
  initialState,

  reducers: {
    setSeatsNumber: (state, action) => {
      return {
        ...state,
        seatsNumber: action.payload,
      };
    },
    setAreSeatsClose: (state, action) => {
      return {
        ...state,
        areSeatsClose: action.payload,
      };
    },
  },
});

export const { setSeatsNumber, setAreSeatsClose } = userInputSlice.actions;

export default userInputSlice.reducer;
