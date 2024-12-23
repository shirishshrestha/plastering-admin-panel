import { useQuery } from "@tanstack/react-query";
import { getProjectBookStatus } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to fetch the project book status.
 * The query is enabled only if the current pathname matches the specified `enabledPath`.
 *
 * @param {string} [key="totalProjectBookStatus"] - The query key used for cache management in React Query.
 * @param {string} enabledPath - The path where the query is enabled, used to determine if the query should run.
 *
 * @returns {Object} An object containing:
 * - `data`: The status of the project book fetched from the API.
 * - `error`: The error object if the query fails.
 * - `isPending`: A boolean indicating if the query is loading.
 */
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
