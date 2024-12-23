import { Loader } from "../../../components";
import { useGetBusinessDetails } from "../hooks/query/useGetBusinessDetails";
import ProfilePicture from "./ProfilePicture";

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col gap-[0.4rem]">
    <p className="font-[600] text-primary/80">{label}</p>
    <p className="font-bold">{value || "-"}</p>
  </div>
);

const Section = ({ title, rows }) => (
  <div className="flex flex-col gap-4 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem] mt-[1.5rem]">
    <h4 className="font-bold text-[1.2rem] leading-[1.6rem] pb-[1rem] border-b-[2px] border-gray-200">
      {title}
    </h4>
    <div className="grid grid-cols-3 gap-6">
      {rows.map((row, index) => (
        <InfoRow key={index} label={row.label} value={row.value} />
      ))}
    </div>
  </div>
);

export const EstimatorProfileDetails = () => {
  const GetEstimatorDetails = useGetBusinessDetails();

  if (GetEstimatorDetails.isPending) return <Loader />;
  if (GetEstimatorDetails.error)
    return <p className="text-red-500">Failed to load estimator details.</p>;

  const estimator = GetEstimatorDetails?.data?.estimator || {};

  return (
    <div>
      <div className="flex gap-8 bg-white shadow-md rounded-lg py-[1.5rem] px-[3rem]">
        <ProfilePicture />
        <div className="flex flex-col gap-1 justify-center">
          <h4 className="font-bold text-[1.2rem] leading-[1.6rem]">
            {estimator.business_name || "-"}
          </h4>
          <p className="text-[14px] text-primary font-[500] leading-[1.6rem]">
            {estimator.email || "-"}
          </p>
          <p className="text-[14px] text-primary font-[500] capitalize leading-[1.6rem]">
            Estimator
          </p>
        </div>
      </div>

      <Section
        title="Business Details"
        rows={[
          { label: "Business Name", value: estimator.business_name },
          { label: "ABN / ACN", value: estimator.abn },
          { label: "Trade Type", value: estimator.trade_type },
          { label: "Business Structure", value: estimator.business_structure },
        ]}
      />

      <Section
        title="Primary Information"
        rows={[
          { label: "Name", value: estimator.fullname },
          { label: "Role / Position", value: estimator.company_role },
          { label: "Email", value: estimator.email },
          { label: "Phone Number", value: estimator.phone_number },
        ]}
      />

      <Section
        title="Business Address"
        rows={[
          { label: "Street Address", value: estimator.address },
          { label: "City / Suburb", value: estimator.city },
          { label: "State", value: estimator.state },
          { label: "Country", value: estimator.country },
        ]}
      />

      <Section
        title="Billing Information"
        rows={[
          { label: "Billing Contact Name", value: estimator.billing_name },
          { label: "Address", value: estimator.billing_address },
          { label: "Billing Email", value: estimator.billing_email },
          { label: "Postcode", value: estimator.postcode },
        ]}
      />

      <Section
        title="Estimating Information"
        rows={[
          {
            label: "Estimator Name",
            value: estimator.estimator_name,
          },
          {
            label: "Estimator Email",
            value: estimator.estimator_email,
          },
          {
            label: "Estimator Phone Number",
            value: estimator.estimator_number,
          },
        ]}
      />

      <Section
        title="Project Preferences"
        rows={[
          {
            label: "Project Type",
            value: estimator.project_type,
          },
          {
            label: "Scope or Specialisation",
            value: estimator.scope,
          },
          { label: "Regions Covered", value: estimator.regions_covered },
        ]}
      />
    </div>
  );
};
