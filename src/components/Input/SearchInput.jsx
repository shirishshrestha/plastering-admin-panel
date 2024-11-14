import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Search } from "../../assets/icons/SvgIcons";

export const SearchInput = ({
  defaultValue,
  setSearchParams,
  searchParams,
  placeholder,
  setSearchName,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const debouncedSearch = useDebounce(inputValue);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams);
    const currentSearch = currentParams.get("search") || "";

    const updatedParams = new URLSearchParams();
    for (const [key, value] of currentParams.entries()) {
      if (key !== "search" && key !== "page") {
        updatedParams.set(key, value);
      }
    }

    if (debouncedSearch !== currentSearch) {
      updatedParams.set("search", debouncedSearch);
      updatedParams.set("page", "1");
    } else if (currentParams.has("page")) {
      updatedParams.set("search", currentSearch);
      updatedParams.set("page", currentParams.get("page"));
    }
    setSearchParams(updatedParams);
    setSearchName(debouncedSearch);
  }, [debouncedSearch]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className={`border px-2 py-2 border-[#FF5733] shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px]  `}
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
    </div>
  );
};
