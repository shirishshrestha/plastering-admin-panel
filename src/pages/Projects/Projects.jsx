import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { EditIcon, PlusIcon } from "../../assets/icons/SvgIcons";
import {
  CancelProjectConfirmation,
  CustomToastContainer,
  DeleteConfirmation,
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

const tableHead = [
  "P. Id",
  "Project Name",
  "Project Location",
  "Project Type",
  "Additional Info",
  "Start Date",
  "Status",
  "Actions",
];

const Projects = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);
  const [cancelConfirmation, handleCancelToggle] = useToggle();

  const { openDrawer } = useAuth();

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const searchItem = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const projectType = useMemo(
    () => searchParams.get("project_type") || "",
    [searchParams]
  );

  const date = useMemo(() => searchParams.get("date") || "", [searchParams]);

  const { data: TotalProjects, isPending: TotalProjectsPending } =
    useGetUserTotalProjects(
      "userTotalProjects",
      "/projectbooks/projects",
      id,
      currentPage,
      searchItem,
      projectType,
      date
    );

  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: TotalProjects?.projects?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, TotalProjects]
  );

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

  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

  const handleProceedClick = () => {
    DeleteProject();
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
          />
        )}
        {TotalProjectsPending && <Loader />}
        <FilterDrawer setSearchParams={setSearchParams} dateName={"start date"}>
          <FilterDrawer.ProjectType />
          <FilterDrawer.RegisteredDate />
        </FilterDrawer>
        <div>
          <div className="flex items-center pb-[0.5rem] justify-between">
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
                Active Projects
              </button>
              <button
                className="px-4 py-2 bg-white/80 font-[600]  rounded-lg shadow-inner"
                onClick={() => navigate(`/projectbooks/archivedProjects`)}
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
                          <Tooltip content={item.name}>
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
                          <Tooltip content={item.address}>
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
                        item.additional_requirements.length > 25 ? (
                          <Tooltip content={item.additional_requirements}>
                            {`${item.additional_requirements.slice(0, 25)}...`}
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
                          className="bg-accent flex gap-[0.5rem] text-[0.9rem] font-semibold px-[20px] py-[5px] text-light rounded-lg "
                          onClick={() =>
                            navigate(`/projectbooks/jobBook/${item.id}`)
                          }
                        >
                          View Jobs
                        </button>

                        <button
                          className="py-[5px] px-[1rem] rounded-md bg-delete/90 text-light text-[0.9rem] font-semibold"
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
