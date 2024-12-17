import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../../api/User/UserApiSlice";

export const useGetClientsName = (key = "clientsName") => {
  const { data, error, isPending } = useQuery({
    queryKey: [key],
    queryFn: getUsers,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return {
    data,
    error,
    isPending,
  };
};
