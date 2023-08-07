import styles from "@/components/Dialog.module.css";
import { useRef, useEffect } from "react";

export default function Dialog({ open, title, children, form, resetState }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        resetState();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [resetState, open]);

  return (
    <div hidden={!open} className={styles["dialog-container"]}>
      <dialog ref={dialogRef} hidden={!open} className={styles["dialog"]}>
        <p className={styles["dialog-title"]}>{title}</p>
        {children}
        <div className={styles["dialog-buttons-container"]}>
          <input type="submit" form={form} value={"Potvrdi"} />
          <button onClick={resetState}>Zatvori</button>
        </div>
      </dialog>
    </div>
  );
}
