import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EditInput, Loader, Model } from "../../components";
import { useForm } from "react-hook-form";
import { editClient, getUserById } from "../../api/User/UserApiSlice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { notifySuccess } from "../../components/Toast/Toast";
import CustomToastContainer from "../../components/Toast/ToastContainer";

export const EditClient = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isPending: SingleUserPending,
    error,
    data: SingleUser,
  } = useQuery({
    queryKey: ["singleClient"],
    queryFn: () => getUserById(id),
    enabled: location.pathname.includes("editClient"),
    staleTime: 6000,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    if (SingleUser) {
      reset({
        fullname: SingleUser.name,
        username: SingleUser.username,
        email: SingleUser.email,
      });
    }
  }, [SingleUser, reset]);

  const EditClient = useMutation({
    mutationFn: (data) => editClient(id, data),
    onSuccess: () => {
      notifySuccess("Client updated successfully");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    },
  });

  return (
    <section className="bg-white shadow-lg rounded-lg p-[1.5rem]">
      {(SingleUserPending || EditClient.isPending) && <Loader />}
      <div>
        <h2 className="font-bold text-[1.2rem]">
          Edit Client - {SingleUser?.name}
        </h2>
        <div className="flex gap-[0.5rem] items-center text-[14px] font-[500] pt-[0.2rem]">
          <p>Client</p>
          <div className="rounded-[100%] w-[10px] h-[10px] bg-[#8c62ff]"></div>
          <p>Edit Client</p>
        </div>
      </div>
      <div className="mt-[1rem]">
        <form
          onSubmit={handleSubmit((data) => EditClient.mutate(data))}
          className="grid grid-cols-2 gap-[1.5rem] gap-y-[1rem]"
        >
          <div className="flex flex-col gap-[0.4rem]">
            <label className="font-bold">Client Name</label>
            <EditInput
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
          <div className="flex flex-col gap-[0.4rem]">
            <label className="font-bold">Username</label>
            <EditInput
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
          <div className="flex flex-col gap-[0.4rem]">
            <label className="font-bold">Email</label>
            <EditInput
              placeholder={Model.email.placeholder}
              type={Model.email.type}
              name={Model.email.name}
              register={register}
              errors={errors}
              required={Model.email.required}
            />
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
              disabled={!isDirty}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <CustomToastContainer />
    </section>
  );
};
