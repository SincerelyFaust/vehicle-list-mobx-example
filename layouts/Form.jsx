import styles from "@/layouts/Form.module.css";

export default function Form({ handleSubmit, formId, children }) {
  return (
    <form className={styles["form"]} id={formId} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
