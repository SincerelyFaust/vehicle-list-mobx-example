import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import { observer, useLocalObservable } from "mobx-react-lite";
import AddVehicleDialog from "@/components/AddVehicleDialog";
import SortVehicle from "@/common/SortVehicle";
import EditVehicleDialog from "@/components/EditVehicleDialog";
import Pages from "@/components/Pages";
import CustomSelect from "@/components/CustomSelect";
import { ArrowDownAZ, Filter, PlusCircle } from "lucide-react";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";

const Home = observer(function Home() {
  const dialogState = useLocalObservable(() => ({
    openAddVehicleDialog: false,
    openEditVehicleDialog: false,
    setOpenAddVehicleDialog(value) {
      this.openAddVehicleDialog = value;
    },
    setOpenEditVehicleDialog(value) {
      this.openEditVehicleDialog = value;
    },
  }));

  const pageState = useLocalObservable(() => ({
    currentPage: 1,
    pageInput: 1,
    setCurrentPage(value) {
      this.currentPage = value;
    },
    setPageInput(value) {
      this.pageInput = value;
    },
  }));

  const choiceState = useLocalObservable(() => ({
    sortChoice: "",
    filterChoice: null,
    setSortChoice(value) {
      this.sortChoice = value;
    },
    setFilterChoice(value) {
      this.filterChoice = value;
    },
  }));

  const store = useStore();

  const itemsToDisplay = 8;

  function displayVehicles() {
    const start = (pageState.currentPage - 1) * itemsToDisplay;
    return store.filteredVehicleModelData.slice(start, start + itemsToDisplay);
  }

  function handleSortSelectChange(value) {
    SortVehicle(store.VehicleMake, store.VehicleModel, value);
  }

  function handleFilterSelectChange(value) {
    store.setFilterChoice(value);
    pageState.setCurrentPage(1);
    pageState.setPageInput(1);
  }

  const sortOptions = {
    Abecedno: [
      { value: "alphabetical-make", label: "Marke" },
      { value: "alphabetical-model", label: "Modeli" },
    ],
  };

  const filterOptions = {
    "Sva vozila": [{ value: null, label: "Prikaži sve" }],
    Marka: store.VehicleMake.map((make) => ({
      value: make.id,
      label: `${make.name} (${make.abrv})`,
    })),
  };

  return (
    <>
      <AddVehicleDialog
        open={dialogState.openAddVehicleDialog}
        setOpen={dialogState.setOpenAddVehicleDialog}
      />
      <EditVehicleDialog
        open={dialogState.openEditVehicleDialog}
        setOpen={dialogState.setOpenEditVehicleDialog}
      />
      <ListLayout
        buttons={
          <>
            <button
              onClick={() => {
                dialogState.setOpenAddVehicleDialog(
                  !dialogState.openAddVehicleDialog
                );
              }}
            >
              <PlusCircle size={14} /> Dodaj
            </button>
            <CustomSelect
              selectHeader={{
                title: "Sortiraj",
                icon: <ArrowDownAZ size={14} />,
              }}
              options={[sortOptions]}
              selectedOption={choiceState.sortChoice}
              setSelectedOption={choiceState.setSortChoice}
              onChange={handleSortSelectChange}
            />
            <CustomSelect
              selectHeader={{
                title: "Filtriraj",
                icon: <Filter size={14} />,
              }}
              options={[filterOptions]}
              selectedOption={choiceState.filterChoice}
              setSelectedOption={choiceState.setFilterChoice}
              onChange={handleFilterSelectChange}
            />
          </>
        }
      >
        {displayVehicles().map((vehicleModel) => {
          const vehicleMake = store.VehicleMake.find(
            (make) => make.id === vehicleModel.makeid
          );

          return (
            <ListItem
              key={vehicleModel.id}
              vehicle={{ make: vehicleMake, model: vehicleModel }}
              setOpenEditVehicleDialog={dialogState.setOpenEditVehicleDialog}
              openEditVehicleDialog={dialogState.openEditVehicleDialog}
            />
          );
        })}
      </ListLayout>
      <Pages
        itemCount={store.filteredVehicleModelData.length}
        displayItems={itemsToDisplay}
        currentPage={pageState.currentPage}
        onPageChange={pageState.setCurrentPage}
        pageInput={pageState.pageInput}
        setPageInput={pageState.setPageInput}
      />
    </>
  );
});

export default Home;

export async function getServerSideProps() {
  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);
  const makeService = new MakeService(httpClient);

  const VehicleMake = await makeService.getMakes();
  const VehicleModel = await modelService.getModels();

  return {
    props: {
      initialState: {
        VehicleMake,
        VehicleModel,
      },
    },
  };
}
