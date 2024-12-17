import { useQuery } from "@tanstack/react-query";
import { getProjectsStatus } from "../../../../api/Projects/ProjectsApiSlice";
import { getIdFromLocalStorage } from "../../../../utils/Storage/StorageUtils";

export const useGetUserProjectStatus = (key = "userProjectStatus") => {
  const user_id = getIdFromLocalStorage();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => getProjectsStatus(user_id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};
