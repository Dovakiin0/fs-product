import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const client: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export const protectedClient: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

protectedClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting access token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
