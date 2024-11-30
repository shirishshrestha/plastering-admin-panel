import { useForm } from "react-hook-form";
import { Document, PlusIcon, TrashIcon } from "../../assets/icons/SvgIcons";
import { useEffect, useState } from "react";
import AddProjectPart from "./AddProjectPart";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  editEstimation,
  getEstimationNotes,
  postEstimatesNote,
} from "../../api/Projects/ProjectsApiSlice";
import { notifySuccess } from "../Toast/Toast";
import { CustomToastContainer, Loader } from "../index";

const AdminEstimation = ({ setAdminFlag, id }) => {
  const [newProjectPart, setNewProjectPart] = useState(false);
  const [estimationNotes, setEstimationNotes] = useState("");
  const [projectPart, setProjectPart] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [disabledFlag, setDisabledFlag] = useState(false);

  const [oldPart, setOldPart] = useState([]);
  const [newEstimationFiles, setNewEstimationFiles] = useState([]);
  const [deletedPart, setDeletedPart] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    setValue("estimation_note", EstimationData?.estimation_note);
    setOldPart(EstimationData?.project_parts);
  }, [EstimationData]);

  const { mutate: EstimationNotes, isPending: EstimationPending } = useMutation(
    {
      mutationFn: (data) => postEstimatesNote(data, projectPart, id),
      onSuccess: () => {
        notifySuccess("Estimation Details Added Successfully");

        setTimeout(() => {
          setAdminFlag(false);
          setEstimationNotes("");
          setNewEstimationFiles([]);
          setOldPart([]);
          setDeletedPart([]);
          setProjectPart([]);
          setSelectedFiles([]);
          setDisabledFlag(false);
        }, 2000);
      },
      onError: () => {
        notifyError("Error Adding Estimation Details! Please Try Again");
      },
    }
  );

  const { mutate: EditEstimation, isPending: EditEstimationPending } =
    useMutation({
      mutationFn: (data) =>
        editEstimation(
          data,
          newEstimationFiles,
          deletedPart,
          id,
          EstimationData?.project_parts.length
        ),
      onSuccess: () => {
        notifySuccess("Estimation Details Edited Successfully");

        setTimeout(() => {
          setAdminFlag(false);
          setEstimationNotes("");
          setNewEstimationFiles([]);
          setOldPart([]);
          setDeletedPart([]);
          setProjectPart([]);
          setSelectedFiles([]);
        }, 2000);
      },
      onError: () => {
        notifyError("Error Adding Estimation Details! Please Try Again");
      },
    });

  const handleEstimationSubmit = (data) => {
    EstimationNotes(data);
  };

  const handleEditEstimationSubmit = (data) => {
    setDisabledFlag(true);
    EditEstimation(data);
  };

  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-10 bg-primary/80">
      {(EstimationPending ||
        EditEstimationPending ||
        EstimationDataPending) && <Loader />}

      {EstimationData ? (
        <div className="w-[60%] bg-light rounded-lg shadow-lg relative p-[2rem] max-h-[75%] overflow-y-scroll admin__estimator ">
          <h2 className="text-center font-bold text-[1.2rem] border-[1.5px] border-primary rounded-lg py-[0.5rem]">
            Upload Estimation Details
          </h2>
          <form
            className="mt-[1rem] flex flex-col gap-[1rem]"
            onSubmit={handleSubmit(handleEditEstimationSubmit)}
          >
            <div className="flex flex-col gap-[0.2rem]">
              <label htmlFor="estimation_note" className="font-[600] ">
                Estimation Notes
              </label>
              <textarea
                name="estimation_note"
                {...register("estimation_note", {
                  onChange: (e) => setEstimationNotes(e.target.value),
                })}
                type="text"
                className="w-full border-[1px] border-gray-300 rounded-lg p-[0.5rem] h-[100px] min-h-[100px] max-h-[300px] focus:ring-1 focus:ring-blue-600 focus:outline-none"
              ></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className=" font-[600] ">Add Project Part </h2>
                <button
                  type="button"
                  className="bg-primary flex gap-[0.5rem] items-center font-semibold px-[10px] py-[5px] text-light rounded-lg text-[14px] disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setNewProjectPart(true)}
                  disabled={newProjectPart}
                >
                  Add Part <PlusIcon svgColor={"#f0fbff"} size={"size-5"} />
                </button>
              </div>

              <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
                {oldPart?.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-[1px] border-gray-300 rounded-lg p-[0.5rem]"
                  >
                    <div>
                      <p className="font-[600]">{part.part_name}</p>

                      <div className="flex  justify-evenly flex-wrap gap-5 text-[14px] mt-[0.2rem]">
                        {part.files.length < 1 ? (
                          <p className="font-[500]">No files uploaded</p>
                        ) : (
                          Array.from(part.files).map((file, fileIndex) => (
                            <div
                              key={fileIndex}
                              className="flex gap-[0.5rem] items-center"
                            >
                              <Document />
                              <p className="font-[500]">
                                {file.split("/").pop()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="bg-deleteBackground rounded-lg px-[5px] py-[5px] text-light"
                      onClick={() => {
                        setOldPart(
                          oldPart.filter((partDelete, i) => i !== index)
                        );
                        setDeletedPart([...deletedPart, part.id]);
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-[500] mt-[0.5rem] mb-[0.5rem] text-[0.8rem]">
                  New Files:
                </p>
              </div>
              <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
                {newEstimationFiles?.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-[1px] border-gray-300 rounded-lg p-[0.5rem]"
                  >
                    <div>
                      <p className="font-[600]">{part.part_name}</p>

                      <div className="flex  justify-evenly flex-wrap gap-5 text-[14px] mt-[0.2rem]">
                        {Array.from(part.files).map((file, fileIndex) => (
                          <div
                            key={fileIndex}
                            className="flex gap-[0.5rem] items-center"
                          >
                            <Document />
                            <p key={fileIndex} className="font-[500]">
                              {file.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="bg-deleteBackground rounded-lg px-[5px] py-[5px] text-light"
                      onClick={() => {
                        setNewEstimationFiles(
                          newEstimationFiles.filter(
                            (partDelete, i) => i !== index
                          )
                        );
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              {newProjectPart && (
                <AddProjectPart
                  setNewProjectPart={setNewProjectPart}
                  setProjectPart={setNewEstimationFiles}
                  projectPart={newEstimationFiles}
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                />
              )}
            </div>
            <div className="flex gap-3 justify-end items-center">
              <button
                className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
                type="button"
                onClick={() => setAdminFlag(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary rounded-lg px-[30px] py-[10px] text-light disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={
                  disabledFlag ||
                  newProjectPart ||
                  (estimationNotes === "" &&
                    newEstimationFiles.length === 0 &&
                    deletedPart.length < 1)
                }
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-[60%] bg-light rounded-lg shadow-lg relative p-[2rem] max-h-[75%] overflow-y-scroll admin__estimator ">
          <h2 className="text-center font-bold text-[1.2rem] border-[1.5px] border-primary rounded-lg py-[0.5rem]">
            Upload Estimation Details
          </h2>
          <form
            className="mt-[1rem] flex flex-col gap-[1rem]"
            onSubmit={handleSubmit(handleEstimationSubmit)}
          >
            <div className="flex flex-col gap-[0.2rem]">
              <label htmlFor="estimation_note" className="font-[600] ">
                Estimation Notes
              </label>
              <textarea
                name="estimation_note"
                {...register("estimation_note", {
                  onChange: (e) => setEstimationNotes(e.target.value),
                })}
                type="text"
                className="w-full border-[1px] border-gray-300 rounded-lg p-[0.5rem] h-[100px] min-h-[100px] max-h-[300px] focus:ring-1 focus:ring-blue-600 focus:outline-none"
              ></textarea>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className=" font-[600] ">Add Project Part </h2>
                <button
                  type="button"
                  className="bg-primary flex gap-[0.5rem] items-center font-semibold px-[10px] py-[5px] text-light rounded-lg text-[14px] disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                  onClick={() => setNewProjectPart(true)}
                  disabled={newProjectPart}
                >
                  Add Part <PlusIcon svgColor={"#f0fbff"} size={"size-5"} />
                </button>
              </div>

              <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
                {projectPart?.map((part, index) => (
                  <div
                    key={part.part_name}
                    className="flex justify-between items-center border-[1px] border-gray-300 rounded-lg p-[0.5rem]"
                  >
                    <div>
                      <p className="font-[600]">{part.part_name}</p>

                      <div className="flex  justify-evenly flex-wrap gap-5 text-[14px] mt-[0.2rem]">
                        {Array.from(part.files).map((file, fileIndex) => (
                          <div
                            key={`${file.name}-${fileIndex}`}
                            className="flex gap-[0.5rem] items-center"
                          >
                            <Document />
                            <p className="font-[500]">{file.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="bg-deleteBackground rounded-lg px-[5px] py-[5px] text-light"
                      onClick={() =>
                        setProjectPart(
                          projectPart.filter((partDelete, i) => i !== index)
                        )
                      }
                    >
                      <TrashIcon />
                    </button>
                  </div>
                ))}
              </div>

              {newProjectPart && (
                <AddProjectPart
                  setNewProjectPart={setNewProjectPart}
                  setProjectPart={setProjectPart}
                  projectPart={projectPart}
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                />
              )}
            </div>
            <div className="flex gap-3 justify-end items-center">
              <button
                className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
                type="button"
                onClick={() => setAdminFlag(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary rounded-lg px-[30px] py-[10px] text-light disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={
                  newProjectPart ||
                  (estimationNotes === "" && projectPart.length === 0)
                }
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
      <CustomToastContainer />
    </div>
  );
};

export default AdminEstimation;
