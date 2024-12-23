import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to fetch projects with pagination and search functionality.
 * The query is enabled only if the current pathname matches the specified `enabledPath`.
 *
 * @param {string} key - The query key used for cache management in React Query.
 * @param {string} enabledPath - The path where the query is enabled, used to determine if the query should run.
 * @param {number} page - The current page for pagination.
 * @param {string} search - The search term to filter projects.
 *
 * @returns {Object} An object containing:
 * - `data`: The fetched projects based on pagination and search.
 * - `error`: The error object if the query fails.
 * - `isPending`: A boolean indicating if the query is loading.
 */
export const useGetProjects = (key, enabledPath, page, search) => {
  const location = useLocation();
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: () => getProjects(page, search),
    enabled: location.pathname === enabledPath,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, error, isPending };
};
