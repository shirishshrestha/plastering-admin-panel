import { LoginSignupInput, Model } from "../../components";
import { EyeIcon, EyeSlash, Lock, Username } from "../../assets/icons/SvgIcons";
import { useForm } from "react-hook-form";

export const BusinessLogin = ({
  handleBusinessLoginForm,
  handlePasswordToggle,
  showPassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleBusinessLoginForm)} className="w-[70%]">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
        >
          Email/Username
        </label>

        <LoginSignupInput
          icon={<Username />}
          placeholder={"Enter username or email"}
          type={Model.username.type}
          name={"username"}
          register={register}
          errors={errors}
          minLength={Model.username.minLength.value}
          minMessage={Model.username.minLength.message}
          required={Model.username.required}
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
          name={"password"}
          register={register}
          errors={errors}
          minLength={Model.password.minLength.value}
          minMessage={Model.password.minLength.message}
          required={Model.password.required}
          handlePasswordToggle={handlePasswordToggle}
          sufix={
            showPassword ? <EyeIcon strokeColor={"#8BB4C8"} /> : <EyeSlash />
          }
        />
      </div>
      <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all ease-in-out duration-200">
        Business Login
      </button>
    </form>
  );
};
