import { createAxiosInstance } from "../../utils/Axios/Instance";

const instance = createAxiosInstance();

export const getClients = async (page, search, date) => {
  try {
    const response = await instance.get(
      `/clients?page=${page}&name=${search}&start_date=${date}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClientName = async () => {
  try {
    const response = await instance.get(`/clients/name`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await instance.get(`/client/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editClient = async (id, data) => {
  try {
    const response = await instance.put(`/client/${id}`, {
      name: data.fullname,
      email: data.email,
      username: data.username,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
