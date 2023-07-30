import { makeAutoObservable } from "mobx";

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
}
