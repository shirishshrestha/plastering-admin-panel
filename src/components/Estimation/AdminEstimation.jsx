import { useForm } from "react-hook-form";
import { PlusIcon, Xmark } from "../../assets/icons/SvgIcons";
import { useState } from "react";
import AddProjectPart from "./AddProjectPart";

const AdminEstimation = ({ setAdminFlag }) => {
  const [newProjectPart, setNewProjectPart] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEstimationSubmit = (data) => {
    console.log("hello");
  };

  return (
    <div className="h-full w-full flex items-center justify-center fixed top-0 left-0 z-10 bg-primary/80">
      <div className="w-[70%] bg-light rounded-lg shadow-lg relative py-[1rem] px-[2rem]">
        <div
          className="absolute top-[0.8rem] right-[1rem] w-fit cursor-pointer"
          onClick={() => setAdminFlag(false)}
        >
          <Xmark />
        </div>
        <h2 className="text-center font-bold text-[1.2rem]">
          Upload Estimation Files
        </h2>
        <form
          className="mt-[1rem] flex flex-col gap-[1rem]"
          onSubmit={handleSubmit(handleEstimationSubmit)}
        >
          <div className="flex flex-col gap-[0.2rem]">
            <label htmlFor="estimator_notes" className="font-[600] ">
              Estimation Notes
            </label>
            <textarea
              name="estimator_notes"
              {...register("estimator_note", {})}
              type="text"
              className="w-full border-[1px] border-gray-300 rounded-lg p-[0.5rem] h-[100px] min-h-[100px] max-h-[300px] focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
            {newProjectPart && (
              <AddProjectPart setNewProjectPart={setNewProjectPart} />
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
            <button className="bg-primary rounded-lg px-[30px] py-[10px] text-light ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEstimation;
