import styles from "@/components/Pages.module.css";

export default function Pages({
  itemCount,
  displayItems,
  currentPage,
  onPageChange,
}) {
  const pagesCount = Math.ceil(itemCount / displayItems);

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className={styles["pages"]}>
      <button
        className={styles["page"]}
        onClick={() => {
          currentPage > 1 ? onPageChange(currentPage - 1) : null;
        }}
      >
        Prethodna
      </button>
      <div className={styles["page-buttons-div"]}>
        {pages.map((page) => (
          <button
            key={page}
            className={
              page === currentPage ? styles["active-page"] : styles["page"]
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className={styles["page"]}
        onClick={() => {
          pagesCount !== currentPage ? onPageChange(currentPage + 1) : null;
        }}
      >
        Sljedeća
      </button>
    </div>
  );
}
