import { useQuery } from "@tanstack/react-query";
import { getTotalProjectsStatus } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

export const useGetTotalProjectStatus = (key = "totalProjectStatus") => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: getTotalProjectsStatus,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};
