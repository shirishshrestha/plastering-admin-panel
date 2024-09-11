import React from "react";
import { ChevronLeft, ChevronRight } from "../../assets/icons/SvgIcons";

export const Pagination = ({ nextClick, prevClick, pageNumber, lastPage }) => {
  return (
    <>
      <div className="flex gap-[1rem]">
        <button
          className="bg-primary py-[10px] px-[15px] shadow-lg rounded-lg flex text-light items-center disabled:bg-gray-300 disabled:text-gray-400"
          onClick={prevClick}
          disabled={pageNumber === 1}
        >
          <ChevronLeft size="size-5" /> Prev
        </button>
        {/* <div className="flex gap-[1rem] ">
          <button className="p-[1rem] bg-white rounded shadow-lg font-semibold leading-0">
            1
          </button>
          <button className="p-[1rem] bg-white rounded shadow-lg font-semibold">
            2
          </button>
          <button className="p-[1rem] bg-white rounded shadow-lg font-semibold ">
            3
          </button>
        </div> */}
        <button
          className="bg-primary  py-[10px] px-[15px] shadow-lg rounded-lg text-light flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-400"
          onClick={nextClick}
          disabled={pageNumber === lastPage}
        >
          Next <ChevronRight size="size-5" />
        </button>
      </div>
    </>
  );
};
