import { Search } from "../../assets/icons/SvgIcons";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../utils/Debounce/debounce";

export const SearchInput = ({ placeholder, setSearchParams }) => {
  const [searchParams] = useSearchParams();

  const debounceSubmit = debounce((value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  }, 500);

  const handleChange = (event) => debounceSubmit(event.target.value);

  return (
    <form
      className={`border px-2 py-2 border-[#FF5733] shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px] w-[270px] `}
    >
      <Search />
      <input
        type="search"
        name="search"
        defaultValue={searchParams.get("search") || ""}
        autoComplete="off"
        placeholder={placeholder}
        onChange={handleChange}
        className={`focus:border-transparent  w-full focus:outline-none bg-transparent !ring-0 !outline-none border-none p-0 text-[0.8rem]`}
      />
    </form>
  );
};
