//styles
import styles from "./RadioButton.module.css";

function RadioButton({ title, status, setStatus, children }) {
  return (
    <div
      className={
        status !== title.toLowerCase()
          ? styles.radioButton
          : `${styles.radioButton} ${styles.checked}`
      }
      onClick={() => setStatus(title.toLowerCase())}
    >
      {children}
      <p>{title}</p>
    </div>
  );
}

export default RadioButton;
