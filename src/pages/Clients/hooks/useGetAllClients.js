import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../../api/User/UserApiSlice";

export const useGetAllClients = (
  key = "clients",
  page = 1,
  search = "",
  date
) => {
  const { data, isPending, error } = useQuery({
    queryKey: [key, page, search, date],
    queryFn: () => getClients(page, search, date),
    enabled: true,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return { data, isPending, error };
};
