import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";
import { Edit, XCircle } from "lucide-react";

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
          <Edit size={16} />
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
          <XCircle size={16} />
        </button>
      </div>
    </li>
  );
}
