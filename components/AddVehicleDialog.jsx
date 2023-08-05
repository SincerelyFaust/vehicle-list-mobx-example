import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/components/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import { useEffect } from "react";

export default function AddVehicleDialog({ open, setOpen }) {
  const [makeNameInput, setMakeNameInput] = useState("");
  const [makeAbrvInput, setMakeAbrvInput] = useState("");
  const [modelNameInput, setModelNameInput] = useState("");
  const [modelAbrvInput, setModelAbrvInput] = useState("");
  const [makeSelected, setMakeSelected] = useState("1");

  const store = useStore();

  function resetState() {
    setOpen(!open);
    setMakeNameInput("");
    setMakeAbrvInput("");
    setModelNameInput("");
    setModelAbrvInput("");
    setMakeSelected("1");
  }

  useEffect(() => {
    function findMake(makeId) {
      const vehicleMake = store.VehicleMake.find((make) => make.id === makeId);

      setMakeNameInput(vehicleMake.name);
      setMakeAbrvInput(vehicleMake.abrv);
    }

    if (+makeSelected !== 0) {
      findMake(+makeSelected);
    } else {
      setMakeNameInput("");
      setMakeAbrvInput("");
    }
  }, [makeSelected, store.VehicleMake]);

  function handleSubmit() {
    event.preventDefault();

    store.addVehicle(
      makeNameInput,
      makeAbrvInput,
      modelNameInput,
      modelAbrvInput
    );

    resetState();
  }

  return (
    <Dialog
      title={"Dodaj novo vozilo"}
      open={open}
      setOpen={setOpen}
      form={"add-car-form"}
      resetState={resetState}
    >
      <Form handleSubmit={handleSubmit} formId={"add-car-form"}>
        <label>Marka vozila</label>
        <div className={styles["form-content"]}>
          <div className={styles["form-item"]}>
            <select
              onChange={(e) => {
                setMakeSelected(e.target.value);
              }}
            >
              {store.VehicleMake.map((vehicleMake) => {
                return (
                  <>
                    <option
                      selected={vehicleMake.id === 1}
                      key={vehicleMake.id}
                      value={vehicleMake.id}
                    >
                      {vehicleMake.abrv}
                    </option>
                  </>
                );
              })}
              <option value={0}>+ Dodaj</option>
            </select>
          </div>
          {makeSelected === "0" ? (
            <>
              <div className={styles["form-item"]}>
                <label htmlFor="make_name_input">Naziv</label>
                <input
                  placeholder="Unesite naziv marke vozila"
                  required
                  form={"add-car-form"}
                  id="make_name_input"
                  type="text"
                  value={makeNameInput}
                  onChange={(e) => setMakeNameInput(e.target.value)}
                />
              </div>
              <div className={styles["form-item"]}>
                <label htmlFor="make_abrv_input">Skraćenica</label>
                <input
                  placeholder="Unesite skraćenicu marke vozila"
                  required
                  form={"add-car-form"}
                  id="make_abrv_input"
                  type="text"
                  value={makeAbrvInput}
                  onChange={(e) => setMakeAbrvInput(e.target.value)}
                />
              </div>
            </>
          ) : null}
        </div>
        <label>Model vozila</label>
        <div className={styles["form-content"]}>
          <div className={styles["form-item"]}>
            <label htmlFor="model_name_input">Naziv</label>
            <input
              placeholder="Unesite naziv modela vozila"
              required
              form={"add-car-form"}
              id="model_name_input"
              type="text"
              value={modelNameInput}
              onChange={(e) => setModelNameInput(e.target.value)}
            />
          </div>
          <div className={styles["form-item"]}>
            <label htmlFor="model_abrv_input">Skraćenica</label>
            <input
              placeholder="Unesite skraćenicu modela vozila"
              required
              form={"add-car-form"}
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
