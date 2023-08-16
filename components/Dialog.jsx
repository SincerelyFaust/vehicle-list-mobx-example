import styles from "@/components/Dialog.module.css";
import { useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import { AlertTriangle } from "lucide-react";

export default function Dialog({
  open,
  title,
  children,
  form,
  resetState,
  error,
}) {
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
    <div
      className={
        open ? styles["dialog-container"] : styles["dialog-container-closed"]
      }
    >
      <dialog
        ref={dialogRef}
        className={open ? styles["dialog"] : styles["dialog-closed"]}
      >
        <p className={styles["dialog-title"]}>{title}</p>
        {children}
        {error ? (
          <div className={styles["error-div"]}>
            <AlertTriangle color="#ff0033" />
            <p>{error}</p>
          </div>
        ) : null}
        <div className={styles["dialog-buttons-container"]}>
          <button form={form} type="submit">
            <Check size={16} /> Potvrdi
          </button>
          <button onClick={resetState}>
            <X size={16} /> Zatvori
          </button>
        </div>
      </dialog>
    </div>
  );
}
