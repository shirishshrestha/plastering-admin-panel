import { useGetBusinessDetails } from "../hooks/query/useGetBusinessDetails";
import ProfilePicture from "./ProfilePicture";

export const EstimatorProfileDetails = () => {
  const GetEstimatorDetails = useGetBusinessDetails();
  return (
    <div>
      <div className="flex gap-8 bg-white shadow-lg rounded-lg py-[1.5rem] px-[3rem]">
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
    </div>
  );
};
