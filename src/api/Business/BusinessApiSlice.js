import { instance } from "../../utils/Axios/Instance";

export const getEstimators = async () => {
  try {
    const response = await instance.get(`/estimator`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
