import React from "react";

//styles
import styles from "./TextInput.module.css";

//icons
import { VscMail, VscLock } from "react-icons/vsc";

function TextInput({ form, name, setForm, type = "auth" }) {
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const iconSelect = {
    email: <VscMail />,
    password: <VscLock />,
  };
  return (
    <div className={type === "auth" ? styles.authInput : styles.dashboardInput}>
      {type === "auth" && iconSelect[name]}
      {type === "dashboard" && <label>{name}:</label>}
      <input
        value={form[name]}
        onChange={changeHandler}
        placeholder={type === "auth" ? name : null}
        type={name}
        name={name}
      />
    </div>
  );
}

export default TextInput;
