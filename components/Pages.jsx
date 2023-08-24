import styles from "@/components/Pages.module.css";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function Pages({
  itemCount,
  displayItems,
  currentPage,
  onPageChange,
  pageInput,
  setPageInput,
}) {
  const pagesCount = Math.ceil(itemCount / displayItems);

  useEffect(() => {
    if ((currentPage - 1) * displayItems >= itemCount && currentPage > 1) {
      onPageChange(currentPage - 1);
      setPageInput(currentPage - 1);
    }
  }, [itemCount, currentPage, displayItems, onPageChange, setPageInput]);

  function handleSubmit(event) {
    event.preventDefault();

    if (+pageInput <= pagesCount && +pageInput > 0) onPageChange(+pageInput);
  }

  return (
    <div className={styles["pages"]}>
      <button
        className={styles["page-button"]}
        onClick={() => {
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
            setPageInput(currentPage - 1);
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
          value={pageInput}
          form="page-form"
          onChange={(e) => setPageInput(e.target.value)}
        />
        <p>/ {pagesCount}</p>
      </form>
      <button
        className={styles["page-button"]}
        onClick={() => {
          if (pagesCount !== currentPage) {
            onPageChange(currentPage + 1);
            setPageInput(currentPage + 1);
          }
        }}
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
