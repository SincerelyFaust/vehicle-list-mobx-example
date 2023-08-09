import styles from "@/components/Pages.module.css";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Pages({
  itemCount,
  displayItems,
  currentPage,
  onPageChange,
}) {
  const pagesCount = Math.ceil(itemCount / displayItems);
  const [page, setPage] = useState(+currentPage);

  function handleSubmit(event) {
    event.preventDefault();

    if (+page <= pagesCount && +page > 0) onPageChange(+page);
  }

  return (
    <div className={styles["pages"]}>
      <button
        className={styles["page-button"]}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setPage(currentPage - 1);
          }
        }}
      >
        <ArrowLeft size={16} />
      </button>
      <form
        className={styles["change-page-form"]}
        id="page-form"
        onSubmit={handleSubmit}
      >
        <input
          className={styles["change-page-input"]}
          type="number"
          name="page_input"
          id="page_input"
          value={page}
          form="page-form"
          onChange={(e) => setPage(e.target.value)}
        />
        <p>/ {pagesCount}</p>
      </form>
      <button
        className={styles["page-button"]}
        onClick={() => {
          if (pagesCount !== currentPage) {
            onPageChange(currentPage + 1);
            setPage(currentPage + 1);
          }
        }}
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
