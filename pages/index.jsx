import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import ButtonsLayout from "@/layouts/ButtonsLayout";
import { observer } from "mobx-react-lite";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/components/Form";

const Home = observer(function Home() {
  const store = useStore();
  const [openDialog, setOpenDialog] = useState(false);

  function handleSubmit() {
    event.preventDefault();

    store.createVehicle(
      event.target.make_input.value,
      event.target.model_input.value
    );

    setOpenDialog(!openDialog);
  }

  return (
    <>
      <Dialog
        title={"Dodaj novo vozilo"}
        open={openDialog}
        setOpen={setOpenDialog}
        form={"add-car-form"}
      >
        <Form handleSubmit={handleSubmit} id={"add-car-form"}>
          <label htmlFor="make_input">Ime</label>
          <input
            placeholder="Unesite marku vozila"
            required
            form="add-car-form"
            id="make_input"
            type="text"
          />
          <label htmlFor="model_input">Model</label>
          <input
            placeholder="Unesite model vozila"
            required
            form="add-car-form"
            type="text"
            id="model_input"
          />
        </Form>
      </Dialog>
      <ButtonsLayout>
        <button
          onClick={() => {
            setOpenDialog(!openDialog);
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
                make={vehicleMake.abrv}
                model={vehicleModel.abrv}
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
        VehicleMake: VehicleMake,
        VehicleModel: VehicleModel,
      },
    },
  };
}
