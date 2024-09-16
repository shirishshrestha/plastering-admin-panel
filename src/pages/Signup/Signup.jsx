import { Link, useNavigate } from "react-router-dom";
import { signup, logo } from "../../assets/images";
import {
  Email,
  EyeIcon,
  EyeSlash,
  Lock,
  Username,
} from "../../assets/icons/SvgIcons";
import { Loader, LoginSignupInput, Model } from "../../components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signupClient } from "../../api/Register/RegisterApiSlice";
import { useMutation } from "@tanstack/react-query";
import CustomToastContainer from "../../components/Toast/ToastContainer";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import useScrollRestoration from "../../hooks/useScrollRestoration";

const Signup = () => {
  useScrollRestoration();

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { mutate: Register, isPending: signupPending } = useMutation({
    mutationFn: (formData) => signupClient(formData),
    onSuccess: () => {
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        retype_password: "",
      });
      notifySuccess("Registered Successfully");
      setTimeout(() => {
        reset();
        navigate("/login");
      }, 2000);
    },
    onError: (error) => {
      if (error.response.data.errors.email) {
        notifyError(error.response.data.errors.email[0]);
      }
      if (error.response.data.errors.username) {
        notifyError(error.response.data.errors.username[0]);
      }
    },
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const handleRetypePasswordToggle = () => {
    setShowRetypePassword(!showRetypePassword);
  };

  const handleSignupForm = (data) => {
    Register(data);
  };
  return (
    <section className="bg-[#f1f1e6] h-fit w-full pb-[0.5rem] relative">
      {signupPending && <Loader />}

      <div className="!pb-[4rem]">
        <figure className="w-full clip-custom relative overflow-hidden">
          <div className="absolute h-full w-full bg-primary/80 flex items-center justify-center "></div>
          <img src={signup} alt="" className="object-fit" />
        </figure>
      </div>
      <div className="main_container !mt-[-22rem] mx-auto relative z-10">
        <div className="flex flex-col justify-center items-center  gap-[1rem]">
          <figure className="flex flex-col gap-[0.3rem] items-center ">
            <img src={logo} alt="logo" className="h-[80px] w-[80px] " />
            <figcaption>
              <h2 className="text-[1.4rem] text-[#f1f1e6] font-bold text-center leading-[150%]">
                Plastering Estimates & Insights
              </h2>
            </figcaption>
          </figure>
          <div className="flex flex-col py-[2rem] w-[40%]   bg-white justify-center items-center flex-shrink-0 rounded-lg shadow-lg">
            <div className="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
              <h1 className="text-[1.6rem] text-primary font-bold text-center leading-[150%]">
                Create New Account
              </h1>
              <p className="font-[500] text-[12px] w-[75%] text-center leading-[150%]"></p>
            </div>
            <form onSubmit={handleSubmit(handleSignupForm)} className="w-[80%]">
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                >
                  Full Name
                </label>

                <LoginSignupInput
                  icon={<Username />}
                  placeholder={Model.Name.placeholder}
                  type={Model.Name.type}
                  name={Model.Name.name}
                  register={register}
                  errors={errors}
                  minLength={Model.Name.minLength.value}
                  minMessage={Model.Name.minLength.message}
                  regValue={Model.Name.pattern.value}
                  message={Model.Name.pattern.message}
                  required={Model.Name.required}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
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
                  regValue={Model.username.pattern.value}
                  message={Model.username.pattern.message}
                  required={Model.username.required}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                >
                  Email
                </label>

                <LoginSignupInput
                  icon={<Email />}
                  placeholder={Model.email.placeholder}
                  type={Model.email.type}
                  name={Model.email.name}
                  register={register}
                  errors={errors}
                  minLength={Model.email.minLength.value}
                  minMessage={Model.email.minLength.message}
                  regValue={Model.email.pattern.value}
                  message={Model.email.pattern.message}
                  required={Model.email.required}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
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
                  regValue={Model.password.pattern.value}
                  message={Model.password.pattern.message}
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
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                >
                  Confirm Password
                </label>
                <div
                  className={`border px-2 py-2 border-gray-300 shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px] ${
                    errors["retype_password"]
                      ? "focus-within:ring-red-500 focus-within:border-red-500 border-red-500"
                      : ""
                  }`}
                >
                  <Lock />
                  <input
                    type={showRetypePassword ? "text" : "password"}
                    name="retype_password"
                    placeholder="Retype Password"
                    autoComplete="off"
                    className={`block w-full rounded-md focus:outline-none
                      `}
                    {...register("retype_password", {
                      required: "Please retype your password",
                      validate: (value) =>
                        value === watch("password") ||
                        "Retyped password does not match the  password.",
                    })}
                  />
                  <button type="button" onClick={handleRetypePasswordToggle}>
                    {showRetypePassword ? (
                      <EyeIcon strokeColor={"#8BB4C8"} />
                    ) : (
                      <EyeSlash />
                    )}
                  </button>
                </div>
                {errors["retype_password"] && (
                  <p
                    className="text-[12px] text-red-500 pt-[0.3rem] pl-[0.5rem]"
                    key="retype-password"
                  >
                    Retyped password does not match the original password.
                  </p>
                )}
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all ease-in-out duration-200">
                Signup
              </button>
              <div className="text-[12px] text-center mt-[0.5rem]">
                <Link to="" className="">
                  Already have an account?{" "}
                  <Link to="/login">
                    {" "}
                    <span className="text-[#71a8c4]">Log In</span>
                  </Link>
                </Link>
              </div>
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
      <CustomToastContainer />
    </section>
  );
};

export default Signup;
