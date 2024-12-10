import { useLocation } from "react-router-dom";
import { getUserJobs } from "../../../../api/Projects/ProjectsApiSlice";
import { useQuery } from "@tanstack/react-query";

export const useGetJobs = (
  key = "userJobs",
  project_id,
  currentPage,
  searchItem,
  start_date,
  status
) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key, project_id, currentPage, searchItem, start_date, status],
    queryFn: () =>
      getUserJobs(project_id, currentPage, searchItem, start_date, status),
    staleTime: 50 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  return { data, error, isPending };
};
