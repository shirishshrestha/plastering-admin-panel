import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Document,
  Download,
  Folder,
  GoBack,
} from "../../assets/icons/SvgIcons";
import {
  downloadFile,
  getProjectById,
} from "../../api/Projects/ProjectsApiSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const ViewProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const files = [
    {
      fileName: "Plastering.pdf",
      id: 1,
    },
    {
      fileName: "Electrical.pdf",
      id: 2,
    },
    {
      fileName: "cement.pdf",
      id: 3,
    },
  ];

  const projectDetails = {
    assignedEstimator: "John Doe",
    dateSubmitted: "2024-08-15",
    dateStarted: "2024-08-16",
    lastModified: "2024-08-18",
    dateCompleted: "2024-08-20",
    duration: "72 hours",
  };

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
    console.log(name);
    setDownloadId(index);
    setDownload(name);
  };

  return (
    <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
      {viewProjectPending && (
        <div className="h-full w-full bg-primary fixed z-10 top-0 left-0 flex items-center justify-center">
          <DotLottieReact
            autoplay
            loop
            src="https://lottie.host/60536e0b-45dc-4920-b2cc-712007c38ee2/k56mKpn4dv.lottie"
            style={{ height: "300px", width: "300px" }}
          />
        </div>
      )}

      <div className="mb-[0.5rem] text-[12px] font-[500]">
        <div
          className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer"
          onClick={() => {
            navigate("/projects");
          }}
        >
          <GoBack />
          Go Back
        </div>
      </div>
      <h2 className="font-bold text-[1.2rem]">
        {SingleProjectData?.name} -{" "}
        <span className="font-semibold text-[14px]">
          {SingleProjectData?.address}
        </span>
      </h2>
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
                <div key={file.id} className="flex gap-[0.5rem] items-center">
                  <Document />
                  <p className="font-[500]">{file.split("/").pop()}</p>

                  <button
                    type="button"
                    className="flex items-center text-[12px] font-[500] gap-[0.2rem] hover:underline"
                    onClick={() => handleDownload(file.split("/")[1], index)}
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
        <div className="border-[2px] border-gray-300 rounded-lg p-[1rem] hover:text-light hover:bg-primary hover:border-primary cursor-pointer transition-all ease-in-out duration-300 font-[500] text-[1rem] text-center ">
          Estimator Uploaded Files
        </div>

        <div className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-start gap-[0.5rem] w-[70%]">
              <button className="button w-full justify-center">
                Accept Submission
              </button>
              <button className="button w-full justify-center">
                Download Project
              </button>
              <button className="button w-full justify-center">
                Request Cancellation
              </button>
              <button className="button w-full justify-center">
                Request Revision
              </button>
              <button className="button w-full justify-center">
                Send Email
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="p-[1rem] border-[2px] border-gray-300 w-[60%] h-fit rounded-lg ">
              <table className="text-start w-full">
                <tr>
                  <th className="text-start py-[5px] ">Assigned Estimator: </th>
                  <td className="font-[500]">
                    {projectDetails.assignedEstimator}
                  </td>
                </tr>
                <tr>
                  <th className="text-start py-[5px] ">Submitted Date: </th>
                  <td className="font-[500]">
                    {SingleProjectData?.created_at
                      ? SingleProjectData.created_at.split("T")[0]
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
                      ? SingleProjectData.updated_at.split("T")[0]
                      : "-"}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewProject;
