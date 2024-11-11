import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getSingleEstimator } from "../../api/Business/BusinessApiSlice";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../components";
import { GoBack } from "../../assets/icons/SvgIcons";

const ViewBusiness = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: SingleEstimatorData,
    error,
    isPending: SingleEstimatorPending,
  } = useQuery({
    queryKey: ["singleEstimator", id],
    queryFn: () => getSingleEstimator(id),
    enabled: location.pathname.includes("viewBusiness"),
  });

  return (
    <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
      {SingleEstimatorPending && <Loader />}
      <div className="mb-[0.5rem] text-[12px] font-[500]">
        <div
          className="flex w-fit items-center gap-[0.2rem] text-[14px] cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          <GoBack />
          Go Back
        </div>
      </div>
      <div>
        <h2 className="font-bold text-[1.2rem]">
          View Business - {SingleEstimatorData?.estimator.business_name}
        </h2>
        <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
          <p>View</p>
          <div className="rounded-[100%] w-[10px] h-[10px] bg-view"></div>
          <p>Business Directory</p>
        </div>
      </div>
      <div className="mt-[0.8rem]">
        <div className="mb-4 p-4 border-[2px] border-gray-200 rounded-lg">
          <p className="font-bold text-[17px]">1. Business Information:</p>
          <div className="mt-2 flex justify-evenly flex-wrap gap-x-4 gap-y-3">
            <div>
              <p className="text-[15px] font-[600]">
                Business Name:{" "}
                <span className="font-[500]">
                  {" "}
                  {SingleEstimatorData?.estimator.business_name}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[700]">
                ABN / ACN:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.abn}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Trade Type:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.trade_type}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Business Structure:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.business_structure}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 p-4 border-[2px] border-gray-200 rounded-lg">
          <p className="font-bold text-[17px]">
            2. Primary Contact Information:
          </p>
          <div className="mt-2 flex justify-evenly flex-wrap gap-x-4 gap-y-3">
            <div>
              <p className="text-[15px] font-[600]">
                Name:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.fullname}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Role / Position:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.company_role}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Email:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.email}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Phone Number:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.phone_number}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 p-4 border-[2px] border-gray-200 rounded-lg">
          <p className="font-bold text-[17px]">3. Business Address:</p>
          <div className="mt-2 flex justify-evenly flex-wrap gap-x-4 gap-y-3">
            <div>
              <p className="text-[15px] font-[600]">
                Street Address:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.address}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                City / Suburb:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.city}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                State:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.state}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Country:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.country}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 p-4 border-[2px] border-gray-200 rounded-lg">
          <p className="font-bold text-[17px]">4. Billing Information:</p>
          <div className="mt-2 flex justify-evenly flex-wrap gap-x-4 gap-y-3">
            <div>
              <p className="text-[15px] font-[600]">
                Billing Contact Name:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.billing_name}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Address:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.billing_address}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Billing Email:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.billing_email}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Postcode:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.postcode}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 p-4 border-[2px] border-gray-200 rounded-lg">
          <p className="font-bold text-[17px]">5. Estimating Information:</p>
          <div className="mt-2 flex justify-evenly flex-wrap gap-x-4 gap-y-3">
            <div>
              <p className="text-[15px] font-[600]">
                Estimator Name:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.estimator_name}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Estimator Email:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.estimate_email}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Estimator Phone Number:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.estimator_number}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4 p-4 border-[2px] border-gray-200 rounded-lg">
          <p className="font-bold text-[17px]">6. Project Preferences:</p>
          <div className="mt-2 flex justify-evenly flex-wrap gap-x-4 gap-y-3">
            <div>
              <p className="text-[15px] font-[600]">
                Project Type:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.project_type}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Scope or Specialisation:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.scope}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[15px] font-[600]">
                Regions Covered:{" "}
                <span className="font-[500] ">
                  {" "}
                  {SingleEstimatorData?.estimator.regions_covered}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewBusiness;
