import { makeObservable, observable, action } from "mobx";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";

export class HomeStore {
  httpClient;
  modelService;
  makeService;
  vehicleStore;
  openAddVehicleDialog = false;
  openEditVehicleDialog = false;
  currentPage = 1;
  pageInput = 1;
  sortChoice = "";
  filterChoice = null;

  constructor(vehicleStore) {
    this.vehicleStore = vehicleStore;
    this.httpClient = new HttpClient();
    this.modelService = new ModelService(this.httpClient);
    this.makeService = new MakeService(this.httpClient);

    makeObservable(this, {
      openAddVehicleDialog: observable,
      openEditVehicleDialog: observable,
      setOpenAddVehicleDialog: action.bound,
      setOpenEditVehicleDialog: action.bound,
      handleSortSelectChange: action.bound,
      currentPage: observable,
      pageInput: observable,
      setCurrentPage: action.bound,
      setPageInput: action.bound,
      sortChoice: observable,
      filterChoice: observable,
      setSortChoice: action.bound,
      setFilterChoice: action.bound,
      handleFilterSelectChange: action.bound,
    });
  }

  setOpenAddVehicleDialog(value) {
    this.openAddVehicleDialog = value;
  }

  setOpenEditVehicleDialog(value) {
    this.openEditVehicleDialog = value;
  }

  setCurrentPage(value) {
    this.currentPage = value;
  }

  setPageInput(value) {
    this.pageInput = value;
  }

  setSortChoice(value) {
    this.sortChoice = value;
  }

  setFilterChoice(value) {
    this.filterChoice = value;
  }

  handleFilterSelectChange(value) {
    this.vehicleStore.setFilterChoice(value);
    this.setCurrentPage(1);
    this.setPageInput(1);
  }

  async handleSortSelectChange(value) {
    switch (value) {
      case "alphabetical-make":
        const alphabeticalMake = await this.makeService.getMakes(
          "?order=name.asc"
        );
        this.vehicleStore.setMakes(alphabeticalMake);

        const sortedModelsByMake = this.vehicleStore.vehicleModel.sort(
          (a, b) => {
            const makeA = alphabeticalMake.find((make) => make.id === a.makeid);
            const makeB = alphabeticalMake.find((make) => make.id === b.makeid);
            return (
              makeA.name.localeCompare(makeB.name) ||
              a.name.localeCompare(b.name)
            );
          }
        );
        this.vehicleStore.setModels(sortedModelsByMake);
        break;
      case "alphabetical-model":
        const alphabeticalModel = await this.modelService.getModels(
          "?order=name.asc"
        );
        this.vehicleStore.setModels(alphabeticalModel);
        break;
    }
  }
}
