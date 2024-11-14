import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getClients } from "../../api/User/UserApiSlice";
import { EmptyData, Loader, Pagination } from "../../components";
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
  const { searchName, setSearchName } = useAuth();

  const currentPage = useMemo(
    () => parseInt(searchParams.get("page") || "1", 10),
    [searchParams]
  );

  const {
    isPending: UserPending,
    error,
    data: UserData,
  } = useQuery({
    queryKey: ["clients", currentPage, searchName],
    queryFn: () => getClients(currentPage, searchName),
    enabled: location.pathname === "/clients",
    staleTime: 6000,
  });

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

  const processedUserData = useMemo(() => {
    if (!UserData) return [];
    return UserData.data;
  }, [UserData]);

  if (location.pathname !== "/clients") {
    return <Outlet />;
  }

  return (
    <div className="mt-[.5rem] pb-[1rem]">
      {UserPending && <Loader />}
      <div className="flex items-center pb-[0.5rem] justify-between">
        <h2 className="font-bold text-[1.4rem] text-start">List of Clients</h2>
        <div className="flex gap-[1rem]">
          <SearchInput
            defaultValue={searchName}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            placeholder={"Search by name"}
            setSearchName={setSearchName}
          />
        </div>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden ">
        <thead className="bg-primary text-white  ">
          {tableHead.map((item, index) => (
            <th
              key={index}
              className="py-[1rem] font-semibold text-start first:pl-[1rem]"
            >
              {item}
            </th>
          ))}
        </thead>
        <tbody className="">
          {processedUserData.length > 0 ? (
            processedUserData
              .filter((user) => user.role === "client")
              .map((user) => (
                <tr key={user.id} className=" last:border-none  ">
                  <td className="py-[1rem] pl-[1rem] pr-[1rem]">{user.id}</td>
                  <td className="py-[1rem] pl-[0.5rem]">
                    {" "}
                    {user.name && user.name.length > 20 ? (
                      <Tooltip content={user.name}>
                        {`${user.name.slice(0, 20)}...`}
                      </Tooltip>
                    ) : (
                      user.name || "-"
                    )}
                  </td>
                  <td className="py-[1rem] pl-[0.5rem]">{user.username} </td>
                  <td className="py-[1rem]">
                    {user.email && user.email.length > 25 ? (
                      <Tooltip content={user.email}>
                        {`${user.email.slice(0, 25)}...`}
                      </Tooltip>
                    ) : (
                      user.email || "-"
                    )}
                  </td>
                  <td className="py-[1rem]">{user.created_at.split("T")[0]}</td>
                  <td>
                    <div className="flex gap-[0.7rem]">
                      <button
                        className="p-[5px] rounded-md bg-editBackground"
                        onClick={() =>
                          navigate(`editClient/${user.id}`, {
                            state: { page: currentPage, search: searchName },
                          })
                        }
                      >
                        <EditIcon color="#8c62ff" />
                      </button>
                      <Link to="">
                        <button className="bg-[#649df9] flex gap-[0.5rem] text-[0.9rem] font-semibold px-[20px] py-[5px] text-light rounded-lg ">
                          Project Details
                        </button>
                      </Link>
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
