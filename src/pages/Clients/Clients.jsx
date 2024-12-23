import { useMemo } from "react";
import { FilterDrawer, EmptyData, Loader, Pagination } from "../../components";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SearchInput } from "../../components/Input/SearchInput";
import { EditIcon } from "../../assets/icons/SvgIcons";
import { Tooltip } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import { useGetAllClients } from "./hooks/query/useGetAllClients";

const tableHead = [
  "Id",
  "Client Name",
  "Username",
  "Email",
  "Registered Date",
  "Actions",
];

const Clients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const searchItem = useMemo(
    () => searchParams.get("search") || "",
    [searchParams]
  );

  const registeredDate = useMemo(
    () => searchParams.get("date") || "",
    [searchParams]
  );

  const { data: UserData, isPending: UserPending } = useGetAllClients(
    "clients",
    currentPage,
    searchItem,
    registeredDate
  );

  const { openDrawer } = useAuth();

  const paginationProps = useMemo(
    () => ({
      pageNumber: currentPage,
      lastPage: UserData?.last_page || 1,
      nextClick: () => updatePageNumber(currentPage + 1),
      prevClick: () => updatePageNumber(currentPage - 1),
    }),
    [currentPage, UserData]
  );

  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPageNumber.toString());
    setSearchParams(updatedParams);
  };

  if (location.pathname !== "/clients") {
    return <Outlet />;
  }

  return (
    <div className="mt-[.5rem] pb-[1rem]">
      {UserPending && <Loader />}
      <FilterDrawer
        setSearchParams={setSearchParams}
        dateName={"registered date"}
      >
        <FilterDrawer.RegisteredDate />
      </FilterDrawer>
      <div className="flex items-center pb-[0.5rem] justify-between">
        <h2 className="font-bold text-[1.4rem] text-start">List of Clients</h2>
        <div className="flex gap-[1rem] items-end">
          <SearchInput
            setSearchParams={setSearchParams}
            placeholder={"Search by name"}
          />
          <button
            className="bg-highlight/10 rounded-lg text-highlight text-[14px] py-[0.3rem] px-[0.8rem] border border-highlight focus:outline-none"
            onClick={openDrawer}
          >
            Filter
          </button>
        </div>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden ">
        <thead className="bg-primary text-white  ">
          <tr>
            {tableHead.map((item, index) => (
              <th
                key={index}
                className="py-[1rem] font-semibold text-start first:pl-[1rem]"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {UserData?.clients?.data?.length > 0 ? (
            UserData?.clients?.data?.map((user) => (
              <tr key={user.id} className=" last:border-none  ">
                <td className="py-[1rem] pl-[1rem] pr-[1rem]">{user.id}</td>
                <td className="py-[1rem] pl-[0.5rem]">
                  {user.name && user.name.length > 20 ? (
                    <Tooltip className="max-w-[300px]" content={user.name}>
                      {`${user.name.slice(0, 20)}...`}
                    </Tooltip>
                  ) : (
                    user.name || "-"
                  )}
                </td>
                <td className="py-[1rem] pl-[0.5rem]">{user.username} </td>
                <td className="py-[1rem]">
                  {user.email && user.email.length > 25 ? (
                    <Tooltip className="max-w-[300px]" content={user.email}>
                      {`${user.email.slice(0, 25)}...`}
                    </Tooltip>
                  ) : (
                    user.email || "-"
                  )}
                </td>
                <td className="py-[1rem]">{user.created_at.split(" ")[0]}</td>
                <td>
                  <div className="flex gap-[0.7rem]">
                    <button
                      className="p-[5px] rounded-md bg-editBackground"
                      onClick={() =>
                        navigate(`editClient/${user.id}`, {
                          state: {
                            page: currentPage,
                            searchItem: searchItem,
                          },
                        })
                      }
                    >
                      <EditIcon color="#8c62ff" />
                    </button>
                    <button
                      className="bg-[#649df9] flex gap-[0.5rem] text-[0.9rem] font-semibold px-[20px] py-[5px] text-light rounded-lg "
                      onClick={() =>
                        navigate(`/projectbooks/projects/${user.id}`)
                      }
                    >
                      Project Details
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <EmptyData />
          )}
        </tbody>
      </table>
      {UserData?.last_page > 1 && (
        <div className="mt-[1rem] flex items-center justify-end">
          <Pagination {...paginationProps} />
        </div>
      )}
    </div>
  );
};

export default Clients;
