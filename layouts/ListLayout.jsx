import styles from "@/layouts/ListLayout.module.css";

export default function ListLayout({ children }) {
  return <div className={styles["list-layout"]}>{children}</div>;
}
