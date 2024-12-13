import { createAxiosInstance } from "../../utils/Axios/Instance";

const instance = createAxiosInstance();

export const signupClient = async (data) => {
  try {
    const response = await instance.post("/register", {
      name: data.fullname,
      email: data.email,
      password: data.password,
      username: data.username,
      password_confirmation: data.retype_password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupBusiness = async (data) => {
  try {
    const response = await instance.post("/estimator/register", {
      business_name: data.business_name,
      abn: data.abn,
      trade_type: data.trade_type,
      business_structure: data.business_structure,
      fullname: data.fullname,
      company_role: data.company_role,
      email: data.email,
      phone_number: data.phone_number,
      address: data.address,
      city: data.city,
      state: data.state,
      country: data.country,
      postcode: data.postcode,
      billing_name: data.billing_name,
      billing_address: data.billing_address,
      billing_email: data.billing_email,
      estimator_name: data.estimator_name,
      estimator_email: data.estimator_email,
      estimator_number: data.estimator_number,
      project_type: data.project_type,
      scope: data.scope,
      regions_covered: data.regions_covered,
      username: data.username,
      password: data.password,
      password_confirmation: data.retype_password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
