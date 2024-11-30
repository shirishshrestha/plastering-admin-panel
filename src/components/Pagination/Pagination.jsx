import { ChevronLeft, ChevronRight } from "../../assets/icons/SvgIcons";

const Pagination = ({ nextClick, prevClick, pageNumber, lastPage }) => {
  return (
    <div className="flex gap-[1rem] items-center">
      <button
        type="button"
        className="bg-primary py-[10px] px-[15px] shadow-lg rounded-lg flex text-light items-center disabled:bg-gray-300 disabled:text-gray-400"
        onClick={prevClick}
        disabled={pageNumber === 1}
      >
        <ChevronLeft size="size-5" /> Prev
      </button>
      <div>
        <span className="text-primary font-semibold">{pageNumber}</span> /{" "}
        {lastPage}
      </div>
      <button
        type="button"
        className="bg-primary py-[10px] px-[15px] shadow-lg rounded-lg flex text-light items-center disabled:bg-gray-300 disabled:text-gray-400"
        onClick={nextClick}
        disabled={pageNumber === lastPage}
      >
        Next <ChevronRight size="size-5" />
      </button>
    </div>
  );
};

export default Pagination;
