import { useNavigate, useParams } from "react-router-dom";
import { Document, Download, GoBack } from "../../assets/icons/SvgIcons";
import {
  acceptProject,
  downloadFile,
  getProjectById,
  requestCancellation,
  sendEmailToClient,
} from "../../api/Projects/ProjectsApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getIdFromLocalStorage,
  getRoleFromLocalStorage,
} from "../../utils/Storage/StorageUtils";
import {
  AdminEstimation,
  ClientEstimation,
  ConfirmationPopup,
  Loader,
  CustomToastContainer,
} from "../../components";
import useScrollRestoration from "../../hooks/useScrollRestoration";
import { queryClient } from "../../utils/Query/Query";
import useAuth from "../../hooks/useAuth";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import { RevisionPopup } from "./RevisionPopup";

const ViewProject = () => {
  useScrollRestoration();

  const navigate = useNavigate();
  const { id } = useParams();

  const role = getRoleFromLocalStorage();
  const user_id = getIdFromLocalStorage();

  const [adminFlag, setAdminFlag] = useState(false);
  const [clientFlag, setClientFlag] = useState(false);
  const [cancellationFlag, setCancellationFlag] = useState(false);
  const [revisionFlag, setRevisionFlag] = useState(false);
  const [sendEmailFlag, setSendEmailFlag] = useState(false);

  const { confirmationShow, setConfirmationShow } = useAuth();

  const [disabledFlag, setDisabledFlag] = useState({
    cancellationFlag: false,
    revisionFlag: false,
  });

  const {
    isPending: viewProjectPending,
    error,
    data: SingleProjectData,
  } = useQuery({
    queryKey: ["singleProject", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
    staleTime: 6000,
  });

  const [download, setDownload] = useState();
  const [downloadId, setDownloadId] = useState();
  const { data, isFetching: fetchingFile } = useQuery({
    queryKey: ["downloadFile", download],
    queryFn: () => downloadFile(download, setDownload),
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
        console.log(error);
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
      {(viewProjectPending ||
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

      {adminFlag && <AdminEstimation setAdminFlag={setAdminFlag} id={id} />}
      {clientFlag && <ClientEstimation setClientFlag={setClientFlag} id={id} />}

      <div className="mb-[0.5rem] text-[12px] font-[500]">
        <div
          className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <GoBack />
          Go Back
        </div>
      </div>
      <div>
        <h2 className="font-bold text-[0.8rem]">
          {SingleProjectData?.user.name}
        </h2>
        <h2 className="font-bold text-[1.2rem]">
          {SingleProjectData?.name} -{" "}
          <span className="font-semibold text-[14px]">
            {SingleProjectData?.address}
          </span>
        </h2>
        <p className="text-[14px] font-[500]">
          Project Type: {SingleProjectData?.project_type}
        </p>
      </div>
      <div className="mt-[1rem] flex flex-col gap-[1rem] text-[14px]">
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
          <p className="font-semibold mb-[0.1rem] text-[1rem]">
            Provided Additional Requirements:
          </p>
          <div
            className="list-disc font-[500] focus:ring-2 focus:ring-blue-500 rounded-lg focus:outline-none"
            // contentEditable
            spellCheck="false"
          >
            {SingleProjectData?.additional_requirements}
          </div>
        </div>
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
          <p className="font-semibold mb-[0.5rem] text-[1rem]">
            Uploaded Files:
          </p>
          <div className="flex justify-evenly items-center flex-wrap">
            {SingleProjectData?.files.length < 1 ? (
              <p className="font-[500]">No files uploaded</p>
            ) : (
              SingleProjectData?.files.map((file, index) => (
                <div key={index} className="flex gap-[0.5rem] items-center">
                  <Document />
                  <p className="font-[500]">{file.split("/").pop()}</p>

                  <button
                    type="button"
                    className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                    onClick={() => handleDownload(file.split("/").pop(), index)}
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

        {role === "admin" ? (
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
        )}

        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start gap-[0.5rem] w-[70%]">
              {role === "admin" && (
                <button
                  className="button w-full justify-center disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setConfirmationShow(true)}
                  disabled={
                    SingleProjectData?.status === "running" ||
                    SingleProjectData?.status === "completed"
                  }
                >
                  {SingleProjectData?.status === "pending"
                    ? "Accept Submission"
                    : SingleProjectData?.status === "running"
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
                  disabled={
                    SingleProjectData?.status === "pending" || sendEmailFlag
                  }
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
                      {SingleProjectData?.created_at
                        ? SingleProjectData?.created_at.split("T")[0]
                        : "-"}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start py-[5px] ">Started Date: </th>
                    <td className="font-[500]">
                      {SingleProjectData?.start_date}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start py-[5px] ">Last Modified: </th>
                    <td className="font-[500]">
                      {SingleProjectData?.updated_at
                        ? SingleProjectData?.updated_at.split("T")[0]
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

export default ViewProject;
