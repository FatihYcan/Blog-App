import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  username: "",
  userId: "",
  token: "",
  email: "",
  image: "",
  loading: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload?.user?.username;
      state.userId = payload?.user?._id;
      state.token = payload?.token;
      state.username = payload?.user?.username;
      state.email = payload?.user?.email;
      state.image = payload?.user?.image;
    },

    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.user = payload?.data?.username;
      state.userId = payload?.data?._id;
      state.token = payload?.token;
      state.username = payload?.data?.username;
      state.email = payload?.data?.email;
      state.image = payload?.data?.image;
    },

    logoutSuccess: (state) => {
      state.user = "";
      state.loading = false;
      state.token = "";
      state.username = "";
      state.userId = "";
      state.email = "";
      state.image = "";
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions;

export default authSlice.reducer;
