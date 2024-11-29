import { Link, useNavigate } from "react-router-dom";
import { loginBg, logo } from "../../assets/images";
import { CustomToastContainer, Loader } from "../../components";
import { useState } from "react";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import { useMutation } from "@tanstack/react-query";
import { businessLogin, login } from "../../api/Login/LoginApiSlice";
import useAuth from "../../hooks/useAuth";
import {
  setIdToLocalStorage,
  setNameToLocalStorage,
  setRoleToLocalStorage,
  setTokenToLocalStorage,
} from "../../utils/Storage/StorageUtils";
import { UserLogin } from "./UserLogin";
import { BusinessLogin } from "./BusinessLogin";

const Login = () => {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginFlag, setLoginFlag] = useState("user");

  const navigate = useNavigate();

  const { mutate: Login, isPending: loginPending } = useMutation({
    mutationFn: (formData) => login(formData),
    onSuccess: (data) => {
      setTokenToLocalStorage(data.access_token);
      setRoleToLocalStorage(data.user.role);
      setNameToLocalStorage(data.user.name);
      setIdToLocalStorage(data.user.id);

      const role = data.user.role;
      const id = data.user.id;
      const token = data.access_token;
      const userName = data.user.name;
      setAuth({ role, id, token, userName });
    },
    onError: () => {
      notifyError(
        "Invalid email, username, password, or attempt to log in with business account"
      );
    },
  });

  const { mutate: BusinessLoginReq, isPending: loginBusinessPending } =
    useMutation({
      mutationFn: (formData) => businessLogin(formData),
      onSuccess: (data) => {
        setTokenToLocalStorage(data.token);
        setRoleToLocalStorage(data.estimator.role);
        setNameToLocalStorage(data.estimator.business_name);
        setIdToLocalStorage(data.estimator.id);

        const role = data.estimator.role;
        const id = data.estimator.id;
        const token = data.token;
        const businessName = data.estimator.business_name;
        setAuth({ role, id, token, businessName });
      },
      onError: () => {
        notifyError(
          "Invalid email, username, password, or attempt to log in with client account"
        );
      },
    });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginForm = (data) => {
    Login(data);
  };

  const handleBusinessLoginForm = (data) => {
    BusinessLoginReq(data);
  };

  return (
    <section className="bg-[#f1f1e6] h-full w-full relative">
      {(loginPending || loginBusinessPending) && <Loader />}
      <div className="main_container mx-auto">
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="w-[70%] grid grid-cols-[0.8fr,1fr] rounded-2xl overflow-hidden shadow-xl bg-white">
            <div className="w-full">
              <figure className="relative h-full">
                <div className="w-full h-full px-[2rem] flex items-center justify-center absolute top-0 left-0 bg-primary/70">
                  <figure className="flex flex-col items-center gap-[0.5rem]">
                    <img src={logo} alt="logo" className="h-[50px]" />
                    <figcaption>
                      <h2 className="text-[1.4rem] text-[#f1f1e6] font-bold text-center leading-[150%]">
                        Plastering Estimates & Insights
                      </h2>
                      <p className="font-[500] text-[#f1f1e6] text-center text-[14px] mt-2 leading-[150%]">
                        Our expertise lies in wall and ceiling lining, and we
                        offer thorough plastering estimates for both residential
                        and commercial projects.
                      </p>
                    </figcaption>
                  </figure>
                </div>
                <img src={loginBg} alt="" className="h-full object-cover" />
              </figure>
            </div>
            <div className="flex py-[1rem] w-full justify-center items-center flex-shrink-0">
              <div className="flex flex-col  w-full justify-center items-center flex-shrink-0">
                <div className="flex items-center justify-center gap-2 text-[0.8rem] font-semibold text-white mb-4">
                  <div
                    className={`py-2 px-10 rounded-md cursor-pointer ${
                      loginFlag === "user"
                        ? "bg-primary  "
                        : "bg-gray-100 text-primary/70"
                    }`}
                    onClick={() => setLoginFlag("user")}
                  >
                    <p>User / Admin Login</p>
                  </div>
                  <div
                    className={`py-2 px-10 rounded-md cursor-pointer ${
                      loginFlag === "business"
                        ? "bg-primary  "
                        : "bg-gray-100 text-primary/70"
                    }`}
                    onClick={() => setLoginFlag("business")}
                  >
                    <p>Business Login</p>
                  </div>
                </div>
                {loginFlag === "user" ? (
                  <>
                    <div className="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
                      <h2 className="text-[1rem] text-[#71a8c4] font-semibold text-center leading-[150%]">
                        Welcome To
                      </h2>
                      <h1 className="text-[1.6rem] text-primary font-bold text-center leading-[150%]">
                        Plastering Estimates & Insights
                      </h1>
                      <p className="font-[500] text-[12px] w-[75%] text-center leading-[150%]">
                        Log in to seamlessly track & analyze every aspect of
                        your activities for enhanced productivity and ensight
                      </p>
                    </div>
                    <UserLogin
                      handleLoginForm={handleLoginForm}
                      handlePasswordToggle={handlePasswordToggle}
                      showPassword={showPassword}
                    />
                  </>
                ) : (
                  <>
                    <div className="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
                      <h2 className="text-[1rem] text-[#71a8c4] font-semibold text-center leading-[150%]">
                        Welcome ! Login to manage your business
                      </h2>
                      <h1 className="text-[1.6rem] text-primary font-bold text-center leading-[150%]">
                        Plastering Estimates & Insights
                      </h1>
                      <p className="font-[500] text-[12px] w-[75%] text-center leading-[150%]">
                        Log in to manage, track, and analyze your business
                        operations
                      </p>
                    </div>
                    <BusinessLogin
                      handleBusinessLoginForm={handleBusinessLoginForm}
                      showPassword={showPassword}
                      handlePasswordToggle={handlePasswordToggle}
                    />
                  </>
                )}
                <div className="text-[12px] text-center mt-[0.5rem]">
                  <div className="">
                    Don't have an account?{" "}
                    <Link to="/signup">
                      {" "}
                      <span className="text-[#71a8c4]">Register</span>
                    </Link>
                  </div>
                  <div>or</div>
                  <div>
                    <p>
                      Are you a business owner?{" "}
                      <Link to="/businessSignup">
                        <span className="text-[#71a8c4]">
                          {" "}
                          Create a Business Account
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-[12px] text-center mt-[2rem] text-primary">
            <p>
              Please contact the admin at{" "}
              <a
                href="mailto:admin@plasteringestimatesandinsights.com"
                target="_blank"
                className="text-secondary"
              >
                admin@plasteringestimatesandinsights.com
              </a>{" "}
              for help.
            </p>
          </div>
        </div>
      </div>

      <CustomToastContainer />
    </section>
  );
};

export default Login;
