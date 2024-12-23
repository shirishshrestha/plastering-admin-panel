import { useMutation } from "@tanstack/react-query";
import { editJob } from "../../../../api/Jobs/JobApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useCallback } from "react";

/**
 * Custom hook to handle the editing of a job.
 *
 * @param {string} [key="userJob"] - The query key used to invalidate related queries after the mutation.
 * @param {string} project_id - The ID of the project to which the job belongs, used for navigation after successful edit.
 * @param {Function} setNewFiles - A function to reset the new files state after the job is successfully updated.
 * @returns {Object} An object containing the mutate function, the pending state, and the success state.
 */
export const useEditJob = (key = "userJob", project_id, setNewFiles) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const navigateAfterSuccess = useCallback(() => {
    navigate(`/projectbooks/jobBook/${project_id}`, { replace: true });
  }, [navigate, project_id]);

  /**
   * React Query's useMutation hook to handle the job editing.
   *
   * @type {Object}
   * @property {Function} mutate - Function to trigger the mutation (editJob).
   * @property {boolean} isPending - The mutation's pending state.
   * @property {boolean} isSuccess - The mutation's success state.
   */
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (jobData) => editJob(id, jobData),
    onSuccess: () => {
      setNewFiles([]);
      notifySuccess("Job updated successfully");
      queryClient.invalidateQueries(key);
      setTimeout(() => {
        navigateAfterSuccess();
      }, 2000);
    },
    onError: (error) => {
      notifyError(
        error.response.data.details || "Error updating job! Please try again"
      );
    },
  });

  return { mutate, isPending, isSuccess };
};
