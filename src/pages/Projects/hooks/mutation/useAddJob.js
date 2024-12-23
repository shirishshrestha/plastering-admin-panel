import { useMutation } from "@tanstack/react-query";
import { addJob } from "../../../../api/Jobs/JobApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useNavigate } from "react-router-dom";
import { getRoleFromLocalStorage } from "../../../../utils/Storage/StorageUtils";
import { useCallback } from "react";

/**
 * Custom hook to add a new job to the system.
 *
 * @param {string} key - The query key for invalidating related queries after the mutation.
 * @param {string} project_id - The ID of the project to which the job is being added.
 * @param {Function} reset - A function to reset the form after a successful job addition.
 * @returns {Object} An object containing the mutate function, the pending state, and success state.
 */
export const useAddJob = (key, project_id, reset) => {
  const role = getRoleFromLocalStorage();
  const navigate = useNavigate();

  /**
   * Function to determine the correct navigation path based on the user's role.
   * Redirects to the appropriate job book page depending on the role (admin or client).
   *
   * @returns {void}
   */
  const navigationPath = useCallback(() => {
    navigate(
      role === "admin"
        ? `/projectbooks/jobBook/${project_id}`
        : `/clientProjects/jobBook/${project_id}`,
      { replace: true }
    );
  }, [navigate, role, project_id]);

  /**
   * React Query's useMutation hook for performing the job addition.
   *
   * @type {Object}
   * @property {Function} mutate - Function to trigger the mutation (addJob).
   * @property {boolean} isPending - The mutation's pending state.
   * @property {boolean} isSuccess - The mutation's success state.
   */
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data) => addJob(project_id, data),

    /**
     * onSuccess callback after the job is successfully added.
     * Invalidates the related queries and triggers a success notification.
     *
     * @returns {void}
     */
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Job added successfully");
      reset();
      setTimeout(() => {
        navigationPath();
      }, 2000);
    },
    onError: (error) =>
      notifyError(
        error.response.data.error || "Error adding job! Please try again"
      ),
  });
  return { mutate, isPending, isSuccess };
};
