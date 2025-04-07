import styles from "./RadioButton.module.css";

function RadioButton({ title, form, setForm, children }) {
  return (
    <div
      className={
        form.status !== title.toLowerCase()
          ? styles.radioButton
          : `${styles.radioButton} ${styles.checked}`
      }
      onClick={() => setForm({ ...form, status: title.toLowerCase() })}
    >
      {children}
      <p>{title}</p>
    </div>
  );
}

export default RadioButton;
