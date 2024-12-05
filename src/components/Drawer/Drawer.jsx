import { Button, Drawer, Label, Select } from "flowbite-react";
import useAuth from "../../hooks/useAuth";
import { Input } from "../Input/Input";
import { useForm } from "react-hook-form";
import { createContext, useContext } from "react";

const DrawerContext = createContext();
const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used within a DrawerProvider");
  }
  return context;
};

export function FilterDrawer({ children, setSearchParams, dateName = "" }) {
  const { isOpen, closeDrawer } = useAuth();

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      status: "",
      date: "",
      project_type: "",
    },
  });

  const FilterSubmit = (data) => {
    let updatedParams = {};
    if (data.status) {
      updatedParams["status"] = data.status;
    }
    if (data.date) {
      updatedParams["date"] = data.date;
    }

    setSearchParams(updatedParams);
    closeDrawer();
  };

  return (
    <>
      <DrawerContext.Provider value={{ register, errors, reset, dateName }}>
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
                  disabled={!isDirty}
                  className="w-full bg-primary focus:ring-0 transition-all duration-300 ease-in-out disabled:!bg-gray-400 disabled:cursor-not-allowed"
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
  const { register } = useDrawerContext();
  return (
    <div className="mb-6 mt-3">
      <Label htmlFor="status" className="mb-2 block">
        Filter by status
      </Label>
      <Select className={``} {...register("status")} defaultValue={""}>
        <option value="" disabled hidden>
          Select Status
        </option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </Select>
    </div>
  );
};

FilterDrawer.RegisteredDate = function FilterDrawerDate() {
  const { register, errors, dateName } = useDrawerContext();
  return (
    <div className="mb-6 mt-3">
      <Label htmlFor="date" className="mb-2 block">
        Filter by {dateName}
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

FilterDrawer.ProjectType = function FilterByProjectType() {
  const { register } = useDrawerContext();

  return (
    <div className="mb-6 mt-3">
      <Label htmlFor="project_type" className="mb-2 block">
        Filter by project type
      </Label>
      <Select className={``} {...register("project_type")} defaultValue={""}>
        <option value="" disabled hidden>
          Select project type
        </option>
        <option value="pending">Commercial</option>
        <option value="running">Residential</option>
      </Select>
    </div>
  );
};
