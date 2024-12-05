import axios from "axios";
const ApiUrl = import.meta.env.VITE_APP_PEI_API;

export const instance = axios.create({
  baseURL: ApiUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("Token")}`,
  },
});
