import { makeObservable, observable, action, computed } from "mobx";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";

export class VehicleStore {
  vehicleMake = [];
  vehicleModel = [];
  filterChoice = null;
  currentVehicle = {
    make: { name: "", abrv: "", id: null },
    model: { name: "", abrv: "", id: null, makeid: null },
  };
  httpClient;
  modelService;
  filteredModels = [];

  constructor() {
    this.httpClient = new HttpClient();
    this.modelService = new ModelService(this.httpClient);

    makeObservable(this, {
      vehicleMake: observable,
      vehicleModel: observable,
      filterChoice: observable,
      currentVehicle: observable,
      hydrate: action.bound,
      setFilterChoice: action.bound,
      filteredVehicleModelData: action.bound,
      getFilteredModels: computed,
      setCurrentVehicle: action.bound,
      filteredModels: observable,
      addMakeToStore: action.bound,
      addModelToStore: action.bound,
      deleteMakeToStore: action.bound,
      deleteModelToStore: action.bound,
      editMakeToStore: action.bound,
      editModelToStore: action.bound,
      setMakes: action.bound,
      setModels: action.bound,
    });
  }

  hydrate(data) {
    if (!data) return;

    this.vehicleMake = data.vehicleMake;
    this.vehicleModel = data.vehicleModel;
  }

  setMakes(data) {
    this.vehicleMake = data;
  }

  setModels(data) {
    this.vehicleModel = data;
  }

  setFilterChoice(newChoice) {
    this.filterChoice = newChoice;
  }

  get getFilteredModels() {
    if (!this.filteredModels || this.filteredModels.length === 0) {
      return this.vehicleModel;
    }

    return this.filteredModels;
  }

  async filteredVehicleModelData() {
    if (!this.filterChoice) return this.filteredModels.clear();

    const fetchFilteredModels = await this.modelService.getModels(
      `?makeid=eq.${this.filterChoice}`
    );

    if (!fetchFilteredModels || fetchFilteredModels.length === 0) return;

    return (this.filteredModels = fetchFilteredModels);
  }

  setCurrentVehicle(make, model) {
    this.currentVehicle = { make, model };
  }

  addMakeToStore(data) {
    this.vehicleMake.push(data);
  }

  addModelToStore(data) {
    this.vehicleModel.push(data);
  }

  deleteMakeToStore(data) {
    const vehicleMakeIndex = this.vehicleMake.indexOf(data);
    this.vehicleMake.splice(vehicleMakeIndex, 1);
  }

  deleteModelToStore(data) {
    const vehicleModelIndex = this.vehicleModel.indexOf(data);
    this.vehicleModel.splice(vehicleModelIndex, 1);
  }

  editMakeToStore(data, selected) {
    const vehicleMakeIndex = this.vehicleMake.indexOf(selected);
    this.vehicleMake[vehicleMakeIndex] = data;
  }

  editModelToStore(data, selected) {
    const vehicleModelIndex = this.vehicleModel.indexOf(selected);
    this.vehicleModel[vehicleModelIndex] = data;
  }
}
