import { makeAutoObservable } from "mobx";
import addVehicle from "@/common/AddVehicle";
import deleteVehicle from "@/common/DeleteVehicle";

export class VehicleStore {
  VehicleMake = [];
  VehicleModel = [];

  constructor() {
    makeAutoObservable(this);
  }

  hydrate = (data) => {
    if (!data) return;

    this.VehicleMake = data.VehicleMake;
    this.VehicleModel = data.VehicleModel;
  };

  createVehicle(newVehicleMake, newVehicleModel) {
    // add a new vehicle to the mobx store

    addVehicle(
      this.VehicleMake,
      this.VehicleModel,
      newVehicleMake,
      newVehicleModel
    );

    // add a new vehicle to the api

    fetch("/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newVehicleMake: newVehicleMake,
        newVehicleModel: newVehicleModel,
      }),
    });
  }

  deleteVehicle(editVehicleModel, editVehicleMake) {
    deleteVehicle(
      this.VehicleModel,
      this.VehicleMake,
      editVehicleModel,
      editVehicleMake
    );

    fetch("/api/vehicles", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newVehicleModel: editVehicleModel,
        newVehicleMake: editVehicleMake,
      }),
    });
  }
}
