import { instance } from "../../utils/Axios/Instance";

export const getProjects = async () => {
  try {
    const response = await instance.get("/projects");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await instance.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await instance.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
