import styles from "@/components/Form.module.css";

export default function Form({ handleSubmit, id, children }) {
  return (
    <form className={styles["form"]} id={id} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}
