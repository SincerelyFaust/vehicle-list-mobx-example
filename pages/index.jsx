import ListItem from "@/components/ListItem";
import ListLayout from "@/layouts/ListLayout";
import { useStore } from "@/common/StoreProvider";
import { observer } from "mobx-react-lite";

const Home = observer(function Home() {
  const store = useStore();

  return (
    <>
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
