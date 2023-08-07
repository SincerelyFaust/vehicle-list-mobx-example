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

      if (vehicleMake) {
        setMakeNameInput(vehicleMake.name);
        setMakeAbrvInput(vehicleMake.abrv);
      } else {
        if (store.VehicleMake.length > 0) {
          const firstAvailableMake = store.VehicleMake[0];
          setMakeSelected(+firstAvailableMake.id);
        } else {
          setMakeSelected("0");
          setMakeNameInput("");
          setMakeAbrvInput("");
        }
      }
    }

    findMake(+makeSelected);
  }, [makeSelected, store.VehicleMake, open]);

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
              value={makeSelected}
            >
              {store.VehicleMake.map((vehicleMake) => {
                return (
                  <>
                    <option key={vehicleMake.id} value={vehicleMake.id}>
                      {vehicleMake.abrv}
                    </option>
                  </>
                );
              })}
              <option value={0}>+ Dodaj</option>
            </select>
          </div>
          {makeSelected === "0" || store.VehicleMake.length < 1 ? (
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

// the bug is that if you delete all cars from the list and go to add new one, select appears but not
// the fields but you fixed that, the only issue is that the state shows the data from the make whose id is 1
// instead of blank

// also one more error, after you delete an entire make, the value inside select will switch onto the next one but the data
// is all wrong is because the value of select stays at "1" which is initial value but nothing under that id exists so it
// goes crazy and gives stupid stuff

// also one more error, trying adding a car on initial load and then add it again with same model and abrv, this happens due
// to an issue with resetState() since even on initial load if you just open it, click Zatvori and go in again, it won't add
// it the right way
