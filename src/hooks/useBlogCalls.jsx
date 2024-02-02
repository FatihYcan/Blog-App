import {
  fetchStart,
  getBlogSuccess,
  getLikeSuccess,
  getCategorySuccess,
  getDetailSuccess,
  getUserSuccess,
  fetchFail,
} from "../features/blogSlice";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useDispatch } from "react-redux";

const useBlogCalls = () => {
  const { axiosWithToken, axiosPublic } = useAxios();
  const dispatch = useDispatch();

  const getBlogs = async (url) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(url);
      const apiData = data.data;
      const pagination = data.details;
      dispatch(getBlogSuccess({ apiData, pagination }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const postBlogs = async (postData) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post("/blogs/", postData);
      toastSuccessNotify("blog kayıdı eklenmiştir.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("blog kayıdı kaydi eklenemiştir.");
    }
  };

  const putBlogs = async (post_id, data) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/blogs/${post_id}`, data);
      toastSuccessNotify("blog kayıdı güncellenmiştir..");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("blog kaydi güncelenememiştir.");
    }
  };

  const deleteBlogs = async (post_id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/blogs/${post_id}/`);
      toastSuccessNotify("blog silinmiştir.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("blog silinemedi");
    }
  };

  const getCategories = async (url) => {
    const { data } = await axiosWithToken(`/${url}/`);
    const apiData = data.data;
    dispatch(getCategorySuccess({ apiData, url }));
  };

  const postLikes = async (url, post_id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/${post_id}/postLike/`, null);
      getBlogs(url);
      dispatch(getLikeSuccess());
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getDetails = async (post) => {
    const { data } = await axiosWithToken(`/blogs/${post.id}/`);
    const apiData = data.data;
    dispatch(getDetailSuccess({ apiData }));
  };

  const getUsers = async (user) => {
    const { data } = await axiosWithToken(`/blogs?author=${user.id}`);
    const apiData = data.data;
    const pagination = data.details;
    dispatch(getUserSuccess({ apiData, pagination }));
  };

  const postComments = async (url, data) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`/${url}/`, data);
      toastSuccessNotify("Yorum yapılmıştır.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login olmadığınız için yorum yapılamamıştır");
    }
  };

  return {
    getBlogs,
    postBlogs,
    putBlogs,
    deleteBlogs,
    getCategories,
    postLikes,
    getDetails,
    getUsers,
    postComments,
  };
};

export default useBlogCalls;
