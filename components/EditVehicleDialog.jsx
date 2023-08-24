import Dialog from "@/components/Dialog";
import { useState, useEffect } from "react";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";
import { toJS } from "mobx";

export default function EditVehicleDialog({ open, setOpen }) {
  const [makeNameInput, setMakeNameInput] = useState("");
  const [makeAbrvInput, setMakeAbrvInput] = useState("");
  const [modelNameInput, setModelNameInput] = useState("");
  const [modelAbrvInput, setModelAbrvInput] = useState("");
  const [error, setError] = useState("");

  const store = useStore();
  const { make: currentMake, model: currentModel } = store.currentVehicle;

  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);
  const makeService = new MakeService(httpClient);

  useEffect(() => {
    setMakeNameInput(currentMake.name);
    setMakeAbrvInput(currentMake.abrv);
    setModelNameInput(currentModel.name);
    setModelAbrvInput(currentModel.abrv);
  }, [currentMake, currentModel, open]);

  function resetState() {
    setOpen(!open);
    setMakeNameInput("");
    setMakeAbrvInput("");
    setModelNameInput("");
    setModelAbrvInput("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const data = {
      make: {
        id: currentMake.id,
        name: makeNameInput,
        abrv: makeAbrvInput,
      },
      model: {
        id: currentModel.id,
        makeid: currentModel.makeid,
        name: modelNameInput,
        abrv: modelAbrvInput,
      },
    };

    const isMakeEqual =
      JSON.stringify(toJS(currentMake)) === JSON.stringify(data.make);
    const isModelEqual =
      JSON.stringify(toJS(currentModel)) === JSON.stringify(data.model);

    if (!isModelEqual) {
      const modelResponse = await modelService.editModel(
        data.model,
        currentModel
      );

      if (modelResponse) {
        return setError(modelResponse);
      }

      store.editModelToStore(data.model, currentModel);
    }

    if (!isMakeEqual) {
      const makeResponse = await makeService.editMake(data.make, currentMake);

      if (makeResponse) {
        return setError(makeResponse);
      }

      store.editMakeToStore(data.make, currentMake);
    }

    resetState();
  }

  return (
    <Dialog
      title={"Uredi vozilo"}
      open={open}
      setOpen={setOpen}
      form={"edit-car-form"}
      resetState={resetState}
      error={error}
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
