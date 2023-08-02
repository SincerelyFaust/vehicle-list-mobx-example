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

  function resetState() {
    setOpenDialog(!openDialog);
    setMakeInput("");
    setModelInput("");
  }

  function handleSubmit() {
    event.preventDefault();

    store.createVehicle(makeInput, modelInput);

    resetState();
  }

  return (
    <>
      <Dialog
        title={"Dodaj novo vozilo"}
        open={openDialog}
        setOpen={setOpenDialog}
        form={"add-car-form"}
        resetState={resetState}
      >
        <Form
          handleSubmit={handleSubmit}
          formId={"add-car-form"}
          inputs={[
            {
              id: "make_input",
              label: "Ime",
              placeholder: "Unesite marku vozila",
              type: "text",
              value: makeInput,
              setValue: setMakeInput,
              required: true,
            },
            {
              id: "model_input",
              label: "Model",
              placeholder: "Unesite model vozila",
              type: "text",
              value: modelInput,
              setValue: setModelInput,
              required: true,
            },
          ]}
        />
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
        VehicleMake,
        VehicleModel,
      },
    },
  };
}
