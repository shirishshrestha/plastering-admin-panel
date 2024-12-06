import { createAxiosInstance } from "../../utils/Axios/Instance";


const instance = createAxiosInstance();

export const login = async (data) => {
  try {
    const response = await instance.post("/login", {
      login: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const businessLogin = async (data) => {
  try {
    const response = await instance.post("/estimator/login", {
      username: data.username,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
