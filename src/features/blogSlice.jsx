import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",

  initialState: {
    categories: [],
    blogs: [],
    pagination: {},
    comments: [],
    likes: [],
    details: {},
    users: [],
    loading: false,
    error: false,
  },

  reducers: {
    fetchStart: (state) => {
      state.error = false;
      state.loading = true;
    },

    getBlogSuccess: (state, { payload }) => {
      state.blogs = payload.apiData;
      state.pagination = payload.pagination;
      state.loading = false;
      state.error = false;
    },

    getCategorySuccess: (state, action) => {
      state[action.payload.url] = action.payload.apiData;
      state.loading = false;
      state.error = false;
    },

    getLikeSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.likes = payload.countOfLikes;
    },

    getDetailSuccess: (state, { payload }) => {
      state.details = payload.apiData;
      state.loading = false;
      state.error = false;
    },

    getUserSuccess: (state, { payload }) => {
      state.users = payload.apiData;
      state.loading = false;
      state.error = false;
    },

    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  getBlogSuccess,
  getCategorySuccess,
  getLikeSuccess,
  getDetailSuccess,
  getUserSuccess,
  fetchFail,
} = blogSlice.actions;

export default blogSlice.reducer;
