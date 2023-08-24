import { observer } from "mobx-react-lite";
import styles from "./StyledInput.module.css";
import { AlertTriangle } from "lucide-react";

export default observer(({ field }) => (
  <div className={styles["form-item"]}>
    <label htmlFor={field.id}>{field.label}</label>
    <input
      {...field.bind()}
      className={field.error ? styles["input-error"] : null}
    />
    {field.error ? (
      <>
        <div className={styles["error-div"]}>
          <AlertTriangle size={18} color="#ff0033" />
          <span>{field.error}</span>
        </div>
      </>
    ) : null}
  </div>
));
