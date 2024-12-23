import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { EditIcon, EyeIcon, TrashIcon } from "../../assets/icons/SvgIcons";
import {
  EmptyData,
  Loader,
  CustomToastContainer,
  SearchInput,
  FilterDrawer,
} from "../../components";
import {
  deleteEstimator,
  getEstimators,
} from "../../api/Business/BusinessApiSlice";
import { notifySuccess } from "../../components/Toast/Toast";
import { useState } from "react";
import { DeleteConfirmation } from "../../components/DeleteConfirmationBox/DeleteConfirmationBox";
import { queryClient } from "../../utils/Query/Query";
import { Tooltip } from "flowbite-react";
import { useToggle } from "../../hooks/useToggle";
import useAuth from "../../hooks/useAuth";

const tableHead = [
  "Id",
  "Business Name",
  "Username",
  "Email",
  "Registered Date",
  "Actions",
];

const BusinessDirectory = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { openDrawer } = useAuth();

  const [estimatorName, setEstimatorName] = useState("");
  const [estimatorId, setEstimatorId] = useState();
  const [deleteConfirationShow, handleDeleteToggle] = useToggle();

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: EstimatorData,
    error,
    isPending: EstimatorPending,
  } = useQuery({
    queryKey: ["estimators"],
    queryFn: () => getEstimators(),
    staleTime: 6000,
    enabled: location.pathname === "/business",
  });

  const DeleteEstimator = useMutation({
    mutationFn: (id) => deleteEstimator(id),
    onSuccess: () => {
      handleDeleteToggle();
      queryClient.invalidateQueries("estimators");
      notifySuccess("Business deleted successfully");
    },
  });

  const handleProceedClick = () => {
    // DeleteEstimator.mutate(projectId);
    console.log("clicked");
  };

  return (
    <>
      {location.pathname === "/business" ? (
        <section className="mt-[.5rem] pb-[1rem]">
          {EstimatorPending && <Loader />}
          {deleteConfirationShow && (
            <DeleteConfirmation
              deleteName={estimatorName}
              handleDeleteToggle={handleDeleteToggle}
              handleProceedClick={handleProceedClick}
              deleteLoading={DeleteEstimator.isPending}
            />
          )}
          <FilterDrawer
            setSearchParams={setSearchParams}
            dateName={"registered date"}
          >
            <FilterDrawer.RegisteredDate />
          </FilterDrawer>
          <div className="mb-[1rem] flex items-center justify-between">
            <h2 className="font-bold text-[1.4rem] text-start">
              List of Businesses
            </h2>
            <div className="flex gap-[1rem] items-end">
              <SearchInput
                setSearchParams={setSearchParams}
                placeholder={"Search"}
              />
              <button
                className="bg-highlight/10 rounded-lg text-highlight text-[14px] py-[0.3rem] px-[0.8rem] border border-highlight focus:outline-none h-fit"
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
              {EstimatorData?.data.length > 0 ? (
                EstimatorData?.data.map((estimator) => (
                  <tr key={estimator.id} className=" last:border-none  ">
                    <td className="py-[1rem] pl-[1rem] pr-[1rem]">
                      {estimator.id}
                    </td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {" "}
                      {estimator.business_name &&
                      estimator.business_name.length > 20 ? (
                        <Tooltip
                          className="max-w-[300px]"
                          content={estimator.business_name}
                        >
                          {`${estimator.business_name.slice(0, 20)}...`}
                        </Tooltip>
                      ) : (
                        estimator.business_name || "-"
                      )}
                    </td>
                    <td className="py-[1rem] pl-[0.5rem]">
                      {estimator.username}{" "}
                    </td>
                    <td className="py-[1rem]">
                      {estimator.email && estimator.email.length > 25 ? (
                        <Tooltip
                          className="max-w-[300px]"
                          content={estimator.email}
                        >
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
                        <button
                          className="p-[5px] rounded-md bg-viewBackground"
                          onClick={() =>
                            navigate(`/business/viewBusiness/${estimator.id}`)
                          }
                        >
                          <EyeIcon strokeColor="#3e84f4" />
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-editBackground"
                          onClick={() =>
                            navigate(`/business/editBusiness/${estimator.id}`)
                          }
                        >
                          <EditIcon color="#8c62ff" />
                        </button>
                        <button
                          className="p-[5px] rounded-md bg-deleteBackground"
                          onClick={() => {
                            handleDeleteToggle();
                            setEstimatorName(estimator.business_name);
                            setEstimatorId(estimator.id);
                          }}
                        >
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
          <CustomToastContainer />
        </section>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default BusinessDirectory;
