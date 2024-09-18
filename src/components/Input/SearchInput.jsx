import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchInput = ({
  defaultValue,
  setSearchParams,
  searchParams,
  pageNumber,
  setPageNumber,
}) => {
  const [inputValue, setInputValue] = useState(
    searchParams.get("Search") || defaultValue.trim()
  );
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(inputValue);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setPageNumber(page);
  }, [searchParams, setPageNumber]);

  useEffect(() => {
    if (debouncedSearch === "") {
      setSearchParams({
        page: pageNumber,
        Search: debouncedSearch,
      });
    } else {
      setSearchParams({
        page: 1,
        Search: debouncedSearch,
      });
      setPageNumber(1);
    }
  }, [debouncedSearch]);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  return (
    <div className=" ">
      <input
        name="Search"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search by id or status"
        className={`p-2 text-[14px] border border-[#FF5733] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent ${
          !!error ? "focus:ring-red-500 border-red-500" : ""
        } `}
        type="text"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
