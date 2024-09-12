import { useForm } from "react-hook-form";
import { Document, PlusIcon, TrashIcon } from "../../assets/icons/SvgIcons";
import { useState } from "react";
import AddProjectPart from "./AddProjectPart";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getEstimationNotes,
  postEstimatesNote,
} from "../../api/Projects/ProjectsApiSlice";

const AdminEstimation = ({ setAdminFlag, id }) => {
  const [newProjectPart, setNewProjectPart] = useState(false);
  const [estimationNotes, setEstimationNotes] = useState("");
  const [projectPart, setProjectPart] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    isPending,
    data: EstimationData,
    error,
  } = useQuery({
    queryKey: ["estimationData", id],
    queryFn: () => getEstimationNotes(id),
  });

  const { mutate: EstimationNotes, isPending: EstimationPending } = useMutation(
    {
      mutationFn: (data) => postEstimatesNote(data, projectPart, id),
      onSuccess: () => {},
    }
  );

  const handleEstimationSubmit = (data) => {
    EstimationNotes(data);
    console.log(data);
    console.log(projectPart);
  };

  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-10 bg-primary/80">
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
            {projectPart.length > 0 && (
              <div className="flex flex-col gap-[1rem] mt-[0.5rem]">
                {projectPart?.map((part, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-[1px] border-gray-300 rounded-lg p-[0.5rem]"
                  >
                    <div>
                      <p className="font-[600]">{part.project_part}</p>
                      <div className="flex justify-evenly flex-wrap gap-5 text-[14px] mt-[0.2rem]">
                        {Array.from(part.project_part_file).map(
                          (file, fileIndex) => (
                            <div className="flex gap-[0.5rem] items-center">
                              <Document />
                              <p key={fileIndex} className="font-[500]">
                                {file.name}
                              </p>
                            </div>
                          )
                        )}
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
            )}
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
    </div>
  );
};

export default AdminEstimation;
