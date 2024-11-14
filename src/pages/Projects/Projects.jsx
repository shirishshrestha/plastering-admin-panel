import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  EditIcon,
  EyeIcon,
  PlusIcon,
  TrashIcon,
} from "../../assets/icons/SvgIcons";
import {
  CustomToastContainer,
  DeleteConfirmation,
  EmptyData,
  Loader,
  Pagination,
  SearchInput,
} from "../../components";
import { Tooltip } from "flowbite-react";
import useScrollRestoration from "../../hooks/useScrollRestoration";
import {
  deleteProject,
  getProjects,
} from "../../api/Projects/ProjectsApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { notifySuccess } from "../../components/Toast/Toast";
import { queryClient } from "../../utils/Query/Query";
import useAuth from "../../hooks/useAuth";

const tableHead = [
  "ID",
  "Project Name",
  "Address",
  "Start Date",
  "Status",
  "Actions",
];
const Projects = () => {
  useScrollRestoration();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchName, setSearchName } = useAuth();

  const [projectId, setProjectId] = useState();
  const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const {
    isPending,
    error,
    data: ProjectData,
  } = useQuery({
    queryKey: ["projects", currentPage, searchName],
    queryFn: () => getProjects(currentPage, searchName),
    enabled: location.pathname.includes("/projects"),
    staleTime: 6000,
  });

  const processedProjectData = useMemo(() => {
    if (!ProjectData) return [];
    return ProjectData.data;
  }, [ProjectData]);

  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: ProjectData?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, ProjectData]
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

  const handleViewProject = (id) => {
    navigate(`/projects/viewProject/${id}`);
  };

  const handleProceedClick = () => {
    DeleteProject();
  };

  return (
    <>
      {location.pathname !== "/projectbooks/projects" ? (
        <Outlet />
      ) : (
        <section className="mt-[.5rem] pb-[1rem]">
          {deleteConfirationShow && (
            <DeleteConfirmation
              deleteName={projectName}
              setDeleteConfirationShow={setDeleteConfirationShow}
              handleProceedClick={handleProceedClick}
              deleteLoading={deletePending}
            />
          )}
          {isPending && <Loader />}
          <div>
            <div className="flex items-center pb-[0.5rem] justify-between">
              <h2 className="font-bold text-[1.4rem] text-start">
                List of Projects
              </h2>
              <div className="flex gap-[1rem]">
                <SearchInput
                  defaultValue={searchName}
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                  placeholder={"Search by id or status"}
                  setSearchName={setSearchName}
                />
                <Link to="addProject">
                  <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                    Add New Project{" "}
                    <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                  </button>
                </Link>
              </div>
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden capitalize">
              <thead className="bg-primary text-white">
                {tableHead.map((item, index) => (
                  <th
                    key={index}
                    className="py-[1rem] font-semibold text-start first:pl-[0.5rem]"
                  >
                    {item}
                  </th>
                ))}
              </thead>
              <tbody>
                {processedProjectData.length > 0 ? (
                  processedProjectData.map((item) => (
                    <tr key={item.id} className="last:border-none">
                      <td className="py-[1rem] pl-[0.5rem]">{item.id}</td>
                      <td className="py-[1rem] pl-[0.5rem]">
                        {item.name ? (
                          item.name.length > 25 ? (
                            <Tooltip content={item.name}>
                              {`${item.name.slice(0, 25)}...`}
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
                          item.address.length > 25 ? (
                            <Tooltip content={item.address}>
                              {`${item.address.slice(0, 25)}...`}
                            </Tooltip>
                          ) : (
                            item.address
                          )
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-[1rem]">{item.start_date}</td>
                      <td className="py-[1rem]">{item.status}</td>
                      <td>
                        <div className="flex gap-[0.7rem]">
                          <button
                            className="p-[5px] rounded-md bg-viewBackground"
                            onClick={() => handleViewProject(item.id)}
                          >
                            <EyeIcon strokeColor={"#3e84f4"} />
                          </button>
                          <button
                            className="p-[5px] rounded-md bg-editBackground"
                            onClick={() =>
                              navigate(`/projects/editProject/${item.id}`)
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
          {ProjectData?.last_page > 1 && (
            <div className="mb-[1rem] flex items-center justify-end">
              <Pagination {...paginationProps} />
            </div>
          )}
          <CustomToastContainer />
        </section>
      )}
    </>
  );
};

export default Projects;
