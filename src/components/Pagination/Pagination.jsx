import React from "react";
import { ChevronLeft, ChevronRight } from "../../assets/icons/SvgIcons";

export const Pagination = () => {
  return (
    <>
      <div className="flex gap-[1rem]">
        <button className="bg-primary p-[1rem] shadow-lg rounded-lg">
          <ChevronLeft size="size-5" />
        </button>
        <div className="flex gap-[1rem] ">
          <button className="p-[1rem] bg-white rounded shadow-lg font-semibold leading-0">
            1
          </button>
          <button className="p-[1rem] bg-white rounded shadow-lg font-semibold">
            2
          </button>
          <button className="p-[1rem] bg-white rounded shadow-lg font-semibold ">
            3
          </button>
        </div>
        <button className="bg-primary p-[1rem] shadow-lg rounded-lg">
          <ChevronRight size="size-5" />
        </button>
      </div>
    </>
  );
};
