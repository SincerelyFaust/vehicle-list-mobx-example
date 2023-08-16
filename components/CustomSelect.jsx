import { useState } from "react";
import styles from "./CustomSelect.module.css";
import { useRef, useEffect } from "react";

function CustomSelect({
  selectHeader,
  options,
  selectedOption,
  setSelectedOption,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  function handleOptionClick(option) {
    setSelectedOption(option.label);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  }

  return (
    <div
      ref={selectRef}
      className={styles["custom-select"]}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={styles["select-selected"]}>
        {selectedOption || (
          <>
            {selectHeader.icon} {selectHeader.title}
          </>
        )}
      </div>
      {isOpen ? (
        <div className={styles["select-items"]}>
          {options.map((optionGroup, groupIndex) =>
            Object.entries(optionGroup).map(([groupName, groupOptions]) => (
              <div
                key={`${groupIndex}-${groupName}`}
                className={styles["select-group"]}
              >
                <div className={styles["select-group-name"]}>{groupName}</div>
                {groupOptions.map((option, index) => (
                  <div
                    key={index}
                    className={styles["select-option"]}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

export default CustomSelect;
