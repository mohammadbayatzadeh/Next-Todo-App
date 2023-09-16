import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//icons
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

function AddTodopage({ todo }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "new",
  });

  const router = useRouter();

  useEffect(() => {
    todo && setForm({ ...todo });
  }, []);

  const submitHandler = async () => {
    axios
      .post("/api/todos", {
        ...form,
      })
      .then(() => {
        Toast(`${form.title} added`, "success");
        setForm({
          title: "",
          description: "",
          status: "new",
        });
        router.replace("/");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      });
  };

  const updateHandler = async () => {
    axios
      .patch("/api/" + todo._id, {
        ...form,
      })
      .then((res) => {
        Toast(`${form.title} updated`, "success");
        setForm({
          title: "",
          description: "",
          status: "new",
        });
        router.replace("/");
      })
      .catch((err) => {
        Toast(`${err.response.data.message}`, "error");
      });
  };
  const changehandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
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
          value={form.title}
          onChange={(e) => changehandler(e)}
        />
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          value={form.description}
          onChange={(e) => changehandler(e)}
        />
        <RadioButton title="New" form={form} setForm={setForm}>
          <VscNewFile />
        </RadioButton>
        <RadioButton title="In Progress" form={form} setForm={setForm}>
          <VscGear />
        </RadioButton>
        <RadioButton title="Review" form={form} setForm={setForm}>
          <VscOpenPreview />
        </RadioButton>
        <RadioButton title="Done" form={form} setForm={setForm}>
          <VscCheckAll />
        </RadioButton>
        {todo ? (
          <button className={styles.button} onClick={updateHandler}>
            update Todo
          </button>
        ) : (
          <button className={styles.button} onClick={submitHandler}>
            Add Todo
          </button>
        )}
      </div>
    </div>
  );
}

export default AddTodopage;
