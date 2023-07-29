import styles from "@/components/ListItem.module.css";

export default function ListItem({ make, model }) {
  return (
    <div className={styles["list-item"]}>
      <p>{make}</p>
      <p>{model}</p>
      <div className={styles["button-div"]}>
        <button onClick={() => {}}>Uredi</button>
        <button onClick={() => {}}>Izbriši</button>
      </div>
    </div>
  );
}
