import { useMutation } from "@tanstack/react-query";
import { addProject } from "../../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../../components";
import { queryClient } from "../../../../utils/Query/Query";
import { useNavigate } from "react-router-dom";
import { getRoleFromLocalStorage } from "../../../../utils/Storage/StorageUtils";

/**
 * Custom hook to add a new project to the system.
 *
 * @param {Function} reset - Function to reset the form fields after a successful project addition.
 * @param {string} key - The query key used to invalidate related queries after the mutation.
 * @param {string} user_id - The ID of the user, used to navigate to the appropriate project page after adding the project.
 * @returns {Object} An object containing the mutate function, the pending state, and success state.
 */
export const useAddProject = (reset, key, user_id) => {
  const role = getRoleFromLocalStorage();
  const navigate = useNavigate();

  /**
   * React Query's useMutation hook to add a project.
   *
   * @type {Object}
   * @property {Function} mutate - Function to trigger the mutation (addProject).
   * @property {boolean} isPending - The mutation's pending state.
   * @property {boolean} isSuccess - The mutation's success state.
   */
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data) => addProject(data),

    /**
     * onSuccess callback after the project is successfully added.
     * Invalidates the related queries, triggers a success notification, and navigates to the appropriate project page.
     *
     * @returns {void}
     */
    onSuccess: () => {
      queryClient.invalidateQueries(key);
      notifySuccess("Project added successfully");
      reset({
        name: "",
        address: "",
        project_type: "",
        additional_requirements: "",
      });
      setTimeout(() => {
        role === "admin"
          ? navigate(`/projectbooks/projects/${user_id}`, { replace: true })
          : navigate(`/clientProjects`, { replace: true });
      }, 2000);
    },
    onError: (error) => {
      notifyError("Error adding project! Please try again");
    },
  });

  return { mutate, isPending, isSuccess };
};
