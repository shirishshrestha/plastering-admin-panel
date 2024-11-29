import { useState } from "react";
import { useAvatarGenerator } from "../../../hooks/useAvatarGenerator";
import { profile } from "../../../assets/images";

const ProfilePicture = () => {
  const userAvatar = useAvatarGenerator();
  const [userImage, setUserImage] = useState(false);

  return (
    <div className="flex items-center ">
      <div className="w-[130px] h-[130px] bg-secondary rounded-full flex justify-center items-center overflow-hidden">
        {userImage ? (
          <img
            src={profile}
            alt="profile"
            className="w-[100%] h-[100%] rounded-full object-cover"
          />
        ) : (
          <div className="w-[100%] h-[100%] rounded-full flex justify-center items-center bg-primary text-light font-semibold">
            {userAvatar()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
