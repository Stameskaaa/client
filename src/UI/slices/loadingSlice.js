import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingState: true,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingState(state, actions) {
      state.loadingState = actions.payload;
    },
  },
});

export const { setLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;
