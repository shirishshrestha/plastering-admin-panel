import { createAxiosInstance } from "../../utils/Axios/Instance";

const instance = createAxiosInstance();

export const getUserJobs = async (
  project_id,
  currentPage,
  searchItem,
  start_date,
  status
) => {
  try {
    const response = await instance.get(
      `/project-book-user/${project_id}/jobs?page=${currentPage}&job_name=${searchItem}&start_date=${start_date}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getJobById = async (job_id) => {
  try {
    const response = await instance.get(`/jobs/${job_id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addJob = async (project_id, data) => {
  try {
    const response = await instance.post(`/projects/${project_id}/jobs`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editJob = async (job_id, data) => {
  try {
    const response = await instance.post(`/jobs/${job_id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (job_id) => {
  try {
    const response = await instance.delete(`/jobs/${job_id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
