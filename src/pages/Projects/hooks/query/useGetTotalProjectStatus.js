import { useQuery } from "@tanstack/react-query";
import { getTotalProjectsStatus } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to fetch the total status of all projects.
 * It uses React Query to manage the data fetching and cache for efficient querying.
 *
 * @param {string} key - The query key used for cache management in React Query.
 * @param {string} enabledPath - The path that will enable the query to run (only triggers on this path).
 *
 * @returns {Object} An object containing:
 * - `data`: The fetched total project status data.
 * - `error`: Any error that occurred during the query.
 * - `isPending`: A boolean indicating if the query is still loading.
 */
export const useGetTotalProjectStatus = (
  key = "totalProjectStatus",
  enabledPath = "/projectbooks"
) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: getTotalProjectsStatus,
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
