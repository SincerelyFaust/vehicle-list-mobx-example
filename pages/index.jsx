import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import ButtonsLayout from "@/layouts/ButtonsLayout";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import AddVehicleDialog from "@/components/AddVehicleDialog";

const Home = observer(function Home() {
  const [openAddVehicleDialog, setOpenAddVehicleDialog] = useState(false);

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
        <button onClick={() => {}}>Sortiraj</button>
        <button onClick={() => {}}>Filtriraj</button>
      </ButtonsLayout>
      <ListLayout>
        {store.VehicleModel.map((vehicleModel) => {
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
