import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserJobs } from "../../../../api/Jobs/JobApiSlice";

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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};
