import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";

export default function ListItem({
  vehicleMakeName,
  vehicleMakeAbrv,
  vehicleModelName,
  vehicleModelAbrv,
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
        <button onClick={() => {}}>Uredi</button>
        <button
          onClick={() => store.deleteVehicle(vehicleMakeAbrv, vehicleModelAbrv)}
        >
          Izbriši
        </button>
      </div>
    </li>
  );
}
