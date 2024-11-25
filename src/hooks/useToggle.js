import { useCallback, useState } from "react";

export const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return [toggle, handleToggle];
};
