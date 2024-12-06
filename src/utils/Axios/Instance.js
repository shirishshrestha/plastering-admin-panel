import axios from "axios";

const ApiUrl = import.meta.env.VITE_APP_PEI_API;

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: ApiUrl,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("Token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};
