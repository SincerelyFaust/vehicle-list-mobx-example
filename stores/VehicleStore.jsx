import { makeAutoObservable } from "mobx";
import addVehicle from "@/common/AddVehicle";
import deleteVehicle from "@/common/DeleteVehicle";
import editVehicle from "@/common/EditVehicle";

export class VehicleStore {
  VehicleMake = [];
  VehicleModel = [];
  filterChoice = null;

  constructor() {
    makeAutoObservable(this);
  }

  hydrate = (data) => {
    if (!data) return;

    this.VehicleMake = data.VehicleMake;
    this.VehicleModel = data.VehicleModel;
  };

  setFilterChoice(newChoice) {
    this.filterChoice = newChoice;
  }

  get filteredVehicleModelData() {
    if (!this.filterChoice) {
      return this.VehicleModel;
    }

    const vehicleMake = this.VehicleMake.find(
      (make) => make.id === +this.filterChoice
    );

    if (!vehicleMake) return this.VehicleModel;

    return this.VehicleModel.filter((model) => model.makeid === vehicleMake.id);
  }

  addVehicleToStore(newVehicleData) {
    addVehicle(this.VehicleMake, this.VehicleModel, newVehicleData);
  }

  deleteVehicleToStore(selectedVehicleMakeAbrv, selectedVehicleModelAbrv) {
    deleteVehicle(
      this.VehicleModel,
      this.VehicleMake,
      selectedVehicleMakeAbrv,
      selectedVehicleModelAbrv
    );
  }

  editVehicleToStore(
    selectedVehicleMakeName,
    selectedVehicleMakeAbrv,
    selectedVehicleModelName,
    selectedVehicleModelAbrv,
    editedVehicleMakeName,
    editedVehicleMakeAbrv,
    editedVehicleModelName,
    editedVehicleModelAbrv
  ) {
    editVehicle(
      this.VehicleMake,
      this.VehicleModel,
      selectedVehicleMakeName,
      selectedVehicleMakeAbrv,
      selectedVehicleModelName,
      selectedVehicleModelAbrv,
      editedVehicleMakeName,
      editedVehicleMakeAbrv,
      editedVehicleModelName,
      editedVehicleModelAbrv
    );
  }
}
