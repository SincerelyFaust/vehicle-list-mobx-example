import Dialog from "@/components/Dialog";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import { observer, useLocalObservable } from "mobx-react-lite";
import StyledInput from "./StyledInput";
import EditVehicleStore from "@/stores/EditVehicleStore";

export default observer(function EditVehicleDialog({ open, setOpen }) {
  const vehicleStore = useStore();
  const editVehicleStore = useLocalObservable(
    () => new EditVehicleStore(vehicleStore, setOpen)
  );

  async function handleSubmit(event) {
    event.preventDefault();

    editVehicleStore.editVehicle();
  }

  return (
    <Dialog
      title={"Edit a vehicle"}
      open={open}
      setOpen={setOpen}
      form={"edit-car-form"}
      resetState={editVehicleStore.resetState}
      error={editVehicleStore.error}
    >
      <Form handleSubmit={handleSubmit} formId={"edit-car-form"}>
        <label>Vehicle make</label>
        <StyledInput field={editVehicleStore.form.$("makeName")} />
        <StyledInput field={editVehicleStore.form.$("makeAbrv")} />
        <label>Vehicle model</label>
        <div className={styles["form-content"]}>
          <StyledInput field={editVehicleStore.form.$("modelName")} />
          <StyledInput field={editVehicleStore.form.$("modelAbrv")} />
        </div>
      </Form>
    </Dialog>
  );
});
