import { Link, useNavigate } from "react-router-dom";
import { signup, logo } from "../../assets/images";
import {
  Loader,
  LoginSignupInput,
  Model,
  CustomToastContainer,
} from "../../components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signupBusiness } from "../../api/Register/RegisterApiSlice";
import { useMutation } from "@tanstack/react-query";

import { notifyError, notifySuccess } from "../../components/Toast/Toast";
import useScrollRestoration from "../../hooks/useScrollRestoration";
import { EyeIcon, EyeSlash } from "../../assets/icons/SvgIcons";
import { ErrorMessage } from "@hookform/error-message";

const BusinessSignup = () => {
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

  const { mutate: BusinessRegister, isPending: signupBusinessPending } =
    useMutation({
      mutationFn: (formData) => signupBusiness(formData),
      onSuccess: () => {
        reset({
          business_name: "",
          abn: "",
          trade_type: "",
          business_structure: "",
          fullname: "",
          company_role: "",
          email: "",
          phone_number: "",
          address: "",
          city: "",
          state: "",
          country: "",
          postcode: "",
          billing_name: "",
          billing_address: "",
          billing_email: "",
          estimator_name: "",
          estimator_email: "",
          estimator_number: "",
          project_type: "",
          scope: "",
          regions_covered: "",
          username: "",
          password: "",
          password_confirmation: "",
        });
        notifySuccess("Business Registered Successfully");
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

  const handleBusinessSignupForm = (data) => {
    BusinessRegister(data);
  };
  return (
    <section className="bg-[#f1f1e6] h-fit w-full pb-[0.5rem] relative">
      {signupBusinessPending && <Loader />}

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
          <div className="flex flex-col py-[2rem] w-[80%]   bg-white justify-center items-center flex-shrink-0 rounded-lg shadow-lg">
            <div className="mb-[1rem] flex flex-col items-center gap-[0.3rem]">
              <h1 className="text-[1.6rem] text-primary font-bold text-center leading-[150%]">
                Create New Business Account
              </h1>
              <p className="font-[500] text-[12px] w-[75%] text-center leading-[150%]"></p>
            </div>
            <form
              onSubmit={handleSubmit(handleBusinessSignupForm)}
              className="w-[80%]"
            >
              <div className="mb-4">
                <p className="font-bold ">1. Business Information:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="business_name"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem] "
                    >
                      Business Name <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={Model.BusinessName.placeholder}
                      type={Model.BusinessName.type}
                      name={Model.BusinessName.name}
                      register={register}
                      errors={errors}
                      minLength={Model.BusinessName.minLength.value}
                      minMessage={Model.BusinessName.minLength.message}
                      maxLength={Model.BusinessName.maxLength.value}
                      maxMessage={Model.BusinessName.maxLength.message}
                      regValue={Model.BusinessName.pattern.value}
                      message={Model.BusinessName.pattern.message}
                      required={Model.BusinessName.required}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="abn"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      ABN / ACN <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={Model.ACN.placeholder}
                      type={Model.ACN.type}
                      name={Model.ACN.name}
                      register={register}
                      errors={errors}
                      minLength={Model.ACN.minLength.value}
                      minMessage={Model.ACN.minLength.message}
                      maxLength={Model.ACN.maxLength.value}
                      maxMessage={Model.ACN.maxLength.message}
                      regValue={Model.ACN.pattern.value}
                      message={Model.ACN.pattern.message}
                      required={Model.ACN.required}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="trade_type"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Trade Type <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={Model.TradeType.placeholder}
                      type={Model.TradeType.type}
                      name={Model.TradeType.name}
                      register={register}
                      errors={errors}
                      minLength={Model.TradeType.minLength.value}
                      minMessage={Model.TradeType.minLength.message}
                      maxLength={Model.TradeType.maxLength.value}
                      maxMessage={Model.TradeType.maxLength.message}
                      regValue={Model.TradeType.pattern.value}
                      message={Model.TradeType.pattern.message}
                      required={Model.TradeType.required}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="business_structure"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Business Structure
                    </label>
                    <LoginSignupInput
                      placeholder={Model.BusinessStructure.placeholder}
                      type={Model.BusinessStructure.type}
                      name={Model.BusinessStructure.name}
                      register={register}
                      errors={errors}
                      minLength={Model.BusinessStructure.minLength.value}
                      minMessage={Model.BusinessStructure.minLength.message}
                      maxLength={Model.BusinessStructure.maxLength.value}
                      maxMessage={Model.BusinessStructure.maxLength.message}
                      regValue={Model.BusinessStructure.pattern.value}
                      message={Model.BusinessStructure.pattern.message}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="font-bold ">2. Primary Contact Information:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Name <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={Model.Name.placeholder}
                      type={Model.Name.type}
                      name={Model.Name.name}
                      register={register}
                      errors={errors}
                      minLength={Model.Name.minLength.value}
                      minMessage={Model.Name.minLength.message}
                      maxLength={Model.Name.maxLength.value}
                      maxMessage={Model.Name.maxLength.message}
                      regValue={Model.Name.pattern.value}
                      message={Model.Name.pattern.message}
                      required={Model.Name.required}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company_role"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Role / Position
                    </label>
                    <LoginSignupInput
                      placeholder={"Enter role / position"}
                      type={Model.Name.type}
                      name={"company_role"}
                      register={register}
                      errors={errors}
                      minLength={Model.Name.minLength.value}
                      minMessage={"Role must be at least 2 characters"}
                      maxLength={Model.Name.maxLength.value}
                      maxMessage={"Role must be at most 64 characters"}
                      regValue={Model.Name.pattern.value}
                      message={
                        "Invalid role. Role must contain only alphabetic characters"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Email <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={Model.email.placeholder}
                      type={Model.email.type}
                      name={Model.email.name}
                      register={register}
                      errors={errors}
                      minLength={Model.email.minLength.value}
                      minMessage={Model.email.minLength.message}
                      maxLength={Model.email.maxLength.value}
                      maxMessage={Model.email.maxLength.message}
                      regValue={Model.email.pattern.value}
                      message={Model.email.pattern.message}
                      required={Model.email.required}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone_number"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Phone Number <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={Model.phoneNumber.placeholder}
                      type={Model.phoneNumber.type}
                      name={Model.phoneNumber.name}
                      register={register}
                      errors={errors}
                      minLength={Model.phoneNumber.minLength.value}
                      minMessage={Model.phoneNumber.minLength.message}
                      maxLength={Model.phoneNumber.maxLength.value}
                      maxMessage={Model.phoneNumber.maxLength.message}
                      regValue={Model.phoneNumber.pattern.value}
                      message={Model.phoneNumber.pattern.message}
                      required={Model.phoneNumber.required}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold ">3. Business Address:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Street Address <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter street address"}
                      type={Model.address.type}
                      name={Model.address.name}
                      register={register}
                      errors={errors}
                      regValue={Model.address.pattern.value}
                      message={Model.address.pattern.message}
                      required={"Please enter street address"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      City / Suburb <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={"Enter city / suburb"}
                      type={Model.Name.type}
                      name={"city"}
                      register={register}
                      errors={errors}
                      minLength={Model.Name.minLength.value}
                      minMessage={"City / Suburb must be at least 2 characters"}
                      maxLength={Model.Name.maxLength.value}
                      maxMessage={"City / Suburb must be at most 64 characters"}
                      regValue={Model.Name.pattern.value}
                      message={
                        "Invalid city / suburb. City / Suburb must contain only alphabetic characters"
                      }
                      required={"Please enter city / suburb"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      State <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter state"}
                      type={Model.address.type}
                      name={"state"}
                      register={register}
                      errors={errors}
                      regValue={"^[a-zA-Z ]+$"}
                      message={
                        "Invalid state. State must contain only alphabetic characters"
                      }
                      required={"Please enter street address"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Country <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={"Enter country"}
                      type={Model.address.type}
                      name={"country"}
                      register={register}
                      errors={errors}
                      regValue={"^[a-zA-Z ]+$"}
                      message={
                        "Invalid country name. Country name must contain only alphabetic characters"
                      }
                      required={"Please enter country"}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold ">4. Billing Information:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="billing_name"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Billing Contact Name{" "}
                      <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter billing contact name"}
                      type={Model.Name.type}
                      name={"billing_name"}
                      register={register}
                      errors={errors}
                      regValue={Model.Name.pattern.value}
                      message={
                        "Invalid contact name. Contact Name must contain only alphabetic characters"
                      }
                      required={"Please enter billing contact name"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billing_address"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Address <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={"Enter address"}
                      type={Model.Name.type}
                      name={"billing_address"}
                      register={register}
                      errors={errors}
                      regValue={Model.address.pattern.value}
                      message={Model.address.pattern.message}
                      required={"Please enter billing address"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="billing_email"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Billing Email <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter billing email"}
                      type={Model.email.type}
                      name={"billing_email"}
                      register={register}
                      errors={errors}
                      regValue={Model.email.pattern.value}
                      message={Model.email.pattern.message}
                      required={Model.email.required}
                      minLength={Model.email.minLength.value}
                      minMessage={Model.email.minLength.message}
                      maxLength={Model.email.maxLength.value}
                      maxMessage={Model.email.maxLength.message}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="postcode"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Postcode <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter postcode"}
                      type={Model.Name.type}
                      name={"postcode"}
                      register={register}
                      errors={errors}
                      regValue={Model.projectName.pattern.value}
                      message={
                        "Invalid postcode. Must contain alphanumeric characters only"
                      }
                      required={"Please enter postcode"}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold ">5. Estimating Information:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="estimator_name"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Estimator Name <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter estimator name"}
                      type={Model.Name.type}
                      name={"estimator_name"}
                      register={register}
                      errors={errors}
                      regValue={Model.Name.pattern.value}
                      message={
                        "Invalid estimator name. Must contain only alphabetic characters"
                      }
                      required={"Please enter estimator name"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="estimate_email"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Estimator Email <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
                      placeholder={"Enter estimator email"}
                      type={Model.email.type}
                      name={"estimator_email"}
                      register={register}
                      errors={errors}
                      regValue={Model.email.pattern.value}
                      message={Model.email.pattern.message}
                      required={"Please enter estimator email"}
                      minLength={Model.email.minLength.value}
                      minMessage={Model.email.minLength.message}
                      maxLength={Model.email.maxLength.value}
                      maxMessage={Model.email.maxLength.message}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="estimator_number"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Estimator Phone Number
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter estimator phone number"}
                      type={Model.phoneNumber.type}
                      name={"estimator_number"}
                      register={register}
                      errors={errors}
                      regValue={Model.phoneNumber.pattern.value}
                      message={Model.phoneNumber.pattern.message}
                      minLength={Model.phoneNumber.minLength.value}
                      minMessage={Model.phoneNumber.minLength.message}
                      maxLength={Model.phoneNumber.maxLength.value}
                      maxMessage={Model.phoneNumber.maxLength.message}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold ">6. Project Preferences:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="project_type"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Project Type <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
                      placeholder={"Residential / Commercial"}
                      type={Model.Name.type}
                      name={"project_type"}
                      register={register}
                      errors={errors}
                      regValue={Model.Name.pattern.value}
                      message={
                        "Invalid project type. Must contain only alphabetic characters"
                      }
                      required={"Please enter project type"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="scope"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Scope or Specialisation
                    </label>
                    <LoginSignupInput
                      placeholder={"Enter scope or specialisation"}
                      type={Model.Name.type}
                      name={"scope"}
                      register={register}
                      errors={errors}
                      regValue={Model.Name.pattern.value}
                      message={
                        "Invalid scope. Must contain only alphabetic characters"
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="regions_covered"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Regions Covered
                    </label>

                    <LoginSignupInput
                      placeholder={"Enter regions covered"}
                      type={Model.Name.type}
                      name={"regions_covered"}
                      register={register}
                      errors={errors}
                      regValue={Model.Name.pattern.value}
                      message={"Alphabetic characters only"}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-bold ">7. Login and Account Details:</p>
                <div className="mt-2 grid grid-cols-custom gap-x-4 gap-y-3">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Username <span className="text-red-500 ">*</span>
                    </label>

                    <LoginSignupInput
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
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Password <span className="text-red-500 ">*</span>
                    </label>
                    <LoginSignupInput
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
                  <div>
                    <label
                      htmlFor="retype_password"
                      className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
                    >
                      Confirm Password <span className="text-red-500 ">*</span>
                    </label>
                    <div
                      className={`border px-2 py-2 border-gray-300 shadow-sm rounded-md focus-within:ring-indigo-500 transition-all duration-75 ease-in-out focus-within:border-indigo-500 flex gap-3 items-center text-[14px] ${
                        errors["retype_password"]
                          ? "focus-within:ring-red-500 focus-within:border-red-500 border-red-500"
                          : ""
                      }`}
                    >
                      <input
                        type={showRetypePassword ? "text" : "password"}
                        name="retype_password"
                        placeholder="Retype Password"
                        autoComplete="off"
                        className={`block w-full rounded-md focus:outline-none !ring-0 p-0 text-[0.8rem] border-none
                      `}
                        {...register("retype_password", {
                          required: "Please retype your password",
                          validate: (value) =>
                            value === watch("password") ||
                            "Retyped password does not match the  password.",
                        })}
                      />
                      <button
                        type="button"
                        onClick={handleRetypePasswordToggle}
                      >
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
                </div>
              </div>

              <div className="mb-[0.5rem]">
                <div className="flex items-center gap-[0.5rem] justify-start  ">
                  <input
                    type="checkbox"
                    name="terms"
                    {...register("terms", {
                      required: true,
                    })}
                    className="cursor-pointer !ring-0 !outline-none p-0  rounded-sm text-[0.8rem] text-primary"
                  />
                  <label
                    htmlFor="terms-conditions"
                    className={`font-semibold text-[14px] text-secondary ${
                      errors["terms"] ? "text-delete  " : ""
                    } `}
                  >
                    Terms & Conditions
                  </label>
                </div>
                <ErrorMessage
                  errors={errors}
                  name="terms"
                  render={() => (
                    <p
                      className="text-[12px] text-red-500  pt-[0.1rem]  pl-[0.5rem] text-start"
                      key="terms"
                    >
                      You must agree to the terms and conditions before
                      proceeding.
                    </p>
                  )}
                />
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition-all ease-in-out duration-200 mt-3">
                Signup Business Account
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

export default BusinessSignup;
