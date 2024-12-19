import { EditIcon } from "../../../assets/icons/SvgIcons";
import { Loader } from "../../../components";
import { getRoleFromLocalStorage } from "../../../utils/Storage/StorageUtils";
import { useGetUserDetails } from "../hooks/query/useGetUserDetails";
import ProfilePicture from "./ProfilePicture";

export const UserProfileDetails = () => {
  const role = getRoleFromLocalStorage();
  const GetUserDetails = useGetUserDetails();

  return (
    <div>
      {GetUserDetails.isLoading && <Loader />}
      <div className="flex gap-8 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem]">
        <ProfilePicture />
        <div className="flex flex-col gap-1 justify-center">
          <h4 className="font-bold text-[1.2rem] leading-[1.6rem] ">
            {GetUserDetails?.data?.name}
          </h4>
          <p className="text-[14px] text-primary font-[500] leading-[1.6rem]">
            {GetUserDetails?.data?.email}
          </p>
          <p className="text-[14px] text-primary font-[500] capitalize leading-[1.6rem]">
            {role}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
          Personal Details
        </h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Full Name</p>
            <p className="font-bold">{GetUserDetails?.data?.name}</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Email</p>
            <p className="font-bold">{GetUserDetails?.data?.email}</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Username</p>
            <p className="font-bold">{GetUserDetails?.data?.username}</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Registered Date</p>
            <p className="font-bold">
              {GetUserDetails?.data?.created_at.split("T")[0]}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
        <div className="pb-[1rem] border-b-[2px] border-gray-200 flex items-center justify-between">
          <h4 className="font-bold text-[1.2rem] leading-[1.6rem]  ">
            Address Details
          </h4>
          <div className="flex items-center gap-2 bg-primary text-light cursor-pointer py-1 px-4 rounded-lg text-[14px] font-[500] ">
            <EditIcon color="#fff" />
            Edit Details
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">City</p>
            <p className="font-bold">-</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">State</p>
            <p className="font-bold">-</p>
          </div>
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Country</p>
            <p className="font-bold">-</p>
          </div>
          {/* <div></div> */}
          <div className="flex flex-col gap-[0.4rem]">
            <p className="font-[600] text-primary/80">Post Code</p>
            <p className="font-bold">-</p>
          </div>
        </div>
      </div>
    </div>
  );
};
