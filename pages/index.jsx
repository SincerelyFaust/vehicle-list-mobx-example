import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import ButtonsLayout from "@/layouts/ButtonsLayout";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import AddVehicleDialog from "@/components/AddVehicleDialog";
import SortVehicle from "@/common/SortVehicle";

const Home = observer(function Home() {
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);
  const [sortChoice, setSortChoice] = useState("");
  const [filterChoice, setFilterChoice] = useState("");

  const store = useStore();

  return (
    <>
      <AddVehicleDialog
        open={openAddVehicleDialog}
        setOpen={setOpenAddVehicleDialog}
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
          <option value={"alphabetical-make"}>Abecedno - marke</option>
          <option value={"alphabetical-model"}>Abecedno - modeli</option>
        </select>
        <select
          value={filterChoice}
          onChange={(e) => {
            setFilterChoice(e.target.value);
            store.setFilterChoice(e.target.value);
          }}
        >
          <option value="" selected disabled hidden>
            Filtriraj
          </option>
          <option value="">Sve marke</option>
          {store.VehicleMake.map((make) => (
            <option key={make.id} value={make.id}>
              {make.abrv}
            </option>
          ))}
        </select>
      </ButtonsLayout>
      <ListLayout>
        {store.filteredVehicleModelData.map((vehicleModel) => {
          const vehicleMake = store.VehicleMake.find(
            (make) => make.id === vehicleModel.makeid
          );

          return (
            <>
              <ListItem
                key={vehicleModel.id}
                vehicleMakeName={vehicleMake.name}
                vehicleMakeAbrv={vehicleMake.abrv}
                vehicleModelName={vehicleModel.name}
                vehicleModelAbrv={vehicleModel.abrv}
              />
            </>
          );
        })}
      </ListLayout>
    </>
  );
});

export default Home;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/vehicles", {
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
