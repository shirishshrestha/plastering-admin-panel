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
  GoBack,
  PlusIcon,
  TrashIcon,
} from "../../../assets/icons/SvgIcons";

import { Tooltip } from "flowbite-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  deleteProject,
  getProjects,
} from "../../../api/Projects/ProjectsApiSlice";
import { notifyError, notifySuccess } from "../../../components/Toast/Toast";
import { queryClient } from "../../../utils/Query/Query";
import {
  CustomToastContainer,
  DeleteConfirmation,
  EmptyData,
  Loader,
  Pagination,
  SearchInput,
} from "../../../components";

const tableHead = [
  "P. Id",
  "Project Name",
  "Address",
  "Start Date",
  "Status",
  "Actions",
];
export const ArchivedProjects = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchName, setSearchName] = useState("");

  const [projectId, setProjectId] = useState();
  const [projectName, setProjectName] = useState();
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
    // enabled: location.pathname.includes("/projects"),
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
        {isPending && <Loader />}
        <div>
          <div className="mb-[0.5rem] text-[12px] font-[500]">
            <div
              className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer"
              onClick={() => {
                navigate("/projectbooks");
              }}
            >
              <GoBack />
              Go Back
            </div>
          </div>
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
              <Link to="/projectbooks/addProject">
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Project{" "}
                  <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
            </div>
          </div>
          <div className="mb-[1rem] flex gap-[1rem]">
            <button
              className="px-4 py-2 bg-white/80 font-[600] rounded-lg shadow-inner "
              onClick={() => navigate(`/projectbooks/projects`)}
            >
              Active Projects
            </button>
            <button className="px-4 py-2  font-[600] rounded-lg shadow-inner text-light bg-secondary">
              Archived Projects
            </button>
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
        {ProjectData?.last_page > 1 && (
          <div className="mb-[1rem] flex items-center justify-end">
            <Pagination {...paginationProps} />
          </div>
        )}
        <CustomToastContainer />
      </section>
    </>
  );
};
