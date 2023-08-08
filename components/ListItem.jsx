import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";

export default function ListItem({
  vehicleMakeName,
  vehicleMakeAbrv,
  vehicleModelName,
  vehicleModelAbrv,
  setOpenEditVehicleDialog,
  openEditVehicleDialog,
  setCurrentVehicle,
}) {
  const store = useStore();

  return (
    <li className={styles["list-item"]}>
      <p>
        {vehicleMakeName} <span>({vehicleMakeAbrv})</span>
      </p>
      <p>
        {vehicleModelName} <span>({vehicleModelAbrv})</span>
      </p>
      <div className={styles["button-div"]}>
        <button
          onClick={() => {
            setCurrentVehicle({
              vehicleMakeName,
              vehicleMakeAbrv,
              vehicleModelName,
              vehicleModelAbrv,
            });
            setOpenEditVehicleDialog(!openEditVehicleDialog);
          }}
        >
          Uredi
        </button>
        <button
          onClick={() => {
            store.deleteVehicleToStore(vehicleMakeAbrv, vehicleModelAbrv);

            fetch("/api/vehicles", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                vehicleMakeAbrv,
                vehicleModelAbrv,
              }),
            });
          }}
        >
          Izbriši
        </button>
      </div>
    </li>
  );
}
