import Dialog from "@/components/Dialog";
import Form from "@/layouts/Form";
import { useStore } from "@/common/StoreProvider";
import styles from "@/components/StyledDialog.module.css";
import CustomSelect from "@/components/CustomSelect";
import { Car } from "lucide-react";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";
import { observer, useLocalObservable } from "mobx-react-lite";
import { AddVehicleForm } from "@/common/AddVehicleForm";
import StyledInput from "./StyledInput";

export default observer(function AddVehicleDialog({ open, setOpen }) {
  const store = useStore();
  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);
  const makeService = new MakeService(httpClient);
  const form = useLocalObservable(() => new AddVehicleForm());

  const selectMake = useLocalObservable(() => ({
    id: 0,
    name: "",
    setId(value) {
      this.id = value;
    },
    setName(value) {
      this.name = value;
    },
  }));

  const error = useLocalObservable(() => ({
    message: "",
    setMessage(value) {
      this.message = value;
    },
  }));

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
      form.$("makeName").set(vehicleMake.name);
      form.$("makeAbrv").set(vehicleMake.abrv);
    }
  }

  function handleMakeSelectChange(value) {
    if (value === 0) {
      selectMake.setId(0);
      form.$("makeName").set("");
      form.$("makeAbrv").set("");
    } else {
      selectMake.setId(value);
      findMake(value);
    }
  }

  function resetState() {
    setOpen(!open);
    form.reset();
    selectMake.setId(0);
    selectMake.setName("");
    error.setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    form.validate();

    if (form.isValid) {
      const makeWithHighestId =
        store.VehicleMake.length > 0
          ? Math.max(...store.VehicleMake.map((make) => make.id))
          : 0;

      const modelWithHighestId =
        store.VehicleModel.length > 0
          ? Math.max(...store.VehicleModel.map((model) => model.id))
          : 0;

      const data = {
        make: {
          id: makeWithHighestId + 1,
          name: form.values().makeName,
          abrv: form.values().makeAbrv,
        },
        model: {
          id: modelWithHighestId + 1,
          name: form.values().modelName,
          abrv: form.values().modelAbrv,
          makeid: selectMake.id === 0 ? makeWithHighestId + 1 : selectMake.id,
        },
      };

      if (selectMake.id === 0) {
        const makeResponse = await makeService.addMake(data.make);

        if (makeResponse) {
          return error.setMessage(makeResponse);
        }

        store.addMakeToStore(data.make);
      }

      const modelResponse = await modelService.addModel(data.model);

      if (modelResponse) {
        return error.setMessage(modelResponse);
      }

      store.addModelToStore(data.model);

      form.onSubmit();

      resetState();
    } else {
      error.setMessage("Molimo ispunita sva polja u obrascu.");
    }
  }

  return (
    <Dialog
      title={"Dodaj novo vozilo"}
      open={open}
      form={"add-car-form"}
      resetState={resetState}
      error={error.message}
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
              selectedOption={selectMake.name}
              setSelectedOption={selectMake.setName}
              onChange={handleMakeSelectChange}
            />
          </div>
          {selectMake.id === 0 || store.VehicleMake.length < 1 ? (
            <>
              <StyledInput field={form.$("makeName")} />
              <StyledInput field={form.$("makeAbrv")} />
            </>
          ) : null}
        </div>
        <label>Model vozila</label>
        <div className={styles["form-content"]}>
          <StyledInput field={form.$("modelName")} />
          <StyledInput field={form.$("modelAbrv")} />
        </div>
      </Form>
    </Dialog>
  );
});
