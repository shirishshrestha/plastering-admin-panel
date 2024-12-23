import { useQuery } from "@tanstack/react-query";
import { getProjectBooks } from "../../../../api/Projects/ProjectsApiSlice";
import { useLocation } from "react-router-dom";

/**
 * Custom hook to fetch project books based on various filters such as date, status, search, and pagination.
 *
 * @param {string} [key="projectBooks"] - The query key used for cache management in React Query.
 * @param {string} enabledPath - The path where the query is enabled, used to determine if the query should run.
 * @param {string} [date=""] - The date filter to fetch project books starting from a specific date.
 * @param {string} [status=""] - The status filter (e.g., "active", "archived").
 * @param {number} [page=1] - The page number for pagination.
 * @param {string} [search=""] - The search term to filter project books by name or other attributes.
 *
 * @returns {Object} An object containing:
 * - `data`: The data returned from the API (list of project books).
 * - `error`: The error object if the query fails.
 * - `isPending`: A boolean indicating if the query is loading.
 */
export const useGetProjectBooks = (
  key = "projectBooks",
  enabledPath = "/projectbooks",
  date = "",
  status = "",
  page = 1,
  search = ""
) => {
  const location = useLocation();

  const { data, error, isPending } = useQuery({
    queryKey: [key, date, status, page, search],
    queryFn: () => getProjectBooks(date, status, page, search),
    enabled: location.pathname === enabledPath,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};
