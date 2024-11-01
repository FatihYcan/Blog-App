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
    // dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(url);
      const apiData = data.data.filter(
        (blog) => blog._id !== "67111b9f3ec8b710e80612f0"
      );
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
      toastSuccessNotify("Blog kaydı eklenmiştir.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog kaydı eklenemiştir.");
    }
  };

  const putBlogs = async (post_id, data) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/blogs/${post_id}`, data);
      toastSuccessNotify("Blog kaydı güncellenmiştir..");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog kaydı güncellenememiştir.");
    }
  };

  const deleteBlogs = async (post_id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/blogs/${post_id}/`);
      toastSuccessNotify("Blog silinmiştir.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Blog silinemedi");
    }
  };

  const getCategories = async (url) => {
    const { data } = await axiosWithToken(`/${url}/`);
    const apiData = data.data;
    dispatch(getCategorySuccess({ apiData, url }));
  };

  const postLikes = async (url, post_id) => {
    try {
      const { data } = await axiosWithToken.post(
        `/${url}/${post_id}/postLike/`,
        null
      );
      dispatch(getLikeSuccess(data));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getDetails = async (post) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/blogs/${post.id}/`);
      const apiData = data.data;
      dispatch(getDetailSuccess({ apiData }));
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const getUsers = async (user) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`/blogs?author=${user.id}`);
      const apiData = data.data;
      const pagination = data.details;
      dispatch(getUserSuccess({ apiData, pagination }));
    } catch (error) {
      dispatch(fetchFail());
    }
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

  const putComments = async (post_id, data) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`/comments/${post_id}`, data);
      toastSuccessNotify("Yorum güncellenmiştir..");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Yorum güncellenememiştir.");
    }
  };

  const deleteComments = async (post_id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`/comments/${post_id}/`);
      toastSuccessNotify("Yorum silinmiştir.");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Yorum silinememiştir");
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
    putComments,
    deleteComments,
  };
};

export default useBlogCalls;
