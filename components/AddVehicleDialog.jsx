import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/components/Form";
import { useStore } from "@/common/StoreProvider";

export default function AddVehicleDialog({ open, setOpen }) {
  const [makeNameInput, setMakeNameInput] = useState("");
  const [makeAbrvInput, setMakeAbrvInput] = useState("");
  const [modelNameInput, setModelNameInput] = useState("");
  const [modelAbrvInput, setModelAbrvInput] = useState("");

  const store = useStore();

  function resetState() {
    setOpen(!open);
    setMakeNameInput("");
    setMakeAbrvInput("");
    setModelNameInput("");
    setModelAbrvInput("");
  }

  function handleSubmit() {
    event.preventDefault();

    store.createVehicle(
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
        <div className="add-car-form-content">
          <div className="add-car-form-item">
            <label htmlFor="make_name_input">Naziv</label>
            <input
              placeholder="Unesite naziv marke vozila"
              required
              form="add-car-form"
              id="make_name_input"
              type="text"
              value={makeNameInput}
              onChange={(e) => setMakeNameInput(e.target.value)}
            />
          </div>
          <div className="add-car-form-item">
            <label htmlFor="make_abrv_input">Skraćenica</label>
            <input
              placeholder="Unesite skraćenicu marke vozila"
              required
              form="add-car-form"
              id="make_abrv_input"
              type="text"
              value={makeAbrvInput}
              onChange={(e) => setMakeAbrvInput(e.target.value)}
            />
          </div>
        </div>
        <label>Model vozila</label>
        <div className="add-car-form-content">
          <div className="add-car-form-item">
            <label htmlFor="model_name_input">Naziv</label>
            <input
              placeholder="Unesite naziv modela vozila"
              required
              form="add-car-form"
              id="model_name_input"
              type="text"
              value={modelNameInput}
              onChange={(e) => setModelNameInput(e.target.value)}
            />
          </div>
          <div className="add-car-form-item">
            <label htmlFor="model_abrv_input">Skraćenica</label>
            <input
              placeholder="Unesite skraćenicu modela vozila"
              required
              form="add-car-form"
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
