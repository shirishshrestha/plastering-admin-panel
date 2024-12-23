/**
 * @file Projects.jsx
 * @description Component for displaying and managing a list of projects with features like filtering, pagination, and actions.
 */
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { EditIcon, GoBack, PlusIcon } from "../../assets/icons/SvgIcons";
import {
  CancelProjectConfirmation,
  CustomToastContainer,
  EmptyData,
  FilterDrawer,
  Loader,
  Pagination,
  SearchInput,
} from "../../components";
import { Tooltip } from "flowbite-react";
import { deleteProject } from "../../api/Projects/ProjectsApiSlice";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { notifySuccess } from "../../components/Toast/Toast";
import { queryClient } from "../../utils/Query/Query";
import useAuth from "../../hooks/useAuth";
import { useGetUserTotalProjects } from "./hooks/query/useGetUserTotalProjects";
import { useToggle } from "../../hooks/useToggle";

/**
 * Table header labels for the projects list.
 * @constant {string[]}
 */
const tableHead = [
  "P. Id",
  "Project Name",
  "Project Location",
  "Project Type",
  "Additional Info",
  "Start Date",
  "Status",
  "Total Jobs",
  "Actions",
];

/**
 * Projects Component
 * @description Displays a list of projects with features like search, filter, pagination, and actions to view or modify projects.
 * @returns {JSX.Element} The rendered Projects component.
 */
const Projects = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  // State variables
  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();
  const [cancelConfirmation, handleCancelToggle] = useToggle();

  const { openDrawer } = useAuth();

  /**
   * Current page number derived from search parameters.
   * Defaults to 1 if no "page" parameter is found.
   */
  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  /**
   * Search term for filtering projects, derived from search parameters.
   */
  const searchItem = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  /**
   * Project type filter derived from search parameters.
   */
  const projectType = useMemo(
    () => searchParams.get("project_type") || "",
    [searchParams]
  );

  /**
   * Status filter derived from search parameters.
   */
  const status = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  /**
   * Date filter derived from search parameters.
   */
  const date = useMemo(() => searchParams.get("date") || "", [searchParams]);

  /**
   * Fetch total projects data using a custom hook.
   * Includes support for pagination and filtering.
   * @returns {object} Projects data and loading status.
   */
  const { data: TotalProjects, isPending: TotalProjectsPending } =
    useGetUserTotalProjects(
      "userTotalProjects",
      "/projectbooks/projects",
      id,
      currentPage,
      searchItem,
      projectType,
      date,
      status
    );

  /**
   * Pagination properties for managing navigation between pages.
   */
  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: TotalProjects?.projects?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, TotalProjects]
  );

  /**
   * Mutation to delete a project by ID.
   * Provides success and error handling for the deletion process.
   */
  const { mutate: DeleteProject, isPending: deletePending } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      notifySuccess("Project deleted successfully");
      handleCancelToggle();
    },
    onError: () => {
      notifyError("Failed to delete project, please try again");
    },
  });

  /**
   * Updates the page number in the search parameters.
   * Ensures the page navigation updates the URL query string.
   * @param {number} newPageNumber - New page number to set.
   */
  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

  /**
   * Handles the proceed button click in the cancel confirmation modal.
   * Triggers the delete mutation for the selected project.
   */
  const handleProceedClick = () => {
    // DeleteProject();
  };

  return (
    <>
      <section className="mt-[.5rem] pb-[1rem]">
        {/* Render cancel confirmation modal if triggered */}
        {cancelConfirmation && (
          <CancelProjectConfirmation
            projectName={projectName}
            handleCancelToggle={handleCancelToggle}
            handleProceedClick={handleProceedClick}
            cancelLoading={deletePending}
          />
        )}

        {/* Show loader while data is being fetched */}
        {TotalProjectsPending && <Loader />}

        {/* Filter drawer for applying search and filter criteria */}
        <FilterDrawer setSearchParams={setSearchParams} dateName={"start date"}>
          <FilterDrawer.Status
            options={[
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
          <FilterDrawer.ProjectType />
          <FilterDrawer.RegisteredDate />
        </FilterDrawer>

        <div>
          <div
            className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer font-[500] "
            onClick={() => {
              navigate("/projectbooks");
            }}
          >
            <GoBack />
            Go to Project Books
          </div>
          <div className="flex items-center py-[0.5rem] justify-between">
            <h2 className="font-bold text-[1.4rem] text-start">
              List of Projects
            </h2>
            <div className="flex gap-[1rem]">
              <Link to={`/projectbooks/addProject/${TotalProjects?.user_id}`}>
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Project{" "}
                  <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between mb-[1rem] items-center">
            <div className="flex gap-[1rem]">
              <button className="px-4 py-2 text-light bg-secondary font-[600]  rounded-lg shadow-inner ">
                All Projects
              </button>
              <button
                className="px-4 py-2  bg-white/80 font-[600]  rounded-lg shadow-inner"
                onClick={() => navigate(`/projectbooks/activeProjects/${id}`)}
              >
                Active Projects
              </button>
              <button
                className="px-4 py-2 bg-white/80 font-[600]  rounded-lg shadow-inner"
                onClick={() => navigate(`/projectbooks/archivedProjects/${id}`)}
              >
                Archived Projects
              </button>
            </div>
            <div className="flex gap-[1rem] items-end">
              <SearchInput
                setSearchParams={setSearchParams}
                placeholder={"Search by project name"}
              />
              <button
                className="bg-highlight/10 rounded-lg text-highlight text-[14px] py-[0.3rem] px-[0.8rem] border border-highlight focus:outline-none h-fit"
                onClick={openDrawer}
              >
                Filter
              </button>
            </div>
          </div>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden capitalize">
            <thead className="bg-primary text-white">
              <tr>
                {tableHead.map((item, index) => (
                  <th
                    key={index}
                    className="py-[1rem] font-semibold text-start first:pl-[0.5rem]"
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TotalProjects?.projects?.data?.length > 0 ? (
                TotalProjects?.projects?.data?.map((item) => (
                  <tr key={item.id} className="last:border-none">
                    <td className="py-[1rem] pl-[0.5rem]">{item.id}</td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {item.name ? (
                        item.name.length > 20 ? (
                          <Tooltip
                            className="max-w-[300px]"
                            content={item.name}
                          >
                            {`${item.name.slice(0, 20)}...`}
                          </Tooltip>
                        ) : (
                          item.name
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">
                      {item.address ? (
                        item.address.length > 20 ? (
                          <Tooltip
                            className="max-w-[300px]"
                            content={item.address}
                          >
                            {`${item.address.slice(0, 20)}...`}
                          </Tooltip>
                        ) : (
                          item.address
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">{item.project_type}</td>
                    <td className="py-[1rem]">
                      {item.additional_requirements ? (
                        item.additional_requirements.length > 20 ? (
                          <Tooltip
                            className="max-w-[300px]"
                            content={item.additional_requirements}
                          >
                            {`${item.additional_requirements.slice(0, 20)}...`}
                          </Tooltip>
                        ) : (
                          item.additional_requirements
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">
                      {item.created_at.split("T")[0]}
                    </td>

                    <td className="py-[1rem]">{item.status}</td>
                    <td className="pl-4">{item.jobs.length}</td>

                    <td>
                      <div className="flex gap-[0.7rem]">
                        <button
                          className="p-[5px] rounded-md bg-editBackground"
                          onClick={() =>
                            navigate(`/projectbooks/editProject/${item.id}`)
                          }
                        >
                          <EditIcon color="#8c62ff" />
                        </button>
                        <button
                          className="bg-accent flex gap-[0.5rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg"
                          onClick={() =>
                            navigate(`/projectbooks/jobBook/${item.id}`)
                          }
                        >
                          View Jobs
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <EmptyData />
              )}
            </tbody>
          </table>
        </div>
        {TotalProjects?.projects?.last_page > 1 && (
          <div className="my-[1rem] flex items-center justify-end">
            <Pagination {...paginationProps} />
          </div>
        )}
        <CustomToastContainer />
      </section>
    </>
  );
};

export default Projects;
