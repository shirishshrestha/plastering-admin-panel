import { Search } from "../../assets/icons/SvgIcons";
import { Form, useSearchParams, useSubmit } from "react-router-dom";
import { debounce } from "../../utils/Debounce/debounce";

export const SearchInput = ({ placeholder }) => {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();

  const debounceSubmit = debounce((form) => submit(form), 500);

  const handleSubmit = (event) => debounceSubmit(event.currentTarget);

  return (
    <Form
      method="get"
      onChange={handleSubmit}
      className={`border px-2 py-2 border-[#FF5733] shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px]  `}
    >
      <Search />
      <input
        type="search"
        name="search"
        defaultValue={searchParams.get("search") || ""}
        autoComplete="off"
        placeholder={placeholder}
        className={`focus:border-transparent  w-full focus:outline-none bg-transparent !ring-0 !outline-none border-none p-0 text-[0.8rem]`}
      />
    </Form>
  );
};
