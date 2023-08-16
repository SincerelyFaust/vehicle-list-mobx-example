import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import CustomSelect from "@/components/CustomSelect";
import { Car } from "lucide-react";

export default function AddVehicleDialog({ open, setOpen }) {
  const [makeNameInput, setMakeNameInput] = useState("");
  const [makeAbrvInput, setMakeAbrvInput] = useState("");
  const [modelNameInput, setModelNameInput] = useState("");
  const [modelAbrvInput, setModelAbrvInput] = useState("");
  const [makeSelected, setMakeSelected] = useState(0);
  const [error, setError] = useState("");

  const store = useStore();

  function resetState() {
    setOpen(!open);
    setMakeNameInput("");
    setMakeAbrvInput("");
    setModelNameInput("");
    setModelAbrvInput("");
    setMakeSelected(0);
    setError("");
  }

  const vehicleMakeOptions = {
    Dodaj: [{ value: 0, label: "Dodaj" }],
    "Postojeće marke": [
      ...store.VehicleMake.map((make) => ({
        value: make.id,
        label: make.abrv,
      })),
    ],
  };

  function findMake(makeId) {
    const vehicleMake = store.VehicleMake.find((make) => make.id === makeId);

    if (vehicleMake) {
      setMakeNameInput(vehicleMake.name);
      setMakeAbrvInput(vehicleMake.abrv);
    }
  }

  function handleMakeSelectChange(value) {
    if (value === 0) {
      setMakeSelected(0);
      setMakeNameInput("");
      setMakeAbrvInput("");
    } else {
      findMake(value);
    }
  }

  async function addVehicleToAPI(newVehicleData) {
    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newVehicleData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      return error.message;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newVehicleData = {
      newMake: {
        name: makeNameInput,
        abrv: makeAbrvInput,
      },
      newModel: { name: modelNameInput, abrv: modelAbrvInput },
    };

    const response = await addVehicleToAPI(newVehicleData);

    if (response) {
      return setError(response);
    }

    store.addVehicleToStore(newVehicleData);

    resetState();
  }

  return (
    <Dialog
      title={"Dodaj novo vozilo"}
      open={open}
      setOpen={setOpen}
      form={"add-car-form"}
      resetState={resetState}
      error={error}
    >
      <Form handleSubmit={handleSubmit} formId={"add-car-form"}>
        <label>Marka vozila</label>
        <div className={styles["form-content"]}>
          <div className={styles["form-item"]}>
            <CustomSelect
              selectHeader={{
                title: "Odaberi postojeću marku",
                icon: <Car size={14} />,
              }}
              options={[vehicleMakeOptions]}
              selectedOption={makeSelected}
              setSelectedOption={setMakeSelected}
              onChange={handleMakeSelectChange}
            />
          </div>
          {makeSelected === 0 || store.VehicleMake.length < 1 ? (
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
