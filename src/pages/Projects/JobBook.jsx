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
import {
  deleteProject,
  getProjects,
} from "../../api/Projects/ProjectsApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { notifySuccess } from "../../components/Toast/Toast";
import { queryClient } from "../../utils/Query/Query";
import useAuth from "../../hooks/useAuth";

const tableHead = [
  "ID",
  "Job Name",
  "Additional Info",
  "Start Date",
  "Status",
  "Actions",
];

const tableData = [
  {
    id: 1,
    jobName: "Living Room Plastering",
    additionalInfo: "Wall cracks repair and ceiling smoothing",
    startDate: "2024-11-20",
    status: "In Progress",
  },
  {
    id: 2,
    jobName: "Commercial Office Renovation",
    additionalInfo: "Drywall installation and plaster finishing",
    startDate: "2024-11-18",
    status: "Completed",
  },
  {
    id: 3,
    jobName: "Kitchen Ceiling Repair",
    additionalInfo: "Repairing water damage and repainting",
    startDate: "2024-11-25",
    status: "Scheduled",
  },
  {
    id: 4,
    jobName: "Home Exterior Plastering",
    additionalInfo: "Applying weatherproof plaster for walls",
    startDate: "2024-11-15",
    status: "Completed",
  },
  {
    id: 5,
    jobName: "Bathroom Remodeling",
    additionalInfo: "Plastering and waterproofing shower walls",
    startDate: "2024-11-22",
    status: "In Progress",
  },
];

const JobBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const { searchName, setSearchName } = useAuth();

  // const [projectId, setProjectId] = useState();
  // const [projectName, setProjectName] = useState();
  // const [deleteConfirationShow, setDeleteConfirationShow] = useState(false);

  // const currentPage = useMemo(
  //   () => parseInt(searchParams.get("page") || "1", 10),
  //   [searchParams]
  // );

  // const {
  //   isPending,
  //   error,
  //   data: ProjectData,
  // } = useQuery({
  //   queryKey: ["viewJobBook", currentPage, searchName],
  //   queryFn: () => getProjects(currentPage, searchName),
  //   enabled: location.pathname.includes("/projects"),
  //   staleTime: 6000,
  // });

  // const processedProjectData = useMemo(() => {
  //   if (!ProjectData) return [];
  //   return ProjectData.data;
  // }, [ProjectData]);

  // const paginationProps = useMemo(
  //   () => ({
  //     pageNumber: currentPage,
  //     lastPage: ProjectData?.last_page || 1,
  //     nextClick: () => updatePageNumber(currentPage + 1),
  //     prevClick: () => updatePageNumber(currentPage - 1),
  //   }),
  //   [currentPage, ProjectData]
  // );

  // const { mutate: DeleteProject, isPending: deletePending } = useMutation({
  //   mutationFn: () => deleteProject(projectId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("projects");
  //     notifySuccess("Project deleted successfully");
  //     setDeleteConfirationShow(false);
  //   },
  //   onError: () => {
  //     notifyError("Failed to delete project, please try again");
  //   },
  // });

  // const updatePageNumber = (newPageNumber) => {
  //   const updatedParams = new URLSearchParams(searchParams);
  //   updatedParams.set("page", newPageNumber.toString());
  //   setSearchParams(updatedParams);
  // };

  // const handleProceedClick = () => {
  //   DeleteProject();
  // };

  return (
    <>
      <section className="mt-[.5rem] pb-[1rem]">
        {/* {deleteConfirationShow && (
            <DeleteConfirmation
              deleteName={projectName}
              setDeleteConfirationShow={setDeleteConfirationShow}
              handleProceedClick={handleProceedClick}
              deleteLoading={deletePending}
            />
          )} */}
        {/* {isPending && <Loader />} */}
        <div>
          <div className="flex items-center pb-[0.5rem] justify-between">
            <h2 className="font-bold text-[1.4rem] text-start">List of Jobs</h2>
            <div className="flex gap-[1rem]">
              {/* <SearchInput
                  defaultValue={searchName}
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                  placeholder={"Search by id or status"}
               
                /> */}
              <Link to="/projectbooks/addJob">
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Job <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>
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
              {tableData.length > 0 ? (
                tableData.map((job) => (
                  <tr key={job.id} className="last:border-none">
                    <td className="py-[1rem] pl-[0.5rem]">{job.id}</td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {job.jobName ? (
                        job.jobName.length > 30 ? (
                          <Tooltip content={job.jobName}>
                            {`${job.jobName.slice(0, 30)}...`}
                          </Tooltip>
                        ) : (
                          job.jobName
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">
                      {job.additionalInfo ? (
                        job.additionalInfo.length > 30 ? (
                          <Tooltip content={job.additionalInfo}>
                            {`${job.additionalInfo.slice(0, 30)}...`}
                          </Tooltip>
                        ) : (
                          job.additionalInfo
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">{job.startDate}</td>
                    <td className="py-[1rem]">{job.status}</td>
                    <td>
                      <div className="flex gap-[0.7rem]">
                        <button
                          className="p-[5px] rounded-md bg-viewBackground"
                          onClick={() =>
                            navigate(`/projectbooks/viewJob/${job.id}`)
                          }
                        >
                          <EyeIcon strokeColor="#3e84f4" />
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-editBackground"
                          onClick={() =>
                            navigate(`/projectbooks/editJob/${job.id}`)
                          }
                        >
                          <EditIcon color="#8c62ff" />
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-deleteBackground"
                          // onClick={() => {
                          //   setDeleteConfirationShow(true);
                          //   setProjectName(job.name);
                          //   setProjectId(job.id);
                          // }}
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
        {/* {ProjectData?.last_page > 1 && (
            <div className="mb-[1rem] flex items-center justify-end">
              <Pagination {...paginationProps} />
            </div>
          )} */}
        <CustomToastContainer />
      </section>
    </>
  );
};

export default JobBook;
