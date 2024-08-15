import { Link } from "react-router-dom";
import { signup } from "../../assets/images";
import { EyeIcon, EyeSlash, Lock, Username } from "../../assets/icons/SvgIcons";
import { LoginSignupInput, Model } from "../../components";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginForm = (data) => {};
  return (
    <section className="bg-[#f1f1e6] h-full w-full">
      <figure className="w-full clip-custom">
        <img src={signup} alt="" className="object-fit" />
      </figure>
      <div className="main_container mx-auto">
        <div className="flex justify-center items-center h-screen ">
          <div className="flex flex-col py-[3rem] w-[40%] max-h-[80%]  bg-white justify-center items-center flex-shrink-0 rounded-lg shadow-lg">
            <div className="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
              <h2 className="text-[1rem] text-[#71a8c4] font-semibold text-center leading-[150%]">
                Join Us At
              </h2>
              <h1 className="text-[1.6rem] text-primary font-bold text-center leading-[150%]">
                Plastering Estimates & Insights
              </h1>
              <p className="font-[500] text-[12px] w-[75%] text-center leading-[150%]">
                Sign up to unlock comprehensive tools for tracking, analyzing,
                and optimizing your plastering projects with ease and precision
              </p>
            </div>
            <form onSubmit={handleSubmit(handleLoginForm)} className="w-[70%]">
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
                  regValue={Model.username.pattern.value}
                  message={Model.username.pattern.message}
                  required={Model.username.required}
                />
              </div>
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
                  regValue={Model.username.pattern.value}
                  message={Model.username.pattern.message}
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
                  regValue={Model.password.pattern.value}
                  message={Model.password.pattern.message}
                  required={Model.password.required}
                  handlePasswordToggle={handlePasswordToggle}
                  sufix={showPassword ? <EyeIcon /> : <EyeSlash />}
                />
              </div>
              <div className="mb-6">
                <label
                  for="password"
                  className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                >
                  Confirm Password
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
                  sufix={showPassword ? <EyeIcon /> : <EyeSlash />}
                />
              </div>
              <button
                type=" button"
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all ease-in-out duration-200"
              >
                Login
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
      </div>
    </section>
  );
};

export default Signup;
