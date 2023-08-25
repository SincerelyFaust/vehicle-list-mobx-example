import { makeObservable, observable, action } from "mobx";
import { AddVehicleForm } from "@/common/AddVehicleForm";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";
import { HttpClient } from "@/common/HttpClient";

export default class AddVehicleStore {
  form;
  selectMake = {
    id: 0,
    name: "",
  };
  error = "";
  httpClient;
  modelService;
  makeService;
  vehicleStore;
  setOpen;

  constructor(vehicleStore, setOpen) {
    this.vehicleStore = vehicleStore;
    this.form = new AddVehicleForm();
    this.httpClient = new HttpClient();
    this.modelService = new ModelService(this.httpClient);
    this.makeService = new MakeService(this.httpClient);
    this.setOpen = setOpen;

    makeObservable(this, {
      form: observable,
      selectMake: observable,
      error: observable,
      findMake: action.bound,
      handleMakeSelectChange: action.bound,
      resetState: action.bound,
      addVehicle: action.bound,
      setSelectMakeName: action.bound,
    });
  }

  setSelectMakeName(value) {
    this.selectMake.name = value;
  }

  findMake(makeId) {
    const vehicleMake = this.vehicleStore.VehicleMake.find(
      (make) => make.id === makeId
    );
    if (vehicleMake) {
      this.form.$("makeName").set(vehicleMake.name);
      this.form.$("makeAbrv").set(vehicleMake.abrv);
    }
  }

  handleMakeSelectChange(value) {
    if (value === 0) {
      this.selectMake.id = 0;
      this.form.$("makeName").set("");
      this.form.$("makeAbrv").set("");
    } else {
      this.selectMake.id = value;
      this.findMake(value);
    }
  }

  resetState() {
    this.setOpen(false);
    this.form.reset();
    this.selectMake.id = 0;
    this.selectMake.name = "";
    this.error = "";
  }

  getHighestId(arr) {
    return arr.length > 0 ? Math.max(...arr.map((item) => item.id)) : 0;
  }

  async addVehicle() {
    this.form.validate();

    if (!this.form.isValid)
      return (this.error = "Molimo ispunita sva polja u obrascu.");

    const makeHighestId = this.getHighestId(this.vehicleStore.VehicleMake);
    const modelHighestId = this.getHighestId(this.vehicleStore.VehicleModel);

    const data = {
      make: {
        id: makeHighestId + 1,
        name: this.form.values().makeName,
        abrv: this.form.values().makeAbrv,
      },
      model: {
        id: modelHighestId + 1,
        name: this.form.values().modelName,
        abrv: this.form.values().modelAbrv,
        makeid:
          this.selectMake.id === 0 ? makeHighestId + 1 : this.selectMake.id,
      },
    };

    if (this.selectMake.id === 0) {
      const makeResponse = await this.makeService.addMake(data.make);
      if (makeResponse) {
        return (this.error = makeResponse);
      }
      this.vehicleStore.addMakeToStore(data.make);
    }

    const modelResponse = await this.modelService.addModel(data.model);
    if (modelResponse) {
      return (this.error = modelResponse);
    }

    this.vehicleStore.addModelToStore(data.model);
    this.form.onSubmit();
    this.resetState();
  }
}
