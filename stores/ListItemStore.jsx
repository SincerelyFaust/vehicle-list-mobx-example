import { makeObservable, action } from "mobx";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";

export class ListItemStore {
  httpClient;
  modelService;
  vehicleStore;
  setOpen;

  constructor(vehicleStore, setOpen) {
    this.vehicleStore = vehicleStore;
    this.httpClient = new HttpClient();
    this.modelService = new ModelService(this.httpClient);
    this.setOpen = setOpen;

    makeObservable(this, {
      editVehicle: action.bound,
      deleteVehicle: action.bound,
    });
  }

  editVehicle(make, model) {
    this.vehicleStore.setCurrentVehicle(make, model);
    this.setOpen(true);
  }

  async deleteVehicle(model) {
    const modelResponse = await this.modelService.deleteModel(model);

    if (modelResponse) {
      return console.error(modelResponse);
    }

    this.vehicleStore.deleteModelToStore(model);
  }
}
