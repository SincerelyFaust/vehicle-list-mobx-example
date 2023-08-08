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
    return this.VehicleModel.filter((model) => model.makeid === vehicleMake.id);
  }

  addVehicle(
    newVehicleMakeName,
    newVehicleMakeAbrv,
    newVehicleModelName,
    newVehicleModelAbrv
  ) {
    // add a new vehicle to the mobx store

    addVehicle(
      this.VehicleMake,
      this.VehicleModel,
      newVehicleMakeName,
      newVehicleMakeAbrv,
      newVehicleModelName,
      newVehicleModelAbrv
    );

    // add a new vehicle to the api

    fetch("/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newVehicleMakeName,
        newVehicleMakeAbrv,
        newVehicleModelName,
        newVehicleModelAbrv,
      }),
    });
  }

  deleteVehicle(selectedVehicleMakeAbrv, selectedVehicleModelAbrv) {
    deleteVehicle(
      this.VehicleModel,
      this.VehicleMake,
      selectedVehicleMakeAbrv,
      selectedVehicleModelAbrv
    );

    fetch("/api/vehicles", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedVehicleMakeAbrv,
        selectedVehicleModelAbrv,
      }),
    });
  }

  editVehicle(
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

    fetch("/api/vehicles", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedVehicleMakeName,
        selectedVehicleMakeAbrv,
        selectedVehicleModelName,
        selectedVehicleModelAbrv,
        editedVehicleMakeName,
        editedVehicleMakeAbrv,
        editedVehicleModelName,
        editedVehicleModelAbrv,
      }),
    });
  }
}
