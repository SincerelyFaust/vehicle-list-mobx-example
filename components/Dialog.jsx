import styles from "@/components/Dialog.module.css";

export default function Dialog({ open, setOpen, title, children, form }) {
  return (
    <div hidden={!open} className={styles["dialog-container"]}>
      <dialog hidden={!open} className={styles["dialog"]}>
        <p className={styles["dialog-title"]}>{title}</p>
        {children}
        <div className={styles["dialog-buttons-container"]}>
          <input type="submit" form={form}></input>
          <button onClick={() => setOpen(!open)}>Zatvori</button>
        </div>
      </dialog>
    </div>
  );
}
