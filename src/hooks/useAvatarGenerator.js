import { getNameFromLocalStorage } from "../utils/Storage/StorageUtils";

export const useAvatarGenerator = () => {
  const userName = getNameFromLocalStorage();

  const userAvatar = () => {
    const parts = userName.split(" ");
    return (
      parts[0].charAt(0).toUpperCase() +
      parts[parts.length - 1].charAt(0).toUpperCase()
    );
  };

  return userAvatar;
};
