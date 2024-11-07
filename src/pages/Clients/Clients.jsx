import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getClients } from "../../api/User/UserApiSlice";
import { Loader, Pagination } from "../../components";
import EmptyData from "../../components/EmptyData/EmptyData";
import { Link, useSearchParams } from "react-router-dom";
import { SearchInput } from "../../components/Input/SearchInput";
import { EditIcon, EyeIcon, TrashIcon } from "../../assets/icons/SvgIcons";

const Clients = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("Search") || "");
  }, [searchParams, searchParams]);

  const updatePageNumber = (newPageNumber) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set("page", newPageNumber);

    setSearchParams(updatedParams);
  };

  const {
    isPending: UserPending,
    error,
    data: UserData,
  } = useQuery({
    queryKey: ["clients", searchParams.get("page"), search],
    queryFn: () => getClients(searchParams.get("page"), search),
    enabled: location.pathname === "/clients",
    staleTime: 6000,
  });

  const tableHead = [
    "Id",
    "Client Name",
    "Username",
    "Email",
    "Registered Date",
    "Actions",
  ];

  return (
    <div className="mt-[.5rem] pb-[1rem]">
      {UserPending && <Loader />}
      <div className="flex items-center pb-[0.5rem] justify-between">
        <h2 className="font-bold text-[1.4rem] text-start">List of Clients</h2>
        <div className="flex gap-[1rem]">
          <SearchInput
            defaultValue={""}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            placeholder={"Search by name"}
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
          {UserPending ? (
            [...Array(5)].map((_, index) => (
              <tr key={index} className="h-[1.5rem]">
                {[...Array(5)].map((_, index) => (
                  <td key={index} className="py-[1.5rem] first:pl-[0.5rem]">
                    <span className="h-[8px] w-[80%]  rounded-sm bg-secondary block"></span>
                  </td>
                ))}
              </tr>
            ))
          ) : UserData?.data.length > 0 ? (
            UserData?.data
              .filter((user) => user.role === "client")
              .map((user) => (
                <tr key={user.id} className=" last:border-none  ">
                  <td className="py-[1rem] pl-[1rem] pr-[1rem]">{user.id}</td>
                  <td className="py-[1rem] pl-[0.5rem]">{user.name}</td>
                  <td className="py-[1rem] pl-[0.5rem]">{user.username} </td>
                  <td className="py-[1rem]">
                    {user.email
                      ? user.email.length > 25
                        ? `${user.email.slice(0, 25)}...`
                        : user.email
                      : "-"}
                  </td>
                  <td className="py-[1rem]">{user.created_at.split("T")[0]}</td>
                  <td>
                    <div className="flex gap-[0.7rem]">
                      <button className="p-[5px] rounded-md bg-viewBackground">
                        <EyeIcon strokeColor={"#3e84f4"} />
                      </button>
                      <button className="p-[5px] rounded-md bg-editBackground">
                        <EditIcon color="#8c62ff" />
                      </button>
                      <Link to="">
                        <button className="bg-[#649df9] flex gap-[0.5rem] text-[0.9rem] font-semibold px-[30px] py-[5px] text-light rounded-lg ">
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
          <Pagination
            nextClick={() => {
              const newPageNumber = pageNumber + 1;
              setPageNumber(newPageNumber);
              updatePageNumber(newPageNumber);
            }}
            prevClick={() => {
              const newPageNumber = pageNumber > 1 ? pageNumber - 1 : 1;
              setPageNumber(newPageNumber);
              updatePageNumber(newPageNumber);
            }}
            lastPage={UserData?.last_page}
            pageNumber={UserData?.current_page}
          />
        </div>
      )}
    </div>
  );
};

export default Clients;
