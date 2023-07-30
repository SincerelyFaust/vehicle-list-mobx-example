import styles from "@/layouts/ListLayout.module.css";

export default function ListLayout({ children }) {
  return <ul className={styles["list-layout"]}>{children}</ul>;
}
