import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  message: '',
  description: '',
  type: '',
  showIcon: true,
  closable: false,
  style: {
    position: 'fixed',
    top: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    maxWidth: '500px',
    zIndex: '1000',
  },
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { message, description, type, closable } = action.payload;

      return {
        ...state,
        message: message,
        description: description,
        type: type,
        closable: closable,
      };
    },
    removeAlert: (state) => {
      return {
        ...state,
        message: '',
        description: '',
        type: '',
        closable: false,
      };
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
