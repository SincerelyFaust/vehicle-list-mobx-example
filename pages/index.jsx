import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import { observer } from "mobx-react-lite";
import AddVehicleDialog from "@/components/AddVehicleDialog";
import EditVehicleDialog from "@/components/EditVehicleDialog";
import Pages from "@/components/Pages";
import CustomSelect from "@/components/CustomSelect";
import { ArrowDownAZ, Filter, PlusCircle } from "lucide-react";
import { HttpClient } from "@/common/HttpClient";
import { ModelService } from "@/common/ModelService";
import { MakeService } from "@/common/MakeService";
import { useEffect } from "react";
import { HomeStore } from "@/stores/HomeStore";
import { useLocalObservable } from "mobx-react-lite";

const Home = observer(function Home() {
  const store = useStore();
  const homeStore = useLocalObservable(() => new HomeStore(store));

  const itemsToDisplay = 8;

  function displayVehicles() {
    const start = (homeStore.currentPage - 1) * itemsToDisplay;
    return store.getFilteredModels.slice(start, start + itemsToDisplay);
  }

  const sortOptions = {
    Abecedno: [
      { value: "alphabetical-make", label: "Marke" },
      { value: "alphabetical-model", label: "Modeli" },
    ],
  };

  const filterOptions = {
    "Sva vozila": [{ value: null, label: "Prikaži sve" }],
    Marka: store.vehicleMake.map((make) => ({
      value: make.id,
      label: `${make.name} (${make.abrv})`,
    })),
  };

  useEffect(() => {
    async function fetchFilteredModels() {
      const filteredModels = await store.filteredVehicleModelData();
      return filteredModels;
    }

    fetchFilteredModels();
  }, [store, homeStore.filterChoice]);

  return (
    <>
      <AddVehicleDialog
        open={homeStore.openAddVehicleDialog}
        setOpen={homeStore.setOpenAddVehicleDialog}
      />
      <EditVehicleDialog
        open={homeStore.openEditVehicleDialog}
        setOpen={homeStore.setOpenEditVehicleDialog}
      />
      <ListLayout
        buttons={
          <>
            <button
              onClick={() => {
                homeStore.setOpenAddVehicleDialog(true);
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
              selectedOption={homeStore.sortChoice}
              setSelectedOption={homeStore.setSortChoice}
              onChange={homeStore.handleSortSelectChange}
            />
            <CustomSelect
              selectHeader={{
                title: "Filtriraj",
                icon: <Filter size={14} />,
              }}
              options={[filterOptions]}
              selectedOption={homeStore.filterChoice}
              setSelectedOption={homeStore.setFilterChoice}
              onChange={homeStore.handleFilterSelectChange}
            />
          </>
        }
      >
        {displayVehicles().map((vehicleModel) => {
          const vehicleMake = store.vehicleMake.find(
            (make) => make.id === vehicleModel.makeid
          );

          return (
            <ListItem
              key={vehicleModel.id}
              vehicle={{ make: vehicleMake, model: vehicleModel }}
              setOpenEditVehicleDialog={homeStore.setOpenEditVehicleDialog}
              openEditVehicleDialog={homeStore.openEditVehicleDialog}
            />
          );
        })}
      </ListLayout>
      <Pages
        itemCount={store.getFilteredModels.length}
        displayItems={itemsToDisplay}
        currentPage={homeStore.currentPage}
        onPageChange={homeStore.setCurrentPage}
        pageInput={homeStore.pageInput}
        setPageInput={homeStore.setPageInput}
      />
    </>
  );
});

export default Home;

export async function getServerSideProps() {
  const httpClient = new HttpClient();
  const modelService = new ModelService(httpClient);
  const makeService = new MakeService(httpClient);

  const vehicleMake = await makeService.getMakes();
  const vehicleModel = await modelService.getModels();

  return {
    props: {
      initialState: {
        vehicleMake,
        vehicleModel,
      },
    },
  };
}
