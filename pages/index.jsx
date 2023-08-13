import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import ButtonsLayout from "@/layouts/ButtonsLayout";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import AddVehicleDialog from "@/components/AddVehicleDialog";
import SortVehicle from "@/common/SortVehicle";
import EditVehicleDialog from "@/components/EditVehicleDialog";
import Pages from "@/components/Pages";

const Home = observer(function Home() {
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);
  const [sortChoice, setSortChoice] = useState("");
  const [filterChoice, setFilterChoice] = useState("");
  const [openEditVehicleDialog, setOpenEditVehicleDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const store = useStore();

  const itemsToDisplay = 8;

  function displayVehicles() {
    const start = (currentPage - 1) * itemsToDisplay;
    return store.filteredVehicleModelData.slice(start, start + itemsToDisplay);
  }

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
      <ButtonsLayout>
        <button
          onClick={() => {
            setOpenAddVehicleDialog(!openAddVehicleDialog);
          }}
        >
          Dodaj
        </button>
        <select
          value={sortChoice}
          onChange={(e) => {
            setSortChoice(e.target.value);
            SortVehicle(store.VehicleMake, store.VehicleModel, e.target.value);
          }}
        >
          <option value="" selected disabled hidden>
            Sortiraj
          </option>
          <optgroup label="Abecedno">
            <option value={"alphabetical-make"}>Marke</option>
            <option value={"alphabetical-model"}>Modeli</option>
          </optgroup>
        </select>
        <select
          value={filterChoice}
          onChange={(e) => {
            setFilterChoice(e.target.value);
            store.setFilterChoice(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="" selected disabled hidden>
            Filtriraj
          </option>
          <option value="">Sve marke</option>
          {store.VehicleMake.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name} ({make.abrv})
            </option>
          ))}
        </select>
      </ButtonsLayout>
      <ListLayout>
        {displayVehicles().map((vehicleModel) => {
          const vehicleMake = store.VehicleMake.find(
            (make) => make.id === vehicleModel.makeid
          );

          return (
            <>
              <ListItem
                key={vehicleModel.id}
                vehicle={{ make: vehicleMake, model: vehicleModel }}
                setOpenEditVehicleDialog={setOpenEditVehicleDialog}
                openEditVehicleDialog={openEditVehicleDialog}
              />
            </>
          );
        })}
      </ListLayout>
      <Pages
        itemCount={store.filteredVehicleModelData.length}
        displayItems={itemsToDisplay}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
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
