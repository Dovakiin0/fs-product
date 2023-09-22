import { useEffect, useState } from "react";
import { ILoginUser, IRegisterUser } from "../types/IUser";
import { client, protectedClient } from "../config/client";
import { useAppDispatch, useAppSelector } from "./useReducer";
import { loginSuccess, logout } from "../store/reducers/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const { current, authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkUser();
  }, []);

  // Check if current user exists and is valid
  const checkUser = () => {
    protectedClient
      .get("/api/auth/@me")
      .then((response) => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data));
        }
      })
      .catch((err) => console.log(err));
  };

  const login = (credentials: ILoginUser) => {
    setLoading(true);
    client
      .post("/api/auth/", credentials)
      .then(async (response) => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.user));
          await AsyncStorage.setItem("access_token", response.data.token);
        }
      })
      .catch((err) => alert(err.response.data.message));
  };

  const register = (userData: IRegisterUser) => {
    setLoading(true);
    client
      .post("/api/auth/register", {
        email: userData.email,
        username: userData.username,
        password: userData.password,
      })
      .then(async (response) => {
        if (response.status === 201) {
          dispatch(loginSuccess(response.data.user));
          await AsyncStorage.setItem("access_token", response.data.token);
        }
      })
      .catch((err) => alert(err.response.data.message))
      .finally(() => setLoading(false));
  };

  const logoutUser = () => {
    setLoading(true);
    protectedClient
      .post("/api/auth/logout", {})
      .then(async (response) => {
        if (response.status === 200) {
          dispatch(logout);
          await AsyncStorage.removeItem("access_token");
        }
      })
      .catch((err) => alert(err.response.data.message))
      .finally(() => setLoading(false));
  };

  return {
    login,
    loading,
    errors,
    register,
    logoutUser,
    current,
    authenticated,
  };
}
