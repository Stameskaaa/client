import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSlice: null,
};

const notificationSlice = createSlice({
  name: 'notificate',
  initialState,
  reducers: {
    changeCurrentNotifcation(state, action) {
      state.currentSlice = action.payload;
    },
  },
});

export const { changeCurrentNotifcation } = notificationSlice.actions;
export default notificationSlice.reducer;
