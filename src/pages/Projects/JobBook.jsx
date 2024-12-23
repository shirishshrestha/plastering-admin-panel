import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  EditIcon,
  EyeIcon,
  GoBack,
  PlusIcon,
  TrashIcon,
} from "../../assets/icons/SvgIcons";
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
import { useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useGetJobs } from "./hooks/query/useGetJobs";
import { useToggle } from "../../hooks/useToggle";
import { useDeleteJob } from "./hooks/mutation/useDeleteJob";
import { getRoleFromLocalStorage } from "../../utils/Storage/StorageUtils";
import { RevisionPopup } from "./components/RevisionPopup";

/**
 * Table header data for the job listing.
 * @type {Array<string>}
 */
const tableHead = [
  "ID",
  "Job Name",
  "Additional Info",
  "Required By Date",
  "Status",
  "Actions",
];

/**
 * JobBook component is responsible for displaying a list of jobs and their details.
 * It handles pagination, search filters, and job deletion with confirmation.
 *
 * @returns {JSX.Element} The JobBook component.
 */
const JobBook = () => {
  /**
   * Retrieves the user role from local storage.
   * @type {string}
   */
  const role = getRoleFromLocalStorage();

  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { openDrawer } = useAuth();

  const [jobId, setJobId] = useState();
  const [jobName, setJobName] = useState();

  const [deleteConfirationShow, handleDeleteToggle] = useToggle();
  const [cancelConfirationShow, handleCancelToggle] = useToggle();
  const [revisionFlag, handleRevision] = useToggle();

  // Memoized current page number, search item, status, date based on search parameters
  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const searchItem = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const start_date = useMemo(
    () => searchParams.get("date") || "",
    [searchParams]
  );

  const status = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  /**
   * Fetches job data based on search parameters and current page.
   *
   * @param {Object} params - The query parameters for fetching jobs.
   * @returns {Object} The job data and pending state.
   */
  const { data: JobData, isPending: JobPending } = useGetJobs(
    "userJobs",
    id,
    currentPage,
    searchItem,
    start_date,
    status
  );

  /**
   * Mutation hook to delete a job.
   *
   * @param {string} jobId - The job ID to delete.
   * @returns {Object} The mutation functions for deleting a job.
   */
  const { mutate: DeleteJob, isPending: DeleteJobPending } = useDeleteJob(
    "userJobs",
    handleDeleteToggle,
    JobData?.data,
    currentPage
  );

  /**
   * Pagination props for controlling pagination behavior.
   *
   * @type {Object}
   * @property {number} pageNumber - The current page number.
   * @property {number} lastPage - The last page number.
   * @property {Function} nextClick - Function to navigate to the next page.
   * @property {Function} prevClick - Function to navigate to the previous page.
   */
  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: JobData?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, JobData]
  );

  /**
   * Updates the page number in the search params.
   *
   * @param {number} newPageNumber - The new page number to set in the URL.
   */
  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

  /**
   * Handles the action when the user proceeds with job deletion.
   *
   */
  const handleProceedClick = () => {
    DeleteJob(jobId);
  };

  const handleCancelProceedClick = () => {};

  return (
    <>
      <section className="mt-[.5rem] pb-[1rem]">
        {JobPending && <Loader />}
        {deleteConfirationShow && (
          <DeleteConfirmation
            deleteName={jobName}
            handleDeleteToggle={handleDeleteToggle}
            handleProceedClick={handleProceedClick}
            deleteLoading={DeleteJobPending}
          />
        )}

        {cancelConfirationShow && (
          <CancelProjectConfirmation
            projectName={jobName}
            handleProceedClick={handleCancelProceedClick}
            handleCancelToggle={handleCancelToggle}
            cancelLoading={DeleteJobPending}
            cancelInfo={
              "Your cancellation request will be sent to the admin for approval."
            }
          />
        )}

        {revisionFlag && (
          <RevisionPopup handleRevision={handleRevision} id={jobId} />
        )}

        <FilterDrawer
          setSearchParams={setSearchParams}
          dateName="required by date"
        >
          <FilterDrawer.Status
            options={[
              { value: "pending", label: "Pending" },
              { value: "running", label: "Running" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
          <FilterDrawer.RegisteredDate />
        </FilterDrawer>
        <div>
          <div
            className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer font-[500]"
            onClick={() => {
              navigate(
                role === "admin"
                  ? `/projectbooks/projects/${JobData?.user_id}`
                  : "/clientProjects"
              );
            }}
          >
            <GoBack />
            Go to Projects
          </div>
          <div className="flex items-center pt-[0.5rem] pb-[1rem] justify-between">
            <h2 className="font-bold text-[1.4rem] text-start">List of Jobs</h2>
            <div className="flex items-end gap-[1rem]">
              <SearchInput
                setSearchParams={setSearchParams}
                placeholder={"Search by job name"}
              />
              <Link
                to={
                  role === "admin"
                    ? `/projectbooks/addJob/${id}`
                    : `/clientProjects/addJob/${id}`
                }
              >
                <button className="bg-[#FF5733] flex gap-[0.5rem] font-semibold px-[30px] py-[10px] text-light rounded-lg ">
                  Add New Job <PlusIcon svgColor={"#f0fbff"} size={"size-6"} />
                </button>
              </Link>

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
              {JobData?.data?.length > 0 ? (
                JobData?.data?.map((job) => (
                  <tr key={job.id} className="last:border-none">
                    <td className="py-[1rem] pl-[0.5rem]">{job.id}</td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {job.job_name ? (
                        job.job_name.length > 30 ? (
                          <Tooltip content={job.job_name}>
                            {`${job.job_name.slice(0, 30)}...`}
                          </Tooltip>
                        ) : (
                          job.job_name
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">
                      {job.description ? (
                        job.description.length > 35 ? (
                          <Tooltip content={job.description}>
                            {`${job.description.slice(0, 35)}...`}
                          </Tooltip>
                        ) : (
                          job.description
                        )
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-[1rem]">{job.start_date}</td>
                    <td className="py-[1rem]">{job.status}</td>
                    <td>
                      <div className="flex gap-[0.7rem]">
                        <button
                          className="bg-accent flex items-center gap-[0.3rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                          onClick={() =>
                            navigate(
                              role === "admin"
                                ? `/projectbooks/viewJob/${job.id}`
                                : `/clientProjects/viewJob/${job.id}`
                            )
                          }
                        >
                          View
                        </button>
                        {role === "client" && (
                          <>
                            <button
                              className="bg-edit flex items-center gap-[0.3rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                              onClick={() => {
                                handleRevision();
                                setJobId(job.id);
                              }}
                            >
                              Revision
                            </button>
                            <button
                              className="bg-delete flex items-center gap-[0.3rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                              onClick={() => {
                                handleCancelToggle();
                                setJobName(job.job_name);
                                setJobId(job.id);
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {role === "admin" && (
                          <>
                            <button
                              className="bg-edit flex items-center gap-[0.3rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                              onClick={() =>
                                navigate(`/projectbooks/editJob/${job.id}`)
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="bg-delete flex items-center gap-[0.3rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg "
                              onClick={() => {
                                handleDeleteToggle();
                                setJobName(job.job_name);
                                setJobId(job.id);
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
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
        {JobData?.last_page > 1 && (
          <div className="my-[1rem] flex items-center justify-end">
            <Pagination {...paginationProps} />
          </div>
        )}
        <CustomToastContainer />
      </section>
    </>
  );
};

export default JobBook;
