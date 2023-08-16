import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import AddVehicleDialog from "@/components/AddVehicleDialog";
import SortVehicle from "@/common/SortVehicle";
import EditVehicleDialog from "@/components/EditVehicleDialog";
import Pages from "@/components/Pages";
import CustomSelect from "@/components/CustomSelect";
import { ArrowDownAZ, Filter, PlusCircle } from "lucide-react";

const Home = observer(function Home() {
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);
  const [sortChoice, setSortChoice] = useState("");
  const [filterChoice, setFilterChoice] = useState(null);
  const [openEditVehicleDialog, setOpenEditVehicleDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState(currentPage);

  const store = useStore();

  const itemsToDisplay = 8;

  function displayVehicles() {
    const start = (currentPage - 1) * itemsToDisplay;
    return store.filteredVehicleModelData.slice(start, start + itemsToDisplay);
  }

  function handleSortSelectChange(value) {
    SortVehicle(store.VehicleMake, store.VehicleModel, value);
  }

  function handleFilterSelectChange(value) {
    store.setFilterChoice(value);
    setCurrentPage(1);
    setPageInput(1);
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
        open={openAddVehicleDialog}
        setOpen={setOpenAddVehicleDialog}
      />
      <EditVehicleDialog
        open={openEditVehicleDialog}
        setOpen={setOpenEditVehicleDialog}
      />
      <ListLayout
        buttons={
          <>
            <button
              onClick={() => {
                setOpenAddVehicleDialog(!openAddVehicleDialog);
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
              selectedOption={sortChoice}
              setSelectedOption={setSortChoice}
              onChange={handleSortSelectChange}
            />
            <CustomSelect
              selectHeader={{
                title: "Filtriraj",
                icon: <Filter size={14} />,
              }}
              options={[filterOptions]}
              selectedOption={filterChoice}
              setSelectedOption={setFilterChoice}
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
              setOpenEditVehicleDialog={setOpenEditVehicleDialog}
              openEditVehicleDialog={openEditVehicleDialog}
            />
          );
        })}
      </ListLayout>
      <Pages
        itemCount={store.filteredVehicleModelData.length}
        displayItems={itemsToDisplay}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageInput={pageInput}
        setPageInput={setPageInput}
      />
    </>
  );
});

export default Home;

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_URL}/api/vehicles`, {
    method: "GET",
  });
  const { VehicleMake, VehicleModel } = await response.json();
  return {
    props: {
      initialState: {
        VehicleMake,
        VehicleModel,
      },
    },
  };
}
