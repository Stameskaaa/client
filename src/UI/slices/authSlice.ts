import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const fetchProfileData = createAsyncThunk('auth/fetchProfileData', async () => {
//   // const response = await axios.get('http://localhost:5000/getuserInfo', {
//   //   params: {
//   //     name,
//   //   },
//   // });
//   // console.log(response);
//   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   const data = await response.json();

//   return data;
// });
// const fetchUserById = createAsyncThunk('users/fetchByIdStatus', async () => {
//   // const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//   // const data = await response.json();
//   // return data;
//   return 3;
// });

interface initialStateInterface {
  authState: boolean;
  profileData: profileData;
  currentPage: StringAndNumber | '';
}

type StringAndNumber = number | string;

type StringAndObject = object | string;

interface profileData {
  name: string;
  age: string;
  work: string;
  friends: StringAndObject[] | 'loading';
  img: string;
  lastName: string;
  _id: StringAndNumber;
  posts: StringAndObject[] | '';
  birthDate: string;
  gender: string;
  location: string;
  martialStatus: string;
  photos: StringAndObject[] | 'loading';
}

const initialState: initialStateInterface = {
  authState: false,
  profileData: {
    name: 'loading',
    age: 'loading',
    work: 'loading',
    friends: 'loading',
    img: 'loading',
    lastName: 'loading',
    _id: 'loading',
    posts: '',
    birthDate: 'loading',
    gender: 'loading',
    location: 'loading',
    martialStatus: 'loading',
    photos: 'loading',
  },
  currentPage: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStateCheck(state, actions) {
      if (actions.payload.flag) {
        state.authState = actions.payload.flag;
        state.profileData = actions.payload.infoPerson;
      }
    },
    loadingProfileData(state, actions) {
      state.profileData.name = actions.payload;
    },
    updateProfileData(state, actions) {
      if (actions.payload) {
        state.profileData = actions.payload;
      }
    },
    updateCurrentPage(state, actions: { payload: string }) {
      state.currentPage = actions.payload;
    },
    resetStore() {
      return initialState;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUserById.pending, () => {}),
  //     builder.addCase(fetchUserById.fulfilled, () => {}),
  //     builder.addCase(fetchUserById.rejected, () => {});
  // },
});

export const { authStateCheck, updateProfileData, updateCurrentPage, resetStore } =
  authSlice.actions;
export default authSlice.reducer;
