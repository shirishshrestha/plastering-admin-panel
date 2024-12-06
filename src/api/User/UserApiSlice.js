import { createAxiosInstance } from "../../utils/Axios/Instance";

const instance = createAxiosInstance();

export const getClients = async (page, search) => {
  try {
    const response = await instance.get(
      `/clients?page=${page}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await instance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editClient = async (id, data) => {
  try {
    const response = await instance.put(`/users/${id}`, {
      name: data.fullname,
      email: data.email,
      username: data.username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
