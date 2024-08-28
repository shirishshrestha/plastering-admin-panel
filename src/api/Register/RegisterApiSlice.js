import { instance } from "../../utils/Axios/Instance";

export const signupClient = async (data) => {
  try {
    const response = await instance.post("/register", {
      name: data.fullname,
      email: data.email,
      password: data.password,
      username: data.username,
      password_confirmation: data.retype_password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
