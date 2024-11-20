import { Button, Drawer, Label, Select, Textarea } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { createContext, useContext } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useSearchParams } from "react-router-dom";

const DrawerContext = createContext();
const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};

export function FilterDrawer({ children, setSearchParams }) {
  const { isOpen, closeDrawer } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const FilterSubmit = (data) => {
    let updatedParams = {};
    if (data.status) {
      updatedParams["status"] = data.status;
    }
    if (data.date) {
      updatedParams["date"] = data.date;
    }

    setSearchParams(updatedParams);
  };

  return (
    <>
      <DrawerContext.Provider value={{ register, errors, reset }}>
        <Drawer
          open={isOpen}
          onClose={closeDrawer}
          position="right"
          className="bg-light shadow-lg "
        >
          <Drawer.Header
            title={<span className="text-primary ">Filter</span>}
            titleIcon={() => <></>}
          />
          <Drawer.Items>
            <form onSubmit={handleSubmit(FilterSubmit)}>
              {children}
              <div className="mb-6">
                <Button
                  type="submit"
                  className="w-full bg-primary focus:ring-0 transition-all duration-300 ease-in-out"
                >
                  Apply Filter
                </Button>
              </div>
            </form>
          </Drawer.Items>
        </Drawer>
      </DrawerContext.Provider>
    </>
  );
}

FilterDrawer.Status = function FilterDrawerStatus() {
  const { register, errors } = useDrawerContext();
  return (
    <div className="mb-6 mt-3">
      <Label htmlFor="status" className="mb-2 block">
        Filter by status
      </Label>
      <Select
        className={`${
          errors["status"] ? "focus:ring-red-500 border-red-500" : ""
        }`}
        {...register("status")}
      >
        <option value="" disabled hidden selected>
          Select Status
        </option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </Select>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) =>
          message && (
            <p
              className="text-[12px] text-red-500 pt-[0.3rem] pl-[0.5rem]"
              key={type}
            >
              {message}
            </p>
          )
        }
      />
    </div>
  );
};

FilterDrawer.RegisteredDate = function FilterDrawerDate() {
  const { register, errors } = useDrawerContext();
  return (
    <div className="mb-6 mt-3">
      <Label htmlFor="date" className="mb-2 block">
        Filter by registered date
      </Label>
      <Input
        type="date"
        id="date"
        name="date"
        placeholder="Select date"
        register={register}
        errors={errors}
      />
    </div>
  );
};
