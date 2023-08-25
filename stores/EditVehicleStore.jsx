import { makeObservable, observable, action, autorun } from "mobx";
import { EditVehicleForm } from "@/common/EditVehicleForm";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";
import { HttpClient } from "@/common/HttpClient";
import { toJS } from "mobx";

export default class EditVehicleStore {
  form;
  error = "";
  httpClient;
  modelService;
  makeService;
  vehicleStore;
  setOpen;

  constructor(vehicleStore, setOpen) {
    this.vehicleStore = vehicleStore;
    this.form = new EditVehicleForm();
    this.httpClient = new HttpClient();
    this.modelService = new ModelService(this.httpClient);
    this.makeService = new MakeService(this.httpClient);
    this.setOpen = setOpen;

    makeObservable(this, {
      form: observable,
      error: observable,
      resetState: action.bound,
      editVehicle: action.bound,
    });

    autorun(() => {
      this.form.$("makeName").set(this.vehicleStore.currentVehicle.make.name);
      this.form.$("makeAbrv").set(this.vehicleStore.currentVehicle.make.abrv);
      this.form.$("modelName").set(this.vehicleStore.currentVehicle.model.name);
      this.form.$("modelAbrv").set(this.vehicleStore.currentVehicle.model.abrv);
    });
  }

  resetState() {
    this.setOpen(false);
    this.form.reset();
    this.error = "";
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
