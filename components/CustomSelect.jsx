import styles from "./CustomSelect.module.css";
import { useRef, useEffect } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

export default observer(function CustomSelect({
  selectHeader,
  options,
  selectedOption,
  setSelectedOption,
  onChange,
}) {
  const state = useLocalObservable(() => ({
    open: false,
    setOpen(value) {
      this.open = value;
    },
  }));

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        state.setOpen(false);
      }
    };

    if (state.open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [state.open, state]);

  function handleOptionClick(option) {
    setSelectedOption(option.label);
    state.setOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  }

  return (
    <div
      ref={selectRef}
      className={styles["custom-select"]}
      onClick={() => state.setOpen(!state.open)}
    >
      <div className={styles["select-selected"]}>
        {selectedOption || (
          <>
            {selectHeader.icon} {selectHeader.title}
          </>
        )}
      </div>
      {state.open ? (
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
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
});
