import { instance } from "../../utils/Axios/Instance";
import { getIdFromLocalStorage } from "../../utils/Storage/StorageUtils";

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

export const addProject = async (project) => {
  try {
    const response = await instance.post("/projects", project);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadFile = async (name, setDownload) => {
  try {
    const response = await instance.get(`/projects/download/${name}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(response.data);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", name);

    document.body.appendChild(link);
    link.click();

    setDownload(null);
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};
