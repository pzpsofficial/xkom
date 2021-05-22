import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  alertAction: null,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { message, description, type, closable, alertAction } =
        action.payload;

      state.message = message;
      state.description = description;
      state.type = type;
      state.closable = closable;
      state.alertAction = alertAction;
    },
    removeAlert: (state) => {
      state.message = '';
      state.description = '';
      state.type = '';
      state.alertAction = undefined;
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
