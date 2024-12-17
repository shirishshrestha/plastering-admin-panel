import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../../api/User/UserApiSlice";
import { getIdFromLocalStorage } from "../../../../utils/Storage/StorageUtils";

export const useGetUserDetails = () => {
  const id = getIdFromLocalStorage();
  const GetUserDetails = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserById(id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return GetUserDetails;
};
