import { useGetBusinessDetails } from "../hooks/query/useGetBusinessDetails";
import ProfilePicture from "./ProfilePicture";

export const EstimatorProfileDetails = () => {
  const GetEstimatorDetails = useGetBusinessDetails();
  return (
    <div>
      <div className="flex gap-8 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem]">
        <ProfilePicture />
        <div className="flex flex-col gap-1 justify-center">
          <h4 className="font-bold text-[1.2rem] leading-[1.6rem] ">
            {GetEstimatorDetails?.data?.estimator?.business_name}
          </h4>
          <p className="text-[14px] text-primary font-[500] leading-[1.6rem]">
            {GetEstimatorDetails?.data?.estimator?.email}
          </p>
          <p className="text-[14px] text-primary font-[500] capitalize leading-[1.6rem]">
            Estimator
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Business Details
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Business Name</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.business_name}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">ABN / ACN</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.abn}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Trade Type</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.business_structure || "-"}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Business Structure</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.role}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Primary Information
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Name</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.fullname}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Role / Position</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.company_role || "-"}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Email</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.email}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Phone Number</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.phone_number}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Business Address
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Street Address </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.address}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">City / Suburb </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.city}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">State </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.state}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Country </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.country}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Billing Information
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Billing Contact Name</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.billing_name}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Address </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.billing_address}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Billing Email </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.billing_email}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Postcode </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.postcode}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Estimating Information
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Estimator Name</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.estimator_name}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Estimator Email </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.estimator_email}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Estimator Phone Number</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.estimator_number}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Project Preferences
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Project Type</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.project_type}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">
              Scope or Specialisation
            </p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.scope}
            </p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Regions Covered</p>
            <p className="font-bold">
              {GetEstimatorDetails?.data?.estimator?.regions_covered}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
