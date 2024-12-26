import { useMutation } from "@tanstack/react-query";
import { rejectCancellationRequest } from "../../../../api/Jobs/JobApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";

export const useRejectCancellationRequest = (handleAcceptToggle) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id) => rejectCancellationRequest(id),
    onSuccess: () => {
      handleAcceptToggle();
      queryClient.invalidateQueries("job-cancellation-requests");
      notifySuccess("Cancellation request accepted successfully");
    },
    onError: () => {
      notifyError("Failed to accept cancellation request! Please try again.");
    },
  });

  return { mutate, isPending };
};
