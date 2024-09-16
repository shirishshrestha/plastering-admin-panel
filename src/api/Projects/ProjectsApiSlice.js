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

export const acceptProject = async (data, project_id) => {
  try {
    const response = await instance.post(`projects/${project_id}`, data, {
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
  const formData = new FormData();

  formData.append("estimation_note", data.estimation_note || "");

  project_part.forEach((part, index) => {
    formData.append(`project_parts[${index}][part_name]`, part.part_name);
    part.files.forEach((file, fileIndex) => {
      formData.append(`project_parts[${index}][files][${fileIndex}]`, file);
    });
  });

  try {
    const response = await instance.post(
      `/projects/${id}/estimations`,
      formData
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const editEstimation = async (
  data,
  newEstimationFiles,
  deletedPart,
  project_id,
  project_length
) => {
  const formData = new FormData();

  formData.append("estimation_note", data.estimation_note || "");

  newEstimationFiles.forEach((part, index) => {
    formData.append(
      `project_parts[${index + project_length}][part_name]`,
      part.part_name
    );
    part.files.forEach((file, fileIndex) => {
      formData.append(
        `project_parts[${index + project_length}][files][${fileIndex}]`,
        file
      );
    });
  });

  formData.append("_method", "PUT");

  formData.append("part_ids", deletedPart || []);

  try {
    const response = await instance.post(
      `/project/${project_id}/update`,
      formData
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getEstimationNotes = async (id) => {
  try {
    const response = await instance.get(`/projects/${id}/estimations`);
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
