import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const client: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${AsyncStorage.getItem("access_token")}`,
  },
});
