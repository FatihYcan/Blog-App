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
import useAxios from "./useAxios";
import { auth } from "../auth/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { axiosWithToken, axiosPublic } = useAxios();

  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      // Mevcut kullanıcıları localStorage'dan al
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Yeni kullanıcıyı diziye ekle
      users.push({ email: userInfo.email, password: userInfo.password });

      // Diziyi tekrar localStorage'a kaydet
      localStorage.setItem("users", JSON.stringify(users));

      const { data } = await axiosPublic.post("/users/", userInfo);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register işlemi başarılı olmuştur.");
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      navigate("/");
      return true;
    } catch (error) {
      dispatch(fetchFail());

      if (error.response.data.message.includes("dup key: { username")) {
        toastErrorNotify(
          "Bu username daha önce alınmış. Lütfen başka bir username seçin."
        );
      } else if (error.response.data.message.includes("dup key: { email")) {
        toastErrorNotify(
          "Bu email daha önce alınmış. Lütfen başka bir email girin."
        );
      }
      return false;
    }
  };

  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic.post("/auth/login/", userInfo);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı olmuştur.");
      await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password);
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Yanlış email veya password yazılmış.");
    }
  };

  const signUpProvider = async () => {
    dispatch(fetchStart());
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      // Rastgele şifre oluştur
      const randomPassword = generateRandomPassword(12);

      localStorage.setItem(`${result.user.email}`, randomPassword);

      const Register = {
        username: result.user.displayName,
        firstName: result._tokenResponse.firstName,
        lastName: result._tokenResponse.lastName,
        email: result.user.email,
        image: result.user.photoURL,
        blogImg: result.user.photoURL,
        password: randomPassword,
      };

      const { data } = await axiosPublic.post("/users/", Register);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register işlemi başarılı olmuştur.");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        "Bu username ve emaile sahip google hesabı daha önce kaydedilmiş. Lütfen başka bir username ve emaile sahip google hesabı ile giriş yapın."
      );
    }
  };

  const signInProvider = async () => {
    dispatch(fetchStart());
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      const password = localStorage.getItem(`${result.user.email}`);

      const Login = {
        email: result.user.email,
        password: password,
      };

      const { data } = await axiosPublic.post("/auth/login/", Login);
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi başarılı olmuştur.");
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(
        "Bu username ve emaile sahip google hesabı daha önce kaydedilmemiş. Lütfen kayıt olun."
      );
    }
  };

  const generateRandomPassword = (length = 12) => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!/[@$!%*?&";

    const allCharacters = lowercase + uppercase + numbers + symbols;

    // En az bir karakter türünden rastgele bir karakter ekle
    const passwordArray = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      symbols[Math.floor(Math.random() * symbols.length)],
    ];

    // Geri kalan karakterleri rastgele seç
    for (let i = 4; i < length; i++) {
      passwordArray.push(
        allCharacters[Math.floor(Math.random() * allCharacters.length)]
      );
    }

    // Şifreyi karıştır
    return passwordArray.sort(() => Math.random() - 0.5).join("");
  };

  const forgotPassword = async () => {
    dispatch(fetchStart());
    try {
      toastSuccessNotify(
        "Unutmuş olduğunuz parola password kısmına yazılmıştır."
      );
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      await axiosWithToken("/auth/logout/");
      toastSuccessNotify("Çıkış işlemi başarılı olmuştur.");
      signOut(auth);
      dispatch(logoutSuccess());
      navigate("/");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return {
    register,
    login,
    signUpProvider,
    signInProvider,
    forgotPassword,
    logout,
  };
};

export default useAuthCalls;
