import styles from "@/components/ListItem.module.css";
import { useStore } from "@/common/StoreProvider";

export default function ListItem({ make, model }) {
  const store = useStore();

  return (
    <li className={styles["list-item"]}>
      <p>{make}</p>
      <p>{model}</p>
      <div className={styles["button-div"]}>
        <button onClick={() => {}}>Uredi</button>
        <button onClick={() => store.deleteVehicle(model, make)}>
          Izbriši
        </button>
      </div>
    </li>
  );
}
