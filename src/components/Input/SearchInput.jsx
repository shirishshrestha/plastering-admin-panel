import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Search } from "../../assets/icons/SvgIcons";

export const SearchInput = ({
  defaultValue,
  setSearchParams,
  searchParams,
  pageNumber,
  setPageNumber,
  placeholder,
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
    <div
      className={`border px-2 py-2 border-[#FF5733] shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px]  ${
        !!error ? "focus:ring-red-500 border-red-500" : ""
      } `}
    >
      <Search />
      <input
        name="Search"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
        placeholder={placeholder}
        className={`focus:border-transparent  w-full focus:outline-none bg-transparent !ring-0 !outline-none border-none p-0 text-[0.8rem]`}
        type="text"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
