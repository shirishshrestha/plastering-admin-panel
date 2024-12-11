import {
  Link,
  useNavigate,
  useParams,
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

const tableHead = [
  "ID",
  "Job Name",
  "Additional Info",
  "Required By Date",
  "Status",
  "Actions",
];

const JobBook = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { openDrawer } = useAuth();

  const [jobId, setJobId] = useState();
  const [jobName, setJobName] = useState();
  const [deleteConfirationShow, handleDeleteToggle] = useToggle();

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

  const { data: JobData, isPending: JobPending } = useGetJobs(
    "userJobs",
    id,
    currentPage,
    searchItem,
    start_date,
    status
  );

  const { mutate: DeleteJob, isPending: DeleteJobPending } = useDeleteJob(
    "userJobs",
    handleDeleteToggle,
    JobData?.data,
    currentPage
  );

  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: JobData?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, JobData]
  );

  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

  const handleProceedClick = () => {
    DeleteJob(jobId);
  };

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
          <div className="flex items-center pb-[1rem] justify-between">
            <h2 className="font-bold text-[1.4rem] text-start">List of Jobs</h2>
            <div className="flex items-end gap-[1rem]">
              <SearchInput
                setSearchParams={setSearchParams}
                placeholder={"Search by job name"}
              />
              <Link to={`/projectbooks/addJob/${id}`}>
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
                          onClick={() => {
                            handleDeleteToggle();
                            setJobName(job.job_name);
                            setJobId(job.id);
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
