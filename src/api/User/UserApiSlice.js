import { instance } from "../../utils/Axios/Instance";
import { getTokenFromLocalStorage } from "../../utils/Storage/StorageUtils";

export const getClients = async (page, search) => {
  try {
    const response = await instance.get(
      `/clients?page=${page}&search=${search}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
