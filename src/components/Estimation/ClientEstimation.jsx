import { useQuery } from "@tanstack/react-query";
import {
  downloadFile,
  getEstimationNotes,
} from "../../api/Projects/ProjectsApiSlice";
import { Document, Download } from "../../assets/icons/SvgIcons";
import { Loader } from "../Loader/Loader";
import { useState } from "react";

const ClientEstimation = ({ setClientFlag, id }) => {
  const [download, setDownload] = useState();
  const [downloadId, setDownloadId] = useState();

  const {
    isPending: EstimationDataPending,
    data: EstimationData,
    error,
  } = useQuery({
    queryKey: ["estimationData", id],
    queryFn: () => getEstimationNotes(id),
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

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

  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-10 bg-primary/80">
      {EstimationDataPending && <Loader />}
      <div className="w-[60%] bg-light rounded-lg shadow-lg relative p-[2rem] max-h-[75%] overflow-y-scroll admin__estimator ">
        <h2 className="text-center font-bold text-[1.2rem] border-[1.5px] border-primary rounded-lg py-[0.5rem]">
          Uploaded Estimation Details
        </h2>
        <div className="mt-[1rem] flex flex-col gap-[1rem] text-[14px]">
          <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
            <p className="font-semibold mb-[0.1rem] text-[1rem]">
              Estimation Notes:
            </p>
            <div
              className="list-disc font-[500] focus:ring-2 focus:ring-blue-500 rounded-lg focus:outline-none"
              // contentEditable
              spellCheck="false"
            >
              {EstimationData?.estimation_note || "-"}
            </div>
          </div>
          <div className="border-[2px] border-gray-300 rounded-lg p-[1rem]">
            <p className="font-semibold mb-[0.5rem] text-[1rem]">
              Project Parts:
            </p>
            <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
              {EstimationData?.project_parts ? (
                EstimationData?.project_parts.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-[600]">{part.part_name}</p>
                      <div className="flex justify-evenly flex-wrap gap-5 text-[14px] mt-[0.2rem]">
                        {Array.from(part.files).map((file, fileIndex) => (
                          <div className="flex gap-[0.5rem] items-center">
                            <Document />
                            <p key={fileIndex} className="font-[500]">
                              {file.split("/").pop()}
                            </p>
                            <button
                              type="button"
                              className=" rounded-lg px-[5px] py-[5px] text-primary flex gap-[0.2rem] items-center text-[12px] font-[500] hover:underline"
                              onClick={() =>
                                handleDownload(file.split("/").pop(), fileIndex)
                              }
                            >
                              <Download />
                              {fetchingFile && fileIndex === downloadId
                                ? "Loading"
                                : "Download"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="font-[500]">No parts added</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end items-center mt-[1rem]">
          <button
            className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
            type="button"
            onClick={() => setClientFlag(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientEstimation;
