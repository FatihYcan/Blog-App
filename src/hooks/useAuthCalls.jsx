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
import { useEffect } from "react";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth)
  const { axiosWithToken, axiosPublic } = useAxios();

  // useEffect(() => {
  //   userObserver();
  // }, []);

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

  const signUpProvider = () => {
    dispatch(fetchStart());
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const token = user.accessToken;

        dispatch(
          loginSuccess({
            user: {
              username: user.displayName,
              id: user.uid,
              email: user.email,
              image: user.photoURL,
            },
            token: token,
          })
        );

        // navigate(location.state?.from || path);
        navigate("/");
        toastSuccessNotify("Login işlemi başarılı olmuştur.");
      })
      .catch((error) => {
        dispatch(fetchFail());
        toastErrorNotify("Login işlemi başarısız olmuştur.");
      });
  };

  // const userObserver = () => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log(user);
  //       // const { email, displayName, photoURL } = user;
  //       // setCurrentUser({ email, displayName, photoURL });
  //     } else {
  //       // setCurrentUser(false);
  //     }
  //   });
  // };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: { Authorization: `Token ${token}` },
      // })
      signOut(auth);
      await axiosWithToken("/auth/logout/");
      toastSuccessNotify("Çıkış işlemi başarılı olmuştur.");
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarısız olmuştur.");
    }
  };

  return { register, login, signUpProvider, logout };
};

export default useAuthCalls;
