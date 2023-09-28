import Dialog from "@/components/Dialog";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import CustomSelect from "@/components/CustomSelect";
import { Car } from "lucide-react";
import { observer, useLocalObservable } from "mobx-react-lite";
import StyledInput from "./StyledInput";
import AddVehicleStore from "@/stores/AddVehicleStore";

export default observer(function AddVehicleDialog({ open, setOpen }) {
  const vehicleStore = useStore();
  const addVehicleStore = useLocalObservable(
    () => new AddVehicleStore(vehicleStore, setOpen)
  );

  const vehicleMakeOptions = {
    Add: [{ value: 0, label: "Add" }],
    "Existing makes": [
      ...vehicleStore.vehicleMake.map((make) => ({
        value: make.id,
        label: make.abrv,
      })),
    ],
  };

  async function handleSubmit(event) {
    event.preventDefault();

    await addVehicleStore.addVehicle();
  }

  return (
    <Dialog
      title={"Add new vehicle"}
      open={open}
      form={"add-car-form"}
      resetState={addVehicleStore.resetState}
      error={addVehicleStore.error}
    >
      <Form handleSubmit={handleSubmit} formId={"add-car-form"}>
        <label>Vehicle make</label>
        <div className={styles["form-content"]}>
          <div className={styles["form-item"]}>
            <CustomSelect
              selectHeader={{
                title: "Choose an existing make",
                icon: <Car size={14} />,
              }}
              options={[vehicleMakeOptions]}
              selectedOption={addVehicleStore.selectMake.name}
              setSelectedOption={addVehicleStore.setSelectMakeName}
              onChange={addVehicleStore.handleMakeSelectChange}
            />
          </div>
          {addVehicleStore.selectMake.id === 0 ||
          vehicleStore.vehicleMake.length < 1 ? (
            <>
              <StyledInput field={addVehicleStore.form.$("makeName")} />
              <StyledInput field={addVehicleStore.form.$("makeAbrv")} />
            </>
          ) : null}
        </div>
        <label>Vehicle model</label>
        <div className={styles["form-content"]}>
          <StyledInput field={addVehicleStore.form.$("modelName")} />
          <StyledInput field={addVehicleStore.form.$("modelAbrv")} />
        </div>
      </Form>
    </Dialog>
  );
});
