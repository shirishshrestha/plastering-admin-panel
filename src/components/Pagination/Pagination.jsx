import React from "react";
import { ChevronLeft, ChevronRight } from "../../assets/icons/SvgIcons";
import { Link } from "react-router-dom";

export const Pagination = ({ nextClick, prevClick, pageNumber, lastPage }) => {
 
  return (
    <>
      <div className="flex gap-[1rem] items-center">
        <Link to={`?page=${pageNumber - 1}`}>
          <button
            className="bg-primary py-[10px] px-[15px] shadow-lg rounded-lg flex text-light items-center disabled:bg-gray-300 disabled:text-gray-400"
            onClick={prevClick}
            disabled={pageNumber === 1}
          >
            <ChevronLeft size="size-5" /> Prev
          </button>
        </Link>
        <div>
          <span className="text-primary font-semibold">{pageNumber} of </span>
          <span className="text-primary font-semibold">{lastPage}</span>
        </div>
        <Link to={`?page=${pageNumber + 1}`}>
          <button
            className="bg-primary  py-[10px] px-[15px] shadow-lg rounded-lg text-light flex items-center justify-center disabled:bg-gray-300 disabled:text-gray-400"
            onClick={nextClick}
            disabled={pageNumber === lastPage}
          >
            Next <ChevronRight size="size-5" />
          </button>
        </Link>
      </div>
    </>
  );
};
