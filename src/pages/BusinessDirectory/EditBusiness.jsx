import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  editEstimator,
  getSingleEstimator,
} from "../../api/Business/BusinessApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Loader,
  LoginSignupInput,
  Model,
  CustomToastContainer,
} from "../../components";
import { useEffect } from "react";
import { notifyError, notifySuccess } from "../../components/Toast/Toast";

const EditBusiness = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: SingleEstimatorData,
    error,
    isPending: SingleEstimatorPending,
  } = useQuery({
    queryKey: ["singleEstimator", id],
    queryFn: () => getSingleEstimator(id),
    enabled: location.pathname.includes("editBusiness"),
  });

  const EditBusiness = useMutation({
    mutationFn: (data) => editEstimator(id, data),
    onSuccess: () => {
      notifySuccess("Business updated successfully");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
    onError: () => {
      notifyError("Primary Email, abn or username already exists");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    if (SingleEstimatorData) {
      reset({
        id: SingleEstimatorData?.estimator.id,
        business_name: SingleEstimatorData?.estimator.business_name,
        abn: SingleEstimatorData?.estimator.abn,
        trade_type: SingleEstimatorData?.estimator.trade_type,
        business_structure: SingleEstimatorData?.estimator.business_structure,
        fullname: SingleEstimatorData?.estimator.fullname,
        company_role: SingleEstimatorData?.estimator.company_role,
        email: SingleEstimatorData?.estimator.email,
        phone_number: SingleEstimatorData?.estimator.phone_number,
        address: SingleEstimatorData?.estimator.address,
        city: SingleEstimatorData?.estimator.city,
        state: SingleEstimatorData?.estimator.state,
        country: SingleEstimatorData?.estimator.country,
        postcode: SingleEstimatorData?.estimator.postcode,
        billing_name: SingleEstimatorData?.estimator.billing_name,
        billing_address: SingleEstimatorData?.estimator.billing_address,
        billing_email: SingleEstimatorData?.estimator.billing_email,
        estimator_name: SingleEstimatorData?.estimator.estimator_name,
        estimator_email: SingleEstimatorData?.estimator.estimator_email,
        estimator_number: SingleEstimatorData?.estimator.estimator_number,
        project_type: SingleEstimatorData?.estimator.project_type,
        scope: SingleEstimatorData?.estimator.scope,
        regions_covered: SingleEstimatorData?.estimator.regions_covered,
        username: SingleEstimatorData?.estimator.username,
      });
    }
  }, [SingleEstimatorData, reset]);

  return (
    <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
      {(SingleEstimatorPending || EditBusiness.isPending) && <Loader />}
      <div>
        <h2 className="font-bold text-[1.2rem]">
          Edit Business - {SingleEstimatorData?.estimator.business_name}
        </h2>
        <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
          <p>Business</p>
          <div className="rounded-[100%] w-[10px] h-[10px] bg-[#8c62ff]"></div>
          <p>Edit Business</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => EditBusiness.mutate(data))}
        className="mt-[0.8rem] px-4"
      >
        <div className="mb-4">
          <p className="font-bold ">1. Business Information:</p>
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
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
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
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
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
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
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
            <div>
              <label
                htmlFor="billing_name"
                className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
              >
                Billing Contact Name <span className="text-red-500 ">*</span>
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
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
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
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
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
          <p className="font-bold ">7. Login Credentials:</p>
          <div className="mt-2 grid grid-cols-business gap-x-4 gap-y-3">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-[0.5rem]"
              >
                Username <span className="text-red-500 ">*</span>
              </label>

              <LoginSignupInput
                placeholder={"Username"}
                type={Model.username.type}
                name={"username"}
                register={register}
                errors={errors}
                regValue={Model.username.pattern.value}
                message={Model.username.pattern.message}
                required={"Please enter username"}
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 flex gap-[0.5rem] justify-end pt-[0.6rem]  ">
          <button
            className="bg-delete rounded-lg px-[30px] py-[10px] text-light"
            onClick={() => navigate(-1)}
            type="button"
          >
            Cancel
          </button>
          <button
            className="bg-primary rounded-lg px-[30px] py-[10px] text-light disabled:bg-gray-400"
            disabled={!isDirty || EditBusiness.isPending}
          >
            Submit
          </button>
        </div>
      </form>
      <CustomToastContainer />
    </section>
  );
};

export default EditBusiness;
