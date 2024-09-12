import { instance } from "../../utils/Axios/Instance";

export const getProjects = async (pageNumber) => {
  try {
    const response = await instance.get(`/projects?page=${pageNumber}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProjects = async (id, pageNumber) => {
  try {
    const response = await instance.get(
      `/users/${id}/projects?page=${pageNumber}`
    );
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
    const response = await instance.post("/projects", project, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProject = async (data, id) => {
  console.log("here", data);
  try {
    const response = await instance.post(`projects/${id}`, data, {
      headers: {
        Accept: "application/json",
      },
    });
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

export const postEstimatesNote = async (data, project_part, id) => {
  try {
    const [estimationResponse, partsResponse] = await Promise.all([
      instance.post(`/projects/${id}/estimation`, {
        estimation_notes: data.estimation_note,
      }),
      project_part.length > 0 && instance.post(`/projects/${id}/parts`, {}),
    ]);

    return { estimationResponse, partsResponse };
  } catch (error) {
    throw error;
  }
};

export const getEstimationNotes = async (id) => {
  try {
    const response = await Promise.all(
      instance.get(`/project-parts/${id}/estimator-notes`),
      instance.get(`/projects/${id}/parts`)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProjectsStatus = async (user_id) => {
  try {
    const response = await instance.get(
      `/users/${user_id}/projects-status-counts`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTotalProjectsStatus = async () => {
  try {
    const response = await instance.get(`/project-count`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
