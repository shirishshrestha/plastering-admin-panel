import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollRestoration = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (!search) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
};

export default useScrollRestoration;
