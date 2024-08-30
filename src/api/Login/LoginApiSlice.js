import { instance } from "../../utils/Axios/Instance";

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
