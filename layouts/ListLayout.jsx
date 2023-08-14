import styles from "@/layouts/ListLayout.module.css";

export default function ListLayout({ children, buttons }) {
  return (
    <div className={styles["list-layout"]}>
      <div className={styles["header"]}>
        <p>Brand</p>
        <p>Model</p>
        <div className={styles["buttons-div"]}>{buttons}</div>
      </div>
      <ul>{children}</ul>
    </div>
  );
}
