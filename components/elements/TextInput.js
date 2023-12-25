import React from "react";

//styles
import styles from "./TextInput.module.css";

//icons
import { VscMail, VscLock } from "react-icons/vsc";

function TextInput({ form, name, setForm }) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const iconSelect = {
    email: <VscMail />,
    password: <VscLock />,
  };
  return (
    <div className={styles.input}>
      {iconSelect[name]}
      <input
        value={form[name]}
        onChange={changeHandler}
        placeholder={name}
        type={name}
        name={name}
      />
    </div>
  );
}

export default TextInput;
