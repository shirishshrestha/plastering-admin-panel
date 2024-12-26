import { useMutation } from "@tanstack/react-query";
import { requestRevision } from "../../../../api/Jobs/JobApiSlice";
import { notifyError, notifySuccess } from "../../../../components";

export const useRequestCancellation = (job_id, handleRevision, reset) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (cancelReason) => requestRevision(cancelReason, job_id),
    onSuccess: () => {
      handleRevision();
      reset();
      notifySuccess("Request for revision sent successfully");
    },
    onError: (error) => {
      notifyError(
        error.response.data.message || "Failed to send request for revision"
      );
    },
  });

  return { mutate, isPending };
};
