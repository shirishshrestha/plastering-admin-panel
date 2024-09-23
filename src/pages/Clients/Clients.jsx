import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsers } from "../../api/User/UserApiSlice";
import { Loader } from "../../components";
import EmptyData from "../../components/EmptyData/EmptyData";

const Clients = () => {
  const {
    isPending: UserPending,
    error,
    data: UserData,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getUsers(),
    enabled: location.pathname === "/clients",
    staleTime: 6000,
  });

  const tableHead = [
    "Id",
    "Client Name",
    "Username",
    "Email",
    "Registered Date",
  ];

  console.log(UserData);

  return (
    <div className="mt-[.5rem] pb-[1rem]">
      {UserPending && <Loader />}
      <div className="flex items-center pb-[0.5rem] justify-between">
        <h2 className="font-bold text-[1.4rem] text-start">List of Clients</h2>
        {/* <div className="flex gap-[1rem]">
          <SearchInput
            defaultValue={""}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div> */}
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
                  <td className="py-[1rem]">{user.email}</td>
                  <td className="py-[1rem]">{user.created_at.split("T")[0]}</td>
                </tr>
              ))
          ) : (
            <EmptyData />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
