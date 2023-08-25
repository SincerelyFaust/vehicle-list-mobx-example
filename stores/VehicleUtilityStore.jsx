import { makeObservable, observable, action } from "mobx";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";

export class VehicleUtilityStore {
  form;
  error = "";
  httpClient;
  modelService;
  makeService;
  vehicleStore;
  setOpen;

  constructor(vehicleStore, setOpen, FormClass) {
    this.vehicleStore = vehicleStore;
    this.form = new FormClass();
    this.httpClient = new HttpClient();
    this.modelService = new ModelService(this.httpClient);
    this.makeService = new MakeService(this.httpClient);
    this.setOpen = setOpen;

    makeObservable(this, {
      form: observable,
      error: observable,
      resetState: action.bound,
    });
  }

  resetState() {
    this.setOpen(false);
    this.form.reset();
    this.error = "";
  }
}
