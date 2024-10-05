// import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
// import {  useSelector } from "react-redux"
import useAxios from "./useAxios";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth)
  const { axiosWithToken, axiosPublic } = useAxios();

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      const { data } = await axiosPublic.post("/users/", userInfo);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register işlemi başarılı olmuştur.");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Register işlemi başarısız olmuştur.");
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
      const { data } = await axiosPublic.post("/auth/login/", userInfo);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı olmuştur.");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login işlemi başarısız olmuştur.");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: { Authorization: `Token ${token}` },
      // })
      await axiosWithToken("/auth/logout/");
      toastSuccessNotify("Çıkış işlemi başarılı olmuştur.");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarısız olmuştur.");
    }
  };

  return { register, login, logout };
};

export default useAuthCalls;
