import styles from "@/components/Form.module.css";

export default function Form({ handleSubmit, formId, inputs }) {
  return (
    <form className={styles["form"]} id={formId} onSubmit={handleSubmit}>
      {inputs.map((input) => {
        return (
          <div key={input.id} className={styles["form-content"]}>
            <label htmlFor={input.id}>{input.label}</label>
            <input
              placeholder={input.placeholder}
              required
              form={formId}
              id={input.id}
              type={input.type}
              value={input.value}
              onChange={(e) => input.setValue(e.target.value)}
            />
          </div>
        );
      })}
    </form>
  );
}
