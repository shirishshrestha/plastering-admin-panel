import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../utils/Query/Query";
import { notifyError, notifySuccess } from "../../../../components";
import { deleteJob } from "../../../../api/Jobs/JobApiSlice";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to handle the deletion of a job.
 *
 * @param {string} key - The query key used to invalidate related queries after the mutation.
 * @param {Function} handleDeleteToggle - A function to toggle the delete confirmation modal or state.
 * @param {Array} JobData - Array of job data, used to check if pagination needs to be adjusted after deletion.
 * @param {number} currentPage - The current page number, used to adjust pagination if necessary.
 * @returns {Object} An object containing the mutate function and the pending state.
 */
export const useDeleteJob = (key, handleDeleteToggle, JobData, currentPage) => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * React Query's useMutation hook to delete a job.
   *
   * @type {Object}
   * @property {Function} mutate - Function to trigger the mutation (deleteJob).
   * @property {boolean} isPending - The mutation's pending state.
   */
  const { mutate, isPending } = useMutation({
    mutationFn: (job_id) => deleteJob(job_id),
    onSuccess: (response) => {
      notifySuccess("Job deleted successfully");

      // Adjust pagination if the last job on a page is deleted and the current page is greater than 1
      if (JobData.length === 1 && currentPage > 1) {
        const params = new URLSearchParams(searchParams);
        params.set("page", currentPage - 1);
        setSearchParams(params);
      }

      queryClient.invalidateQueries(key);
      handleDeleteToggle();
    },
    onError: () => {
      notifyError("Failed to delete job! Please try again");
    },
  });

  return { mutate, isPending };
};
