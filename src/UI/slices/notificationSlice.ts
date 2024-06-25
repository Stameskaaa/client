import { createSlice } from '@reduxjs/toolkit';

interface Notification {
  text: string;
  name?: string;
}

interface NotificationState {
  currentSlice: Notification | null;
}

const initialState: NotificationState = {
  currentSlice: null,
};

const notificationSlice = createSlice({
  name: 'notificate',
  initialState,
  reducers: {
    changeCurrentNotifcation(state, action: { payload: Notification }) {
      if (action.payload) {
        state.currentSlice = action.payload;
      }
    },
  },
});

export const { changeCurrentNotifcation } = notificationSlice.actions;
export default notificationSlice.reducer;
