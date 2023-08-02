import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";

export default function ListItem({ vehicleMakeAbrv, vehicleModelAbrv }) {
  const store = useStore();

  return (
    <li className={styles["list-item"]}>
      <p>{vehicleMakeAbrv}</p>
      <p>{vehicleModelAbrv}</p>
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
