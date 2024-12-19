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
  CustomToastContainer,
  DeleteConfirmation,
  EmptyData,
  FilterDrawer,
  Loader,
  Pagination,
  SearchInput,
} from "../../../components";
import useAuth from "../../../hooks/useAuth";
import { useGetArchivedProjects } from "../hooks/query/useGetArchivedProjects";

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

export const ArchivedProjects = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const { openDrawer } = useAuth();

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const search = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const status = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  const projectType = useMemo(
    () => searchParams.get("project_type") || "",
    [searchParams]
  );

  const date = useMemo(() => searchParams.get("date") || "", [searchParams]);

  const { data: ArchivedProjectsData, isPending: ArchivedProjectsPending } =
    useGetArchivedProjects(
      "archivedProjects",
      "/projectbooks/archivedProjects",
      currentPage,
      search,
      status,
      projectType,
      date
    );

  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: ArchivedProjectsData?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, ArchivedProjectsData]
  );

  const { mutate: DeleteProject, isPending: deletePending } = useMutation({
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
      notifySuccess("Project deleted successfully");
      setDeleteConfirationShow(false);
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
        {deleteConfirationShow && (
          <DeleteConfirmation
            deleteName={projectName}
            setDeleteConfirationShow={setDeleteConfirationShow}
            handleProceedClick={handleProceedClick}
            deleteLoading={deletePending}
          />
        )}
        {ArchivedProjectsPending && <Loader />}
        <FilterDrawer setSearchParams={setSearchParams} dateName={"start date"}>
          <FilterDrawer.Status
            options={[
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
              <Link
                to={`/projectbooks/addProject/${ArchivedProjects?.user_id}`}
              >
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Project{" "}
                  <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center mb-[1rem]">
            <div className="flex gap-[1rem]">
              <button
                className="px-4 py-2 bg-white/80 font-[600] rounded-lg shadow-inner "
                onClick={() => navigate(`/projectbooks/projects/${id}`)}
              >
                All Projects
              </button>
              <button
                className="px-4 py-2 font-[600] bg-white/80 rounded-lg shadow-inner"
                onClick={() => navigate(`/projectbooks/activeProjects/${id}`)}
              >
                Active Projects
              </button>
              <button className="px-4 py-2 font-[600] rounded-lg shadow-inner text-light bg-secondary">
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
              {ArchivedProjectsData?.archived_projects?.data?.length > 0 ? (
                ArchivedProjectsData?.archived_projects?.data?.map((item) => (
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
                        item.additional_requirements.length > 20 ? (
                          <Tooltip content={item.additional_requirements}>
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
                          className="bg-accent flex gap-[0.5rem] text-[0.9rem] font-semibold px-[20px] py-[5px] text-light rounded-lg "
                          onClick={() =>
                            navigate(`/projectbooks/jobBook/${item.id}`, {
                              replace: false,
                            })
                          }
                        >
                          View Jobs
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-editBackground"
                          onClick={() =>
                            navigate(`/projectbooks/editProject/${item.id}`)
                          }
                        >
                          <EditIcon color="#8c62ff" />
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-deleteBackground"
                          onClick={() => {
                            setDeleteConfirationShow(true);
                            setProjectName(item.name);
                            setProjectId(item.id);
                          }}
                        >
                          <TrashIcon />
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
        {ArchivedProjectsData?.projects?.last_page > 1 && (
          <div className="my-[1rem] flex items-center justify-end">
            <Pagination {...paginationProps} />
          </div>
        )}
        <CustomToastContainer />
      </section>
    </>
  );
};
