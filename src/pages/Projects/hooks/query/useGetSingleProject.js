import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../../../api/Projects/ProjectsApiSlice";

/**
 * Custom hook to fetch a single project by its ID.
 * It uses React Query to fetch the project data and manage the cache for efficient data fetching.
 *
 * @param {string} key - The query key used for cache management in React Query.
 * @param {string|number} project_id - The ID of the project to fetch.
 *
 * @returns {Object} An object containing:
 * - `data`: The fetched project data.
 * - `error`: Any error that occurred during the query.
 * - `isPending`: A boolean indicating if the query is still loading.
 */
export const useGetSingleProject = (key = "singleProject", project_id) => {
  const { data, error, isPending } = useQuery({
    queryKey: [key, project_id],
    queryFn: () => getProjectById(project_id),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};
