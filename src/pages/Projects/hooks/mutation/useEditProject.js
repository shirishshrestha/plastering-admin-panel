import { useMutation } from "@tanstack/react-query";
import { editProject } from "../../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../../../utils/Query/Query";
import { getRoleFromLocalStorage } from "../../../../utils/Storage/StorageUtils";
import { useCallback } from "react";

/**
 * Custom hook to handle the editing of a project.
 *
 * @param {string} [key="userTotalProjects"] - The query key used to invalidate related queries after the mutation.
 * @param {string} id - The ID of the project to be edited.
 * @param {string} user_id - The ID of the user, used for navigation after successful project edit.
 * @returns {Object} An object containing the mutate function, the pending state, the success state, and any errors.
 */
export const useEditProject = (key = "userTotalProjects", id, user_id) => {
  const role = getRoleFromLocalStorage();
  const navigate = useNavigate();

  const navigateAfterSuccess = useCallback(() => {
    navigate(
      role === "admin"
        ? `/projectbooks/projects/${user_id}`
        : `/clientProjects`,
      { replace: true }
    );
  }, [navigate, role, user_id]);

  /**
   * React Query's useMutation hook to handle the project editing.
   *
   * @type {Object}
   * @property {Function} mutate - Function to trigger the mutation (editProject).
   * @property {boolean} isPending - The mutation's pending state.
   * @property {boolean} isSuccess - The mutation's success state.
   * @property {Object|null} error - The error object if the mutation fails.
   */
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: (data) => editProject(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Project edited successfully");
      setTimeout(() => {
        navigateAfterSuccess();
      }, 2000);
    },
    onError: () => {
      notifyError("Error editing project! Please try again");
    },
  });

  return {
    mutate,
    isPending,
    error,
    isSuccess,
  };
};
