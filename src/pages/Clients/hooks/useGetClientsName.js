import { useQuery } from "@tanstack/react-query";
import { getClientName } from "../../../api/User/UserApiSlice";

export const useGetClientsName = (key = "clientsName") => {
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: getClientName,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};
