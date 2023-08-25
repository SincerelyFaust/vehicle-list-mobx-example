import { makeObservable, observable, action, computed } from "mobx";

export class VehicleStore {
  VehicleMake = [];
  VehicleModel = [];
  filterChoice = null;
  currentVehicle = {
    make: { name: "", abrv: "", id: null },
    model: { name: "", abrv: "", id: null, makeid: null },
  };

  constructor() {
    makeObservable(this, {
      VehicleMake: observable,
      VehicleModel: observable,
      filterChoice: observable,
      currentVehicle: observable,
      hydrate: action.bound,
      setFilterChoice: action.bound,
      filteredVehicleModelData: computed,
      setCurrentVehicle: action.bound,
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

    this.VehicleMake = data.vehicleMake;
    this.VehicleModel = data.vehicleModel;
  }

  setMakes(data) {
    this.VehicleMake = data;
  }

  setModels(data) {
    this.VehicleModel = data;
  }

  setFilterChoice(newChoice) {
    this.filterChoice = newChoice;
  }

  get filteredVehicleModelData() {
    if (!this.filterChoice) {
      return this.VehicleModel;
    }

    const vehicleMake = this.VehicleMake.find(
      (make) => make.id === this.filterChoice
    );

    if (!vehicleMake) return this.VehicleModel;

    return this.VehicleModel.filter((model) => model.makeid === vehicleMake.id);
  }

  setCurrentVehicle(make, model) {
    this.currentVehicle = { make, model };
  }

  addMakeToStore(data) {
    this.VehicleMake.push(data);
  }

  addModelToStore(data) {
    this.VehicleModel.push(data);
  }

  deleteMakeToStore(data) {
    const vehicleMakeIndex = this.VehicleMake.indexOf(data);
    this.VehicleMake.splice(vehicleMakeIndex, 1);
  }

  deleteModelToStore(data) {
    const vehicleModelIndex = this.VehicleModel.indexOf(data);
    this.VehicleModel.splice(vehicleModelIndex, 1);
  }

  editMakeToStore(data, selected) {
    const vehicleMakeIndex = this.VehicleMake.indexOf(selected);
    this.VehicleMake[vehicleMakeIndex] = data;
  }

  editModelToStore(data, selected) {
    const vehicleModelIndex = this.VehicleModel.indexOf(selected);
    this.VehicleModel[vehicleModelIndex] = data;
  }
}
