import { useState } from "react";
import {
  VscAdd,
  VscCheckAll,
  VscGear,
  VscOpenPreview,
  VscNewFile,
} from "react-icons/vsc";

//elemets
import RadioButton from "../elements/RadioButton";
import Toast from "../elements/Toast";

//styles
import styles from "./AddTodoPage.module.css";
import axios from "axios";

function AddTodopage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");

  const submitHandler = async () => {
    // console.log({ title, description, status });
    axios
      .post("/api/todos", {
        title,
        description,
        status,
      })
      .then((res) => {
        Toast(`${title} added`, "success");
        setTitle("");
        setDescription("");
        setStatus("new");
      })
      .catch((err) => {
        Toast("failed ", "error");

        console.log(err.response.data);
      });
  };
  return (
    <div className={styles.container}>
      <h3>
        <VscAdd />
        Add Todo
      </h3>
      <div className={styles.form}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <RadioButton title="New" status={status} setStatus={setStatus}>
          <VscNewFile />
        </RadioButton>
        <RadioButton title="In Progress" status={status} setStatus={setStatus}>
          <VscGear />
        </RadioButton>
        <RadioButton title="Review" status={status} setStatus={setStatus}>
          <VscOpenPreview />
        </RadioButton>
        <RadioButton title="Done" status={status} setStatus={setStatus}>
          <VscCheckAll />
        </RadioButton>
        <button className={styles.button} onClick={submitHandler}>
          Add Todo
        </button>
      </div>
    </div>
  );
}

export default AddTodopage;
