import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  EditIcon,
  GoBack,
  PlusIcon,
  TrashIcon,
} from "../../../assets/icons/SvgIcons";
import { Tooltip } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { deleteProject } from "../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../components/Toast/Toast";
import { queryClient } from "../../../utils/Query/Query";
import {
  CancelProjectConfirmation,
  CustomToastContainer,
  DeleteConfirmation,
  EmptyData,
  FilterDrawer,
  Loader,
  Pagination,
  SearchInput,
} from "../../../components";
import useAuth from "../../../hooks/useAuth";
import { useGetActiveProjects } from "../hooks/query/useGetActiveProjects";
import { useToggle } from "../../../hooks/useToggle";

/**
 * Table headers for the active projects table.
 * @constant {string[]} tableHead
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
 * ActiveProjects component displays a list of active projects.
 * It allows users to search, filter, and manage projects including adding,
 * editing, and deleting them.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const ActiveProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cancelConfirmation, handleCancelToggle] = useToggle();

  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const { openDrawer } = useAuth();

  // Memoized values for current page, search term, project type, and date from url search params.
  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const projectType = useMemo(
    () => searchParams.get("project_type") || "",
    [searchParams]
  );

  const date = useMemo(() => searchParams.get("date") || "", [searchParams]);

  // Fetch active projects data
  const { data: ActiveProjectsData, isPending: ActiveProjectsPending } =
    useGetActiveProjects(
      "activeProjects",
      "/projectbooks/activeProjects",
      currentPage,
      search,
      projectType,
      date
    );

  /**
   * Configuration object for pagination controls
   */
  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: ActiveProjectsData?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, ActiveProjectsData]
  );

  const { mutate: DeleteProject, isPending: deletePending } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      handleCancelToggle();
      queryClient.invalidateQueries("projects");
      notifySuccess("Project deleted successfully");
      setDeleteConfirationShow(false);
    },
    onError: () => {
      notifyError("Failed to delete project, please try again");
    },
  });

  /**
   * Updates the current page number in the search parameters.
   * @param {number} newPageNumber - The new page number to set.
   */
  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

  const handleProceedClick = () => {
    // DeleteProject();
    console.log("Cancel Project");
  };

  return (
    <>
      <section className="mt-[.5rem] pb-[1rem]">
        {cancelConfirmation && (
          <CancelProjectConfirmation
            projectName={projectName}
            handleCancelToggle={handleCancelToggle}
            handleProceedClick={handleProceedClick}
            cancelLoading={deletePending}
            cancelInfo="This action will move the project to archived projects."
          />
        )}
        {ActiveProjectsPending && <Loader />}
        <FilterDrawer setSearchParams={setSearchParams} dateName={"start date"}>
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
              <Link
                to={`/projectbooks/addProject/${ActiveProjectsData?.user_id}`}
              >
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add Project <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex mb-[1rem] justify-between items-center">
            <div className="flex gap-[1rem]">
              <button
                className="px-4 py-2 bg-white/80 font-[600] rounded-lg shadow-inner "
                onClick={() => navigate(`/projectbooks/projects/${id}`)}
              >
                All Projects
              </button>
              <button className="px-4 py-2 text-light bg-secondary font-[600] rounded-lg shadow-inner">
                Active Projects
              </button>
              <button
                className="px-4 py-2 bg-white/80 font-[600] rounded-lg shadow-inner"
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
              {ActiveProjectsData?.active_projects?.data?.length > 0 ? (
                ActiveProjectsData?.active_projects?.data?.map((item) => (
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
                          className="bg-accent flex gap-[0.5rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                          onClick={() =>
                            navigate(`/projectbooks/jobBook/${item.id}`)
                          }
                        >
                          View Jobs
                        </button>

                        <button
                          className="py-[5px] px-[10px] rounded-md bg-delete/90 text-light text-[0.8rem] font-semibold"
                          onClick={() => {
                            handleCancelToggle();
                            setProjectName(item.name);
                            setProjectId(item.id);
                          }}
                        >
                          Cancel
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
        {ActiveProjectsData?.projects?.last_page > 1 && (
          <div className="my-[1rem] flex items-center justify-end">
            <Pagination {...paginationProps} />
          </div>
        )}
        <CustomToastContainer />
      </section>
    </>
  );
};
