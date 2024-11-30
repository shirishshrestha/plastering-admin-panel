import { Loader } from "../../components";
import {
  getNameFromLocalStorage,
  getRoleFromLocalStorage,
} from "../../utils/Storage/StorageUtils";
import { EstimatorProfileDetails } from "./components/EstimatorProfileDetails";
import ProfilePicture from "./components/ProfilePicture";
import { UserProfileDetails } from "./components/UserProfileDetails";
const ProfilePage = () => {
  const role = getRoleFromLocalStorage();

  return (
    <section className=" py-[1.5rem]">
      <div className="mb-6 grid grid-cols-[0.4fr,2.2fr] gap-2 items-center">
        <h4 className="font-bold text-[1.4rem]">Profile Overview</h4>
        <div className="h-[1.5px] w-full bg-gray-200 rounded-xl"></div>
      </div>
      {role === "estimator" ? (
        <EstimatorProfileDetails />
      ) : (
        <UserProfileDetails />
      )}
    </section>
  );
};

export default ProfilePage;
