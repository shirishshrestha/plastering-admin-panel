import { instance } from "../../utils/Axios/Instance";

export const getUsers = async () => {
  try {
    const response = await instance.get("/register");
    return response;
  } catch (error) {
    throw error;
  }
};
