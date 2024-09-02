import { instance } from "../../utils/Axios/Instance";

export const getProjects = async () => {
  try {
    const response = await instance.get("/projects");
    return response.data;
  } catch (error) {
    throw error;
  }
};
