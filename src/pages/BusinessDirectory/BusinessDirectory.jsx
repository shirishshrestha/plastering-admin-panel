import { useQuery } from "@tanstack/react-query";
import { getClients } from "../../api/User/UserApiSlice";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tooltip } from "chart.js";
import { EditIcon, EyeIcon, TrashIcon } from "../../assets/icons/SvgIcons";
import EmptyData from "../../components/EmptyData/EmptyData";
import { Loader } from "../../components";
import { getEstimators } from "../../api/Business/BusinessApiSlice";

const BusinessDirectory = () => {
  const {
    data: EstimatorData,
    error,
    isPending: EstimatorPending,
  } = useQuery({
    queryKey: ["estimators"],
    queryFn: () => getEstimators(),
    staleTime: 6000,
  });

  const tableHead = [
    "Id",
    "Business Name",
    "Username",
    "Email",
    "Registered Date",
    "Actions",
  ];
  return (
    <section className="mt-[.5rem] pb-[1rem]">
      {EstimatorPending && <Loader />}

      <div className="mb-2">
        <h2 class="font-bold text-[1.4rem] text-start">List of Businesses</h2>
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
          {EstimatorData?.estimators.length > 0 ? (
            EstimatorData?.estimators.map((estimator) => (
              <tr key={estimator.id} className=" last:border-none  ">
                <td className="py-[1rem] pl-[1rem] pr-[1rem]">
                  {estimator.id}
                </td>
                <td className="py-[1rem] pl-[0.5rem]">
                  {" "}
                  {estimator.business_name &&
                  estimator.business_name.length > 20 ? (
                    <Tooltip content={estimator.business_name}>
                      {`${estimator.business_name.slice(0, 20)}...`}
                    </Tooltip>
                  ) : (
                    estimator.business_name || "-"
                  )}
                </td>
                <td className="py-[1rem] pl-[0.5rem]">{estimator.username} </td>
                <td className="py-[1rem]">
                  {estimator.email && estimator.email.length > 25 ? (
                    <Tooltip content={estimator.email}>
                      {`${estimator.email.slice(0, 25)}...`}
                    </Tooltip>
                  ) : (
                    estimator.email || "-"
                  )}
                </td>
                <td className="py-[1rem]">
                  {estimator.created_at.split("T")[0]}
                </td>
                <td>
                  <div className="flex gap-[0.7rem]">
                    <button className="p-[5px] rounded-md bg-viewBackground">
                      <EyeIcon strokeColor="#3e84f4" />
                    </button>
                    <button className="p-[5px] rounded-md bg-editBackground">
                      <EditIcon color="#8c62ff" />
                    </button>
                    <button className="p-[5px] rounded-md bg-deleteBackground">
                      <TrashIcon />
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
    </section>
  );
};

export default BusinessDirectory;
