import { instance } from "../../utils/Axios/Instance";

export const getEstimators = async () => {
  try {
    const response = await instance.get(`/estimator`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleEstimator = async (id) => {
  try {
    const response = await instance.get(`/estimator/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEstimator = async (id) => {
  try {
    const response = await instance.delete(`/estimator/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
