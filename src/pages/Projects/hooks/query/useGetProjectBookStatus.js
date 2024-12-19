import { useQuery } from "@tanstack/react-query";
import { getProjectBookStatus } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

export const useGetProjectBookStatus = (
  key = "totalProjectBookStatus",
  enabledPath = "/projectbooks"
) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: getProjectBookStatus,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: location.pathname === enabledPath,
  });

  return {
    data,
    error,
    isPending,
  };
};
