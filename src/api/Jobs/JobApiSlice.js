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

export const addJob = async (data, project_id) => {
  try {
    const response = await instance.post(`/projects/${project_id}/jobs`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
