import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/components/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import { useEffect } from "react";

export default function EditVehicleDialog({ open, setOpen, initialData }) {
  const [makeNameInput, setMakeNameInput] = useState("");
  const [makeAbrvInput, setMakeAbrvInput] = useState("");
  const [modelNameInput, setModelNameInput] = useState("");
  const [modelAbrvInput, setModelAbrvInput] = useState("");

  const store = useStore();

  useEffect(() => {
    setMakeNameInput(initialData.vehicleMakeName);
    setMakeAbrvInput(initialData.vehicleMakeAbrv);
    setModelNameInput(initialData.vehicleModelName);
    setModelAbrvInput(initialData.vehicleModelAbrv);
  }, [initialData]);

  function resetState() {
    setOpen(!open);
    setMakeNameInput("");
    setMakeAbrvInput("");
    setModelNameInput("");
    setModelAbrvInput("");
  }

  function handleSubmit() {
    event.preventDefault();

    store.editVehicleToStore(
      initialData.vehicleMakeName,
      initialData.vehicleMakeAbrv,
      initialData.vehicleModelName,
      initialData.vehicleModelAbrv,
      makeNameInput,
      makeAbrvInput,
      modelNameInput,
      modelAbrvInput
    );

    fetch("/api/vehicles", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        initialData,
        makeNameInput,
        makeAbrvInput,
        modelNameInput,
        modelAbrvInput,
      }),
    });

    resetState();
  }

  return (
    <Dialog
      title={"Uredi vozilo"}
      open={open}
      setOpen={setOpen}
      form={"edit-car-form"}
      resetState={resetState}
    >
      <Form handleSubmit={handleSubmit} formId={"edit-car-form"}>
        <label>Marka vozila</label>
        <div className={styles["form-item"]}>
          <label htmlFor="make_name_input">Novi naziv</label>
          <input
            placeholder="Unesite novi naziv marke vozila"
            required
            form="edit-car-form"
            id="make_name_input"
            type="text"
            value={makeNameInput}
            onChange={(e) => setMakeNameInput(e.target.value)}
          />
        </div>
        <div className={styles["form-item"]}>
          <label htmlFor="make_abrv_input">Nova skraćenica</label>
          <input
            placeholder="Unesite novu skraćenicu marke vozila"
            required
            form="edit-car-form"
            id="make_abrv_input"
            type="text"
            value={makeAbrvInput}
            onChange={(e) => setMakeAbrvInput(e.target.value)}
          />
        </div>
        <label>Model vozila</label>
        <div className={styles["form-content"]}>
          <div className={styles["form-item"]}>
            <label htmlFor="model_name_input">Novi naziv</label>
            <input
              placeholder="Unesite novi naziv modela vozila"
              required
              form="edit-car-form"
              id="model_name_input"
              type="text"
              value={modelNameInput}
              onChange={(e) => setModelNameInput(e.target.value)}
            />
          </div>
          <div className={styles["form-item"]}>
            <label htmlFor="model_abrv_input">Nova skraćenica</label>
            <input
              placeholder="Unesite novu skraćenicu modela vozila"
              required
              form="edit-car-form"
              id="model_abrv_input"
              type="text"
              value={modelAbrvInput}
              onChange={(e) => setModelAbrvInput(e.target.value)}
            />
          </div>
        </div>
      </Form>
    </Dialog>
  );
}
