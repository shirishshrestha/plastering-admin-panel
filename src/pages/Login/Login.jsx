import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginBg, logo } from "../../assets/images";
import { EyeIcon, EyeSlash, Lock, Username } from "../../assets/icons/SvgIcons";
import { LoginSignupInput, Model } from "../../components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { notifyError } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/Login/LoginApiSlice";
import useAuth from "../../hooks/useAuth";
import {
  setIdToLocalStorage,
  setNameToLocalStorage,
  setRoleToLocalStorage,
  setTokenToLocalStorage,
} from "../../utils/Storage/StorageUtils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login = () => {
  const { setAuth } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.pathname || "/";

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

      navigate(from, { replace: true });
    },
    onError: () => {
      notifyError("Incorrect Username or Password");
    },
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginForm = (data) => {
    Login.mutate(data);
  };

  return (
    <section className="bg-[#f1f1e6] h-full w-full relative">
      {loginPending && (
        <div className="h-full w-full bg-primary/80 fixed z-10 top-0 left-0 flex items-center justify-center">
          <DotLottieReact
            autoplay
            loop
            src="https://lottie.host/60536e0b-45dc-4920-b2cc-712007c38ee2/k56mKpn4dv.lottie"
            style={{ height: "300px", width: "300px" }}
          />
        </div>
      )}
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
            <div className="flex flex-col py-[1rem] w-full justify-center items-center flex-shrink-0">
              <div className="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
                <h2 className="text-[1rem] text-[#71a8c4] font-semibold text-center leading-[150%]">
                  Welcome To
                </h2>
                <h1 className="text-[1.6rem] text-primary font-bold text-center leading-[150%]">
                  Plastering Estimates & Insights
                </h1>
                <p className="font-[500] text-[12px] w-[75%] text-center leading-[150%]">
                  Log in to seamlessly track & analyze every aspect of your
                  activities for enhanced eroductivity and ensight
                </p>
              </div>
              <form
                onSubmit={handleSubmit(handleLoginForm)}
                className="w-[70%]"
              >
                <div className="mb-4">
                  <label
                    for="password"
                    className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                  >
                    Username
                  </label>

                  <LoginSignupInput
                    icon={<Username />}
                    placeholder={Model.username.placeholder}
                    type={Model.username.type}
                    name={Model.username.name}
                    register={register}
                    errors={errors}
                    minLength={Model.username.minLength.value}
                    minMessage={Model.username.minLength.message}
                    required={Model.username.required}
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="password"
                    className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                  >
                    Password
                  </label>
                  <LoginSignupInput
                    icon={<Lock />}
                    placeholder={Model.password.placeholder}
                    type={showPassword ? "text" : Model.password.type}
                    name={Model.password.name}
                    register={register}
                    errors={errors}
                    minLength={Model.password.minLength.value}
                    minMessage={Model.password.minLength.message}
                    required={Model.password.required}
                    handlePasswordToggle={handlePasswordToggle}
                    sufix={
                      showPassword ? (
                        <EyeIcon strokeColor={"#8BB4C8"} />
                      ) : (
                        <EyeSlash />
                      )
                    }
                  />
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all ease-in-out duration-200">
                  Login
                </button>
                <div className="text-[12px] text-center mt-[0.5rem]">
                  <div className="">
                    Don't have an account?{" "}
                    <Link to="/signup">
                      {" "}
                      <span className="text-[#71a8c4]">Register</span>
                    </Link>
                  </div>
                </div>
                {/* <div className="w-full flex items-center justify-center">
                  <Link to="/" className="mt-[1rem]">
                    <div className=" px-[30px] py-[10px] bg-primary w-fit text-light rounded-lg">
                      <h2 className="">Go To Dashboard (demo)</h2>
                    </div>
                  </Link>
                </div> */}
              </form>
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
