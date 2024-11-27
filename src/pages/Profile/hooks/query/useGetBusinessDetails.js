import { useQuery } from "@tanstack/react-query";
import { getIdFromLocalStorage } from "../../../../utils/Storage/StorageUtils";
import { getSingleEstimator } from "../../../../api/Business/BusinessApiSlice";

export const useGetBusinessDetails = () => {
  const id = getIdFromLocalStorage();
  const GetBusinessDetails = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getSingleEstimator(id),
    staleTime: 6000,
  });

  return GetBusinessDetails;
};
