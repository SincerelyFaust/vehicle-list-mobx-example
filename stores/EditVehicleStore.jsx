import { makeObservable, action, autorun } from "mobx";
import { EditVehicleForm } from "@/common/EditVehicleForm";
import { toJS } from "mobx";
import { VehicleUtilityStore } from "./VehicleUtilityStore";

export default class EditVehicleStore extends VehicleUtilityStore {
  constructor(vehicleStore, setOpen) {
    super(vehicleStore, setOpen, EditVehicleForm);

    makeObservable(this, {
      editVehicle: action.bound,
    });

    autorun(() => {
      this.form.$("makeName").set(this.vehicleStore.currentVehicle.make.name);
      this.form.$("makeAbrv").set(this.vehicleStore.currentVehicle.make.abrv);
      this.form.$("modelName").set(this.vehicleStore.currentVehicle.model.name);
      this.form.$("modelAbrv").set(this.vehicleStore.currentVehicle.model.abrv);
    });
  }

  async editVehicle() {
    this.form.validate();

    if (!this.form.isValid)
      return (this.error =
        "Greška u obrascu, molimo provjerite unešene podatke.");

    const { make: currentMake, model: currentModel } =
      this.vehicleStore.currentVehicle;
    const data = {
      make: {
        id: currentMake.id,
        name: this.form.values().makeName,
        abrv: this.form.values().makeAbrv,
      },
      model: {
        id: currentModel.id,
        makeid: currentModel.makeid,
        name: this.form.values().modelName,
        abrv: this.form.values().modelAbrv,
      },
    };

    const isMakeEqual =
      JSON.stringify(toJS(currentMake)) === JSON.stringify(data.make);
    const isModelEqual =
      JSON.stringify(toJS(currentModel)) === JSON.stringify(data.model);

    if (isMakeEqual && isModelEqual)
      return (this.error = "Molimo unesite nove podatke.");

    if (!isModelEqual) {
      const modelResponse = await this.modelService.editModel(
        data.model,
        currentModel
      );
      if (modelResponse) {
        return (this.error = modelResponse);
      }
      this.vehicleStore.editModelToStore(data.model, currentModel);
    }

    if (!isMakeEqual) {
      const makeResponse = await this.makeService.editMake(
        data.make,
        currentMake
      );
      if (makeResponse) {
        return (this.error = makeResponse);
      }
      this.vehicleStore.editMakeToStore(data.make, currentMake);
    }

    this.form.onSubmit();
    this.resetState();
  }
}
