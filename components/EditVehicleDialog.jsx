import Dialog from "@/components/Dialog";
import { useEffect } from "react";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";
import { toJS } from "mobx";
import { observer, useLocalObservable } from "mobx-react-lite";
import { EditVehicleForm } from "@/common/EditVehicleForm";
import StyledInput from "./StyledInput";

export default observer(function EditVehicleDialog({ open, setOpen }) {
  const store = useStore();
  const { make: currentMake, model: currentModel } = store.currentVehicle;
  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);
  const makeService = new MakeService(httpClient);
  const form = useLocalObservable(() => new EditVehicleForm());

  const error = useLocalObservable(() => ({
    message: "",
    setMessage(value) {
      this.message = value;
    },
  }));

  useEffect(() => {
    form.$("makeName").set(currentMake.name);
    form.$("makeAbrv").set(currentMake.abrv);
    form.$("modelName").set(currentModel.name);
    form.$("modelAbrv").set(currentModel.abrv);
  }, [currentMake, currentModel, open, form]);

  function resetState() {
    setOpen(!open);
    form.reset();
    error.setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    form.validate();

    if (form.isValid) {
      const data = {
        make: {
          id: currentMake.id,
          name: form.values().makeName,
          abrv: form.values().makeAbrv,
        },
        model: {
          id: currentModel.id,
          makeid: currentModel.makeid,
          name: form.values().modelName,
          abrv: form.values().modelAbrv,
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

      if (isMakeEqual && isModelEqual)
        return error.setMessage("Molimo unesite nove podatke.");

      form.onSubmit();

      resetState();
    } else {
      error.setMessage("Greška u obrascu.");
    }
  }

  return (
    <Dialog
      title={"Uredi vozilo"}
      open={open}
      setOpen={setOpen}
      form={"edit-car-form"}
      resetState={resetState}
      error={error.message}
    >
      <Form handleSubmit={handleSubmit} formId={"edit-car-form"}>
        <label>Marka vozila</label>
        <StyledInput field={form.$("makeName")} />
        <StyledInput field={form.$("makeAbrv")} />
        <label>Model vozila</label>
        <div className={styles["form-content"]}>
          <StyledInput field={form.$("modelName")} />
          <StyledInput field={form.$("modelAbrv")} />
        </div>
      </Form>
    </Dialog>
  );
});
