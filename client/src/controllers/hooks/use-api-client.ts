import axios, { AxiosRequestConfig } from "axios";
import { useFirebaseToken } from "../contexts/firebase-app-context";

export const useAPIClient = () => {
  const config: AxiosRequestConfig = {};
  config.baseURL = import.meta.env.VITE_BACKEND_URL;
  config.withCredentials = true;

  const token = useFirebaseToken();

  if (token !== null) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return axios.create(config);
};
