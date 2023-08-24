import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import CustomSelect from "@/components/CustomSelect";
import { Car } from "lucide-react";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";

export default function AddVehicleDialog({ open, setOpen }) {
  const [makeNameInput, setMakeNameInput] = useState("");
  const [makeAbrvInput, setMakeAbrvInput] = useState("");
  const [modelNameInput, setModelNameInput] = useState("");
  const [modelAbrvInput, setModelAbrvInput] = useState("");
  const [selectedMakeId, setSelectedMakeId] = useState(0);
  const [selectedMakeName, setSelectedMakeName] = useState("");
  const [error, setError] = useState("");

  const store = useStore();
  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);
  const makeService = new MakeService(httpClient);

  const vehicleMakeOptions = {
    Dodaj: [{ value: 0, label: "Dodaj" }],
    "Postojeće marke": [
      ...store.VehicleMake.map((make) => ({
        value: make.id,
        label: make.abrv,
      })),
    ],
  };

  function resetState() {
    setOpen(!open);
    setMakeNameInput("");
    setMakeAbrvInput("");
    setModelNameInput("");
    setModelAbrvInput("");
    setSelectedMakeId(0);
    setSelectedMakeName("");
    setError("");
  }

  function findMake(makeId) {
    const vehicleMake = store.VehicleMake.find((make) => make.id === makeId);

    if (vehicleMake) {
      setMakeNameInput(vehicleMake.name);
      setMakeAbrvInput(vehicleMake.abrv);
    }
  }

  function handleMakeSelectChange(value) {
    if (value === 0) {
      setSelectedMakeId(0);
      setMakeNameInput("");
      setMakeAbrvInput("");
    } else {
      setSelectedMakeId(value);
      findMake(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const makeWithHighestId = store.VehicleMake.reduce(
      (maxObj, currentObj) => {
        return maxObj.id > currentObj.id ? maxObj.id : currentObj.id;
      },
      { id: -Infinity }
    );

    const modelWithHighestId = store.VehicleModel.reduce(
      (maxObj, currentObj) => {
        return maxObj.id > currentObj.id ? maxObj.id : currentObj.id;
      },
      { id: -Infinity }
    );

    const data = {
      make: {
        id: makeWithHighestId + 1,
        name: makeNameInput,
        abrv: makeAbrvInput,
      },
      model: {
        id: modelWithHighestId + 1,
        name: modelNameInput,
        abrv: modelAbrvInput,
        makeid: selectedMakeId === 0 ? makeWithHighestId + 1 : selectedMakeId,
      },
    };

    if (selectedMakeId === 0) {
      const makeResponse = await makeService.addMake(data.make);

      if (makeResponse) {
        return setError(makeResponse);
      }

      store.addMakeToStore(data.make);
    }

    const modelResponse = await modelService.addModel(data.model);

    if (modelResponse) {
      return setError(modelResponse);
    }

    store.addModelToStore(data.model);

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
              selectedOption={selectedMakeName}
              setSelectedOption={setSelectedMakeName}
              onChange={handleMakeSelectChange}
            />
          </div>
          {selectedMakeId === 0 || store.VehicleMake.length < 1 ? (
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
