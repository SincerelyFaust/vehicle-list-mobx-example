import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";
import { Edit, XCircle } from "lucide-react";

export default function ListItem({
  vehicle,
  setOpenEditVehicleDialog,
  openEditVehicleDialog,
  setCurrentVehicle,
}) {
  const { make, model } = vehicle;
  const store = useStore();

  return (
    <li className={styles["list-item"]}>
      <p>
        {make.name} <span>({make.abrv})</span>
      </p>
      <p>
        {model.name} <span>({model.abrv})</span>
      </p>
      <div className={styles["button-div"]}>
        <button
          onClick={() => {
            setCurrentVehicle(vehicle);
            setOpenEditVehicleDialog(!openEditVehicleDialog);
          }}
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => {
            store.deleteVehicleToStore(vehicle);

            fetch("/api/vehicles", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                selectedVehicleData: vehicle,
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
