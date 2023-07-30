import styles from "@/layouts/ButtonsLayout.module.css";

export default function ButtonsLayout({ children }) {
  return <div className={styles["buttons-layout"]}>{children}</div>;
}
