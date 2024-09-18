import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

export const SearchInput = ({
  defaultValue,
  setSearchParams,
  searchParams,
  setPageNumber,
}) => {
  const [inputValue, setInputValue] = useState(
    searchParams.get("Search") || defaultValue.trim()
  );
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(inputValue);

  useEffect(() => {
    if (!error) {
      setSearchParams({
        page: 1,
        Search: debouncedSearch,
      });
      setPageNumber(1);
    }
  }, [debouncedSearch, error]);

  const handleChange = (e) => {
    const value = e.target.value.trimStart();
    // if (/^\d*$/.test(value)) {
    setInputValue(value);
    setError(null);
    // } else {
    //   setError("Please enter numbers only.");
    // }
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