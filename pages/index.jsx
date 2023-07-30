import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import ButtonsLayout from "@/layouts/ButtonsLayout";
import { observer } from "mobx-react-lite";
import Dialog from "@/components/Dialog";
import { useState } from "react";
import Form from "@/components/Form";

const Home = observer(function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const [makeInput, setMakeInput] = useState("");
  const [modelInput, setModelInput] = useState("");

  const store = useStore();

  function handleSubmit() {
    event.preventDefault();

    store.createVehicle(makeInput, modelInput);

    setOpenDialog(!openDialog);
    setMakeInput("");
    setModelInput("");
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
            value={makeInput}
            onChange={(e) => setMakeInput(e.target.value)}
          />
          <label htmlFor="model_input">Model</label>
          <input
            placeholder="Unesite model vozila"
            required
            form="add-car-form"
            type="text"
            id="model_input"
            value={modelInput}
            onChange={(e) => setModelInput(e.target.value)}
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
