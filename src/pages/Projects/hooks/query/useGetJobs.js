import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserJobs } from "../../../../api/Jobs/JobApiSlice";

/**
 * Custom hook to fetch jobs associated with a specific project.
 *
 * @param {string} [key="userJobs"] - The query key used for cache management in React Query.
 * @param {string} project_id - The ID of the project to fetch jobs for.
 * @param {number} currentPage - The current page number for pagination.
 * @param {string} searchItem - The search term for filtering jobs by name or other attributes.
 * @param {string} start_date - The start date to filter jobs by.
 * @param {string} status - The status of the jobs (e.g., "active", "completed").
 *
 * @returns {Object} An object containing:
 * - `data`: The data returned from the API (list of jobs).
 * - `error`: The error object if the query fails.
 * - `isPending`: A boolean indicating if the query is loading.
 */
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
