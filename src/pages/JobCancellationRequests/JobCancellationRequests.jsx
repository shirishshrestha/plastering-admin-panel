import { useNavigate } from "react-router-dom";
import { useGetCancellations } from "./hooks/query/useGetCancellations";
import {
  ConfirmationPopup,
  CustomToastContainer,
  EmptyData,
  Loader,
} from "../../components";
import { Tooltip } from "flowbite-react";
import { useAcceptCancellationRequest } from "./hooks/mutation/useAcceptCancellationRequest";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useToggle } from "../../hooks/useToggle";
import { useRejectCancellationRequest } from "./hooks/mutation/useRejectCancellationRequest";

/**
 * Table header data for the job listing.
 * @type {Array<string>}
 */
const tableHead = [
  "Client",
  "Project Name",
  "Job Name",
  "Cancel Reason",
  "Requested Date",
  "Status",
  "Actions",
];

const JobCancellationRequests = () => {
  const navigate = useNavigate();
  const [JobCancellationId, setJobCancellationId] = useState();
  const [AcceptShow, handleAcceptToggle] = useToggle();
  const [RejectShow, handleRejectToggle] = useToggle();

  const { data: JobCancellationData, isPending: JobCancellationDataPending } =
    useGetCancellations();

  const {
    mutate: AcceptJobCancellation,
    isPending: AcceptJobCancellationPending,
  } = useAcceptCancellationRequest(handleAcceptToggle);

  const {
    mutate: RejectJobCancellation,
    isPending: RejectJobCancellationPending,
  } = useRejectCancellationRequest(handleRejectToggle);

  const AcceptSubmissionHandler = () => {
    AcceptJobCancellation(JobCancellationId);
  };

  const RejectSubmissionHandler = () => {
    RejectJobCancellation(JobCancellationId);
  };

  return (
    <section className="mt-[.5rem] pb-[1rem]">
      {(JobCancellationDataPending ||
        AcceptJobCancellationPending ||
        RejectJobCancellationPending) && <Loader />}

      {AcceptShow && (
        <ConfirmationPopup
          handleAcceptSubmission={AcceptSubmissionHandler}
          handleToggle={handleAcceptToggle}
        />
      )}

      {RejectShow && (
        <ConfirmationPopup
          handleAcceptSubmission={RejectSubmissionHandler}
          handleToggle={handleRejectToggle}
        />
      )}

      <div className="flex items-center pt-[0.5rem] pb-[1rem] justify-between">
        <h2 className="font-bold text-[1.4rem] text-start">
          List of Job Cancellation Requests
        </h2>
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
          {JobCancellationData?.data?.length > 0 ? (
            JobCancellationData?.data?.map((cancelData) => (
              <tr key={cancelData.id} className="last:border-none">
                <td className="py-[1rem] px-[0.5rem]">
                  {cancelData.client.name ? (
                    cancelData.client.name.length > 25 ? (
                      <Tooltip
                        className="max-w-[300px]"
                        content={cancelData.client.name}
                      >
                        {`${cancelData.client.name.slice(0, 25)}...`}
                      </Tooltip>
                    ) : (
                      cancelData.client.name
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-[1rem] px-[0.5rem]">
                  {cancelData.project.name ? (
                    cancelData.project.name.length > 25 ? (
                      <Tooltip
                        className="max-w-[300px]"
                        content={cancelData.project.name}
                      >
                        {`${cancelData.project.name.slice(0, 25)}...`}
                      </Tooltip>
                    ) : (
                      cancelData.project.name
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-[1rem]">
                  {cancelData.job.job_name ? (
                    cancelData.job.job_name.length > 30 ? (
                      <Tooltip
                        className="max-w-[300px]"
                        content={cancelData.job.job_name}
                      >
                        {`${cancelData.job.job_name.slice(0, 30)}...`}
                      </Tooltip>
                    ) : (
                      cancelData.job.job_name
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-[1rem]">
                  {cancelData.reason ? (
                    cancelData.reason.length > 35 ? (
                      <Tooltip
                        className="max-w-[300px]"
                        content={cancelData.reason}
                      >
                        {`${cancelData.reason.slice(0, 35)}...`}
                      </Tooltip>
                    ) : (
                      cancelData.reason
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-[1rem]">
                  {cancelData.created_at.split("T")[0]}
                </td>
                <td className="py-[1rem]">{cancelData.status}</td>
                <td className="py-[1rem]">
                  <div className="flex gap-[0.7rem]">
                    <button
                      className="bg-accent flex gap-[0.5rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg"
                      onClick={() =>
                        navigate(`/projectbooks/viewJob/${cancelData.job.id}`)
                      }
                    >
                      View Jobs
                    </button>
                    <button
                      className="bg-edit flex gap-[0.5rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg"
                      onClick={() => {
                        setJobCancellationId(cancelData.id);
                        handleAcceptToggle();
                      }}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-delete flex gap-[0.5rem] text-[0.8rem] font-semibold px-[10px] py-[5px] text-light rounded-lg"
                      onClick={() => {
                        setJobCancellationId(cancelData.id);
                        handleRejectToggle();
                      }}
                    >
                      Reject
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
      <CustomToastContainer />
    </section>
  );
};

export default JobCancellationRequests;
