import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  acceptProject,
  downloadFile,
  getProjectById,
  requestCancellation,
  sendEmailToClient,
} from "../../../api/Projects/ProjectsApiSlice";
import {
  getIdFromLocalStorage,
  getRoleFromLocalStorage,
} from "../../../utils/Storage/StorageUtils";
import { queryClient } from "../../../utils/Query/Query";
import { notifyError, notifySuccess } from "../../../components/Toast/Toast";
import {
  ConfirmationPopup,
  CustomToastContainer,
  Loader,
} from "../../../components";
import { RevisionPopup } from "./RevisionPopup";
import { Document, Download, GoBack } from "../../../assets/icons/SvgIcons";
import useAuth from "../../../hooks/useAuth";
import { useGetJobById } from "../hooks/query/useGetJobById";

const ViewJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const role = getRoleFromLocalStorage();
  const user_id = getIdFromLocalStorage();

  const [cancellationFlag, setCancellationFlag] = useState(false);
  const [revisionFlag, setRevisionFlag] = useState(false);
  const [sendEmailFlag, setSendEmailFlag] = useState(false);

  const { confirmationShow, setConfirmationShow } = useAuth();

  const [disabledFlag, setDisabledFlag] = useState({
    cancellationFlag: false,
    revisionFlag: false,
  });

  const { data: JobData, isPending: JobDataPending } = useGetJobById(
    "jobById",
    id
  );

  const [download, setDownload] = useState();
  const [downloadId, setDownloadId] = useState();
  const { data, isFetching: fetchingFile } = useQuery({
    queryKey: ["downloadFile", download],
    queryFn: () => downloadFile(download, setDownload, JobData?.id),
    enabled: !!download,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  const handleDownload = (name, index) => {
    setDownloadId(index);
    setDownload(name);
  };

  const { mutate: AcceptProject, isPending: AcceptProjectPending } =
    useMutation({
      mutationFn: (data) => acceptProject(data, id),
      onSuccess: (data) => {
        queryClient.invalidateQueries(["singleProject", id]);
        setConfirmationShow(false);
        notifySuccess("Project accepted");
      },
      onError: (error) => {
        notifyError("Something went wrong! Please try again");
        setConfirmationShow(false);
      },
    });

  const { mutate: RequestCancellation, isPending: RequestCancellationPending } =
    useMutation({
      mutationFn: () => requestCancellation(user_id, id),
      onSuccess: () => {
        setDisabledFlag({ ...disabledFlag, cancellationFlag: true });
        notifySuccess("Request for cancellation sent");
        setCancellationFlag(false);
      },
      onError: () => {
        notifyError("Something went wrong! Please try again");
        setCancellationFlag(false);
      },
    });

  const { mutate: SendEmailToClient, isPending: SendEmailPending } =
    useMutation({
      mutationFn: () => sendEmailToClient(id),
      onSuccess: () => {
        notifySuccess("Request for revision sent");
        setSendEmailFlag(true);
      },
      onError: () => {
        notifyError("Something went wrong! Please try again");
      },
    });

  const SubmissionHandler = () => {
    const formData = new FormData();
    formData.append("status", "running");
    formData.append("_method", "PUT");
    AcceptProject(formData);
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
      {(JobDataPending ||
        AcceptProjectPending ||
        RequestCancellationPending ||
        SendEmailPending) && <Loader />}

      {confirmationShow && (
        <ConfirmationPopup
          handleAcceptSubmission={SubmissionHandler}
          setSubmissionConfirmationShow={setConfirmationShow}
        />
      )}

      {cancellationFlag && (
        <ConfirmationPopup
          handleAcceptSubmission={() => RequestCancellation()}
          setSubmissionConfirmationShow={setCancellationFlag}
        />
      )}

      {revisionFlag && (
        <RevisionPopup
          setRevisionFlag={setRevisionFlag}
          setDisabledFlag={setDisabledFlag}
          disabledFlag={disabledFlag}
        />
      )}

      {/* {adminFlag && <AdminEstimation setAdminFlag={setAdminFlag} id={id} />}
      {clientFlag && <ClientEstimation setClientFlag={setClientFlag} id={id} />} */}

      <div className="mb-[0.5rem] text-[12px] font-[500]">
        <div className="flex justify-between">
          <div
            className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <GoBack />
            Go Back
          </div>
          <div>
            <select
              name="revision"
              id="revision"
              defaultValue="revision0"
              className="rounded-lg focus:ring-primary"
            >
              <option value="revision0">Revision 0</option>
              <option value="revision1">Revision 1</option>
              <option value="revision2">Revision 2</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        {/* <h2 className="font-bold text-[0.8rem]">
          {SingleProjectData?.user.name}
        </h2> */}
        <h2 className="font-bold text-[1.2rem]">
          {JobData?.job_name}
          {/* <span className="font-semibold text-[14px]">{JobData?.address}</span> */}
        </h2>
        <p className="text-[14px] font-[500]">
          Project Name: {JobData?.project?.name}
        </p>
      </div>
      <div className="mt-[1rem] flex flex-col gap-[1rem] text-[14px]">
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
          <p className="font-semibold mb-[0.1rem] text-[1rem]">
            Provided Additional Requirements:
          </p>
          <div
            className="list-disc font-[500] focus:ring-2 focus:ring-blue-500 rounded-lg focus:outline-none"
            spellCheck="false"
          >
            {JobData?.description || "-"}
          </div>
        </div>
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
          <p className="font-semibold mb-[0.5rem] text-[1rem]">
            Uploaded Files:
          </p>
          <div className="flex justify-evenly items-center flex-wrap">
            {JobData?.files.length < 1 ? (
              <p className="font-[500]">No files uploaded</p>
            ) : (
              JobData?.files.map((file, index) => (
                <div key={index} className="flex gap-[0.5rem] items-center">
                  <Document />
                  <p className="font-[500]">{file.name}</p>

                  <button
                    type="button"
                    className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                    onClick={() => handleDownload(file.name, index)}
                  >
                    <Download />
                    {fetchingFile && index === downloadId
                      ? "Loading"
                      : "Download"}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* {role === "admin" ? (
          <div
            className="border-[2px] border-gray-300 rounded-lg p-[1rem] hover:text-light hover:bg-primary hover:border-primary cursor-pointer transition-all ease-in-out duration-300 font-[500] text-[1rem] text-center"
            onClick={() => setAdminFlag(true)}
          >
            Upload Estimation Files / Edit Estimation Files
          </div>
        ) : (
          <div
            className="border-[2px] border-gray-300 rounded-lg p-[1rem] hover:text-light hover:bg-primary hover:border-primary cursor-pointer transition-all ease-in-out duration-300 font-[500] text-[1rem] text-center "
            onClick={() => setClientFlag(true)}
          >
            Estimator Uploaded Files
          </div>
        )} */}

        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start gap-[0.5rem] w-[70%]">
              {role === "admin" && (
                <button
                  className="button w-full justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setConfirmationShow(true)}
                  disabled={
                    JobData?.status === "running" ||
                    JobData?.status === "completed"
                  }
                >
                  {JobData?.status === "pending"
                    ? "Accept Submission"
                    : JobData?.status === "running"
                    ? "Running"
                    : "Completed"}
                </button>
              )}

              {role === "client" && (
                <button
                  className="button w-full justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setCancellationFlag(true)}
                  disabled={disabledFlag.cancellationFlag}
                >
                  Request Cancellation
                </button>
              )}
              {role === "client" && (
                <button
                  className="button w-full justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setRevisionFlag(true)}
                  disabled={
                    disabledFlag.revisionFlag || disabledFlag.cancellationFlag
                  }
                >
                  Request Revision
                </button>
              )}
              {role === "admin" && (
                <button
                  className="button w-full justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  disabled={JobData?.status === "pending" || sendEmailFlag}
                  onClick={() => SendEmailToClient()}
                >
                  Send Acceptance Email to Client
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="p-[1rem] border-[2px] border-gray-300 w-[60%] h-fit rounded-lg ">
              <table className="text-start w-full">
                <tbody>
                  <tr>
                    <th className="text-start py-[5px] ">
                      Assigned Estimator:{" "}
                    </th>
                    <td className="font-[500]">PE&I</td>
                  </tr>
                  <tr>
                    <th className="text-start py-[5px] ">Submitted Date: </th>
                    <td className="font-[500]">
                      {JobData?.created_at
                        ? JobData?.created_at.split("T")[0]
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start py-[5px] ">Started Date: </th>
                    <td className="font-[500]">{JobData?.start_date}</td>
                  </tr>
                  <tr>
                    <th className="text-start py-[5px] ">Last Modified: </th>
                    <td className="font-[500]">
                      {JobData?.updated_at
                        ? JobData?.updated_at.split("T")[0]
                        : "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CustomToastContainer />
    </section>
  );
};

export default ViewJob;
