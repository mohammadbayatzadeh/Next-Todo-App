import TextInput from "@/components/elements/TextInput";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  VscAdd,
  VscCheckAll,
  VscGear,
  VscNewFile,
  VscOpenPreview,
} from "react-icons/vsc";
import RadioButton from "../../elements/RadioButton";
import Toast from "../../elements/Toast";
import styles from "./AddTodoPage.module.css";

function AddTodopage({ todo }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "new",
  });

  const router = useRouter();

  useEffect(() => {
    todo && setForm(todo);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    !todo
      ? axios
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
          })
      : axios
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

  return (
    <div className={styles.container}>
      <h3>
        <VscAdd />
        Add Todo
      </h3>
      <form className={styles.form} onSubmit={submitHandler}>
        <TextInput
          name="title"
          form={form}
          setForm={setForm}
          type="dashboard"
        />
        <TextInput
          name="description"
          form={form}
          setForm={setForm}
          type="dashboard"
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
        <button className={styles.button} type="submit">
          {todo ? "update" : "add"} Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodopage;
