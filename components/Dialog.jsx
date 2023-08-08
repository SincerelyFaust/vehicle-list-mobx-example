import styles from "@/components/Dialog.module.css";
import { useRef, useEffect } from "react";
import { Check, X } from "lucide-react";

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
